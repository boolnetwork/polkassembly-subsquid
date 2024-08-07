import { Proposal, ProposalStatus, ProposalType } from '../../../model'
import { ProcessorContext, Event, Block } from '../../../processor';
import { createDeciding, updateProposalStatus } from '../../utils/proposals'
import { getConfirmStartedData } from './getters'
import { Store } from '@subsquid/typeorm-store'

export async function handleConfirmStarted(ctx: ProcessorContext<Store>,
    item: Event,
    header: Block) {
    const { index } = getConfirmStartedData(item)

    const proposal = await ctx.store.get(Proposal, {
        where: {
                    index: index,
                    type: ProposalType.ReferendumV2,
                },
        order: {
            id: 'DESC',
        },
    })

    let deciding = undefined
    const extrinsicIndex = `${header.height}-${item.index}`


    if (proposal && proposal.deciding && proposal.deciding.since) {
        deciding = createDeciding({confirming: header.height, since: proposal.deciding.since})
    }
    else {
        deciding = createDeciding({confirming: header.height, since: header.height})
    }

    await updateProposalStatus(ctx, header, index, ProposalType.ReferendumV2, {
        status: ProposalStatus.ConfirmStarted,
        extrinsicIndex,
        data: {
            deciding: deciding
        }
    })
}