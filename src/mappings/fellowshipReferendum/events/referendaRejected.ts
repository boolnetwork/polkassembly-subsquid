// import { ProposalStatus, ProposalType } from '../../../model'
// import { EventHandlerContext } from '../../types/contexts'
// import { updateProposalStatus } from '../../utils/proposals'
// import { getRejectedData } from './getters'
// import {createTally} from '../../utils/proposals'

// export async function handleRejected(ctx: EventHandlerContext) {
//     const { index, tally } = getRejectedData(ctx)

//     const tallyData = createTally(tally)

//     await updateProposalStatus(ctx, index, ProposalType.FellowshipReferendum, {
//         isEnded: true,
//         status: ProposalStatus.Rejected,
//         data: {
//             tally: tallyData
//         }
//     })
// }