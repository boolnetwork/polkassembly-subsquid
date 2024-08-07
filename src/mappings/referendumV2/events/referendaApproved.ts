import { ProposalStatus, ProposalType } from '../../../model'
import { ProcessorContext, Block, Event } from '../../../processor'
import { updateProposalStatus } from '../../utils/proposals'
import { getApprovedData } from './getters'
import { Store } from '@subsquid/typeorm-store'

export async function handleApproved(ctx: ProcessorContext<Store>,
    item: Event,
    header: Block) {
    const { index } = getApprovedData(item)
    const extrinsicIndex = `${header.height}-${item.index}`


    await updateProposalStatus(ctx, header, index, ProposalType.ReferendumV2, {
        isEnded: true,
        status: ProposalStatus.Approved,
        extrinsicIndex,
    })
}