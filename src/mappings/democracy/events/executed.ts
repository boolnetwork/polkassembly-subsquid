import { ProposalStatus, ProposalType } from '../../../model'
import { ProcessorContext, Event, Block } from '../../../processor'
import { updateProposalStatus } from '../../utils/proposals'
import { getExecutedData } from './getters'
import { Store } from '@subsquid/typeorm-store'

export async function handleExecuted(ctx: ProcessorContext<Store>,
    item: Event,
    header: Block) {
    const index = getExecutedData(ctx, item)
    const extrinsicIndex = `${header.height}-${item.index}`

    await updateProposalStatus(ctx, header, index, ProposalType.Referendum, {
        isEnded: true,
        status: ProposalStatus.Executed,
        extrinsicIndex,
    })
}