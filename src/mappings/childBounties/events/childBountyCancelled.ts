// import { EventHandlerContext } from '../../types/contexts'
// import { ProposalStatus, ProposalType } from '../../../model'
// import { updateProposalStatus } from '../../utils/proposals'
// import { getChildBountyCancelledData } from './getters'

// export async function handleCancelled(ctx: EventHandlerContext) {
//     const { parentIndex, childIndex } = getChildBountyCancelledData(ctx)

//     await updateProposalStatus(ctx, childIndex, ProposalType.ChildBounty, {
//         isEnded: true,
//         status: ProposalStatus.Cancelled,
//     })
// }