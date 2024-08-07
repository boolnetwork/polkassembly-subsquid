// import { EventHandlerContext } from '../../types/contexts'
// import { ProposalStatus, ProposalType } from '../../../model'
// import { ss58codec } from '../../../common/tools'
// import { updateProposalStatus } from '../../utils/proposals'
// import { getChildBountyClaimedData } from './getters'

// export async function handleClaimed(ctx: EventHandlerContext) {
//     const { parentIndex, childIndex, payout, beneficiary } = getChildBountyClaimedData(ctx)

//     await updateProposalStatus(ctx, childIndex, ProposalType.ChildBounty, {
//         status: ProposalStatus.Claimed,
//         data: {
//             reward: payout,
//             payee: toHex(beneficiary),
//         },
//     })
// }