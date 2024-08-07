import { ProposalStatus, ProposalType } from '../../../model'
import { createDeciding, updateProposalStatus } from '../../utils/proposals'
import { getDecisionStartedData } from './getters'
import {createTally} from '../../utils/proposals'
import { toHex } from '@subsquid/substrate-processor'
import { Store } from '@subsquid/typeorm-store'
import { Block, Event, ProcessorContext } from '../../../processor'

export async function handleDecisionStarted(ctx: ProcessorContext<Store>,
    item: Event,
    header: Block) {
    const { index, tally, track, hash } = getDecisionStartedData(item)
    const tallyData = createTally(tally)

    const deciding = createDeciding({confirming: undefined, since: header.height})
    const extrinsicIndex = `${header.height}-${item.index}`


    await updateProposalStatus(ctx, header, index, ProposalType.ReferendumV2, {
        status: ProposalStatus.Deciding,
        extrinsicIndex,
        data: {
            tally: tallyData,
            trackNumber: track,
            hash: hash,
            deciding: deciding
        }
    })
}