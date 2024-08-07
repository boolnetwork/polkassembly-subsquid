import { ProposalStatus, ProposalType } from '../../../model'
import { ProcessorContext, Block, Event } from '../../../processor';
import { updateProposalStatus } from '../../utils/proposals'
import { getRejectedData } from './getters'
import { Store } from '@subsquid/typeorm-store'

export async function handleRejected(ctx: ProcessorContext<Store>,
    item: Event,
    header: Block) {
    const { index } = getRejectedData(ctx, item)

    const extrinsicIndex = `${header.height}-${item.index}`

    await updateProposalStatus(ctx, header, index, ProposalType.TreasuryProposal, {
        isEnded: true,
        status: ProposalStatus.Rejected,
        extrinsicIndex,
    })
}