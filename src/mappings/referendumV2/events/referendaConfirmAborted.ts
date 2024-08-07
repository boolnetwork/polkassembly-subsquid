import { ProposalStatus, ProposalType } from '../../../model'
import { ProcessorContext, Block, Event } from '../../../processor'
import { updateProposalStatus } from '../../utils/proposals'
import { getConfirmAbortedData } from './getters'
import { Store } from '@subsquid/typeorm-store'

export async function handleConfirmAborted(ctx: ProcessorContext<Store>,
    item: Event,
    header: Block) {
    const { index } = getConfirmAbortedData(item)
    const extrinsicIndex = `${header.height}-${item.index}`

    await updateProposalStatus(ctx, header, index, ProposalType.ReferendumV2, {
        status: ProposalStatus.ConfirmAborted,
        extrinsicIndex,
    })
}