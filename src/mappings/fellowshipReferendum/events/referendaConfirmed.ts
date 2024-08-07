// import { ProposalStatus, ProposalType } from '../../../model'
// import { EventHandlerContext } from '../../types/contexts'
// import { updateProposalStatus } from '../../utils/proposals'
// import { getConfirmedData } from './getters'
// import {createTally} from '../../utils/proposals'

// export async function handleConfirmed(ctx: EventHandlerContext) {
//     const { index, tally } = getConfirmedData(ctx)

//     const tallyData = createTally(tally)

//     await updateProposalStatus(ctx, index, ProposalType.FellowshipReferendum, {
//         isEnded: true,
//         status: ProposalStatus.Confirmed,
//         data: {
//             tally: tallyData
//         }
//     })
// }