// import { ProposalStatus, ProposalType } from '../../../model'
// import { EventHandlerContext } from '../../types/contexts'
// import { updateProposalStatus } from '../../utils/proposals'
// import { getDecisionDepositPlacedData } from './getters'
// import {createDecisionDeposit} from '../../utils/proposals'
// import { ss58codec } from '../../../common/tools'

// export async function handleDecisionDepositPlaced(ctx: EventHandlerContext) {
//     const { index, who, amount } = getDecisionDepositPlacedData(ctx)

//     const decisionDeposit = createDecisionDeposit({who: toHex(who), amount})

//     await updateProposalStatus(ctx, index, ProposalType.FellowshipReferendum, {
//         isEnded: true,
//         status: ProposalStatus.DecisionDepositPlaced,
//         data: {
//             decisionDeposit: decisionDeposit
//         }
//     })
// }