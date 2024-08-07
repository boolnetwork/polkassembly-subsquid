import { UnknownVersionError } from '../../common/errors'
import { Store } from '@subsquid/typeorm-store'
import { publicProps } from '../../types/democracy/storage'
import { ProcessorContext, Block } from '../../processor'

interface DemocracyProposalStorageData {
    index: number
    hash: string
    proposer: string
}

async function getStorageData(ctx: ProcessorContext<Store>, block: Block): Promise<DemocracyProposalStorageData[] | undefined> {
    if (publicProps.v900.is(block)) {
        const storageData = await publicProps.v900.get(block)
        if (!storageData) return undefined

        return storageData.map((proposal: any): DemocracyProposalStorageData => {
            const [index, hash, proposer] = proposal
            return {
                index,
                hash,
                proposer,
            }
        })
    } else if(publicProps.v2000.is(block)){
        const storageData = await publicProps.v2000.get(block)
        if (!storageData) return undefined

        return storageData.map((proposal): DemocracyProposalStorageData => {
            const [index, hash, proposer] = proposal
            if(hash.__kind === 'Inline'){
                return {
                    index,
                    hash: hash.value,
                    proposer,
                }
            }else{
                return {
                    index,
                    hash: hash.hash,
                    proposer,
                }
            }
        })

    }else {
        throw new UnknownVersionError('Democracy.PublicProps')
    }
}

export async function getProposals(ctx: ProcessorContext<Store>, block: Block) {
    return await getStorageData(ctx, block)
}