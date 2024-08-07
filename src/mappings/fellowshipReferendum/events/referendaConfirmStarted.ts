// import { Proposal, ProposalStatus, ProposalType } from '../../../model'
// import { EventHandlerContext } from '../../types/contexts'
// import { createDeciding, updateProposalStatus } from '../../utils/proposals'
// import { getConfirmStartedData } from './getters'

// export async function handleConfirmStarted(ctx: EventHandlerContext) {
//     const { index } = getConfirmStartedData(ctx)

//     const proposal = await ctx.store.get(Proposal, {
//         where: {
//                     index: index,
//                     type: ProposalType.FellowshipReferendum,
//                 },
//         order: {
//             id: 'DESC',
//         },
//     })

//     let deciding = undefined

//     if (proposal && proposal.deciding && proposal.deciding.since) {
//         deciding = createDeciding({confirming: ctx.block.height, since: proposal.deciding.since})
//     }
//     else {
//         deciding = createDeciding({confirming: ctx.block.height, since: ctx.block.height})
//     }

//     await updateProposalStatus(ctx, index, ProposalType.FellowshipReferendum, {
//         isEnded: true,
//         status: ProposalStatus.ConfirmStarted,
//         data: {
//             deciding: deciding
//         }
//     })
// }