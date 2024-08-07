// import { ProposalStatus, ProposalType } from '../../../model'
// import { EventHandlerContext } from '../../types/contexts'
// import { updateProposalStatus } from '../../utils/proposals'
// import { getKilledData } from './getters'
// import {createTally} from '../../utils/proposals'

// export async function handleKilled(ctx: EventHandlerContext) {
//     const { index, tally } = getKilledData(ctx)

//     const tallyData = createTally(tally)

//     await updateProposalStatus(ctx, index, ProposalType.FellowshipReferendum, {
//         isEnded: true,
//         status: ProposalStatus.Killed,
//         data: {
//             tally: tallyData
//         }
//     })
// }