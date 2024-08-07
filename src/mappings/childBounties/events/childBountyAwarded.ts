// import { EventHandlerContext } from '../../types/contexts'
// import { ProposalStatus, ProposalType } from '../../../model'
// import { ss58codec } from '../../../common/tools'
// import { updateProposalStatus } from '../../utils/proposals'
// import { getChildBountyAwardedData } from './getters'

// export async function handleAwarded(ctx: EventHandlerContext) {
//     const { childIndex, beneficiary } = getChildBountyAwardedData(ctx)

//     await updateProposalStatus(ctx, childIndex, ProposalType.ChildBounty, {
//         isEnded: true,
//         status: ProposalStatus.Awarded,
//         data: {
//             payee: toHex(beneficiary),
//         },
//     })
// }