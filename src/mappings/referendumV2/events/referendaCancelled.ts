import { ProposalStatus, ProposalType } from '../../../model'
import { updateProposalStatus } from '../../utils/proposals'
import { getCancelledData } from './getters'
import {createTally} from '../../utils/proposals'
import { Store } from '@subsquid/typeorm-store'
import { Block, ProcessorContext, Event } from '../../../processor'

export async function handleCancelled(ctx: ProcessorContext<Store>, item: Event, header: Block) {
    const { index, tally } = getCancelledData(item)

    const tallyData = createTally(tally)

    const extrinsicIndex = `${header.height}-${item.index}`


    await updateProposalStatus(ctx, header, index, ProposalType.ReferendumV2, {
        isEnded: true,
        status: ProposalStatus.Cancelled,
        extrinsicIndex,
        data: {
            tally: tallyData
        }
    })
}