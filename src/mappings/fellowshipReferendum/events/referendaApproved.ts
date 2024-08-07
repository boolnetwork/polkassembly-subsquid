// import { ProposalStatus, ProposalType } from '../../../model'
// import { EventHandlerContext } from '../../types/contexts'
// import { updateProposalStatus } from '../../utils/proposals'
// import { getApprovedData } from './getters'

// export async function handleApproved(ctx: EventHandlerContext) {
//     const { index } = getApprovedData(ctx)

//     await updateProposalStatus(ctx, index, ProposalType.FellowshipReferendum, {
//         isEnded: true,
//         status: ProposalStatus.Approved,
//     })
// }