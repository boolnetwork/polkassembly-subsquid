// import { ProposalStatus, ProposalType } from '../../../model'
// import { EventHandlerContext } from '../../types/contexts'
// import { updateProposalStatus } from '../../utils/proposals'
// import { getCancelledData } from './getters'
// import {createTally} from '../../utils/proposals'

// export async function handleCancelled(ctx: EventHandlerContext) {
//     const { index, tally } = getCancelledData(ctx)

//     const tallyData = createTally(tally)

//     await updateProposalStatus(ctx, index, ProposalType.FellowshipReferendum, {
//         isEnded: true,
//         status: ProposalStatus.Cancelled,
//         data: {
//             tally: tallyData
//         }
//     })
// }