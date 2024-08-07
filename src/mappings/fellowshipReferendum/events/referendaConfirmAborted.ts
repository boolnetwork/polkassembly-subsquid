// import { ProposalStatus, ProposalType } from '../../../model'
// import { EventHandlerContext } from '../../types/contexts'
// import { updateProposalStatus } from '../../utils/proposals'
// import { getConfirmAbortedData } from './getters'

// export async function handleConfirmAborted(ctx: EventHandlerContext) {
//     const { index } = getConfirmAbortedData(ctx)

//     await updateProposalStatus(ctx, index, ProposalType.FellowshipReferendum, {
//         isEnded: true,
//         status: ProposalStatus.ConfirmAborted,
//     })
// }