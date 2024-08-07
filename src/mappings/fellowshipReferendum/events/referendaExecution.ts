// import { Proposal, ProposalStatus, ProposalType } from '../../../model'
// import { EventHandlerContext } from '../../types/contexts'
// import { updateProposalStatus } from '../../utils/proposals'
// import { getDispatchedEventData } from '../../../common/scheduledData'
// // import { NoReferendaFoundForExecution } from '../../../common/errors'
// // import { BatchContext, SubstrateBlock } from '@subsquid/substrate-processor'
// // import { EventItem } from '@subsquid/substrate-processor/lib/interfaces/dataSelection'
// // import { Store } from '@subsquid/typeorm-store'

// export async function handleFellowshipReferendumExecution(ctx: EventHandlerContext) {
//     const eventData = getDispatchedEventData(ctx)
//     if(!eventData){
//         return null
//     }

//     const proposal = await ctx.store.get(Proposal, {
//         where: {
//                     type: ProposalType.FellowshipReferendum,
//                     executeAtBlockNumber: eventData.blockNumber,
//                     status: ProposalStatus.Confirmed
//                 },
//         order: {
//             id: 'DESC',
//         },
//     })

//     if(!proposal || !proposal.index){
//         return;
//     }

//     await updateProposalStatus(ctx, proposal.index, ProposalType.FellowshipReferendum, {
//         isEnded: true,
//         status: ProposalStatus.Executed,
//         data: {
//             executedAt: new Date(ctx.block.timestamp)
//         }
//     })
// }