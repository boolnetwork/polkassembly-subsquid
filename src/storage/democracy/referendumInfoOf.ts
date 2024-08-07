import { UnknownVersionError } from '../../common/errors'
import { referendumInfoOf } from '../../types/democracy/storage'
import * as v900 from '../../types/v900'
import * as v2000 from '../../types/v2000'
import { Store } from '@subsquid/typeorm-store'
import { ProcessorContext, Block } from '../../processor'

type Threshold = 'SuperMajorityApprove' | 'SuperMajorityAgainst' | 'SimpleMajority'

type FinishedReferendumData = {
    status: 'Finished'
    approved: boolean
    end: number
}

type OngoingReferendumData = {
    status: 'Ongoing'
    end: number
    hash: string
    threshold: Threshold
    delay: number
}

type ReferendumStorageData = FinishedReferendumData | OngoingReferendumData

// eslint-disable-next-line sonarjs/cognitive-complexity
async function getStorageData(ctx: ProcessorContext<Store>, index: number, block: Block): Promise<ReferendumStorageData | undefined> {
    if (referendumInfoOf.v900.is(block)) {
        const storageData = await referendumInfoOf.v900.get(block, index)
        if (!storageData) return undefined

        const { __kind: status } = storageData
        if (status === 'Ongoing') {
            const { proposalHash: hash, end, delay, threshold } = (storageData as v900.ReferendumInfo_Ongoing).value
            return {
                status,
                hash,
                end,
                delay,
                threshold: threshold.__kind,
            }
        } else {
            const { end, approved } = (storageData as v900.ReferendumInfo_Finished)
            return {
                status,
                end,
                approved,
            }
        }
    }else if(referendumInfoOf.v2000.is(block)){
        const storageData = await referendumInfoOf.v2000.get(block, index)
        if (!storageData) return undefined

        const { __kind: status } = storageData
        if (status === 'Ongoing') {
            let hash
            const { proposal, end, delay, threshold } = (storageData as v2000.ReferendumInfo_Ongoing).value
            if(proposal.__kind == "Inline") {
                hash = proposal.value
            }
            else{
                hash = proposal.hash
            }
            return {
                status,
                hash,
                end,
                delay,
                threshold: threshold.__kind,
            }
        } else {
            const { end, approved } = storageData as v2000.ReferendumInfo_Finished
            return {
                status,
                end,
                approved,
            }
        }

    }
     else {
        throw new UnknownVersionError('Democracy/.ReferendumInfoOf')
    }
}

export async function getReferendumInfoOf(ctx: ProcessorContext<Store>, index: number, block: Block) {
    return await getStorageData(ctx, index, block)
}
