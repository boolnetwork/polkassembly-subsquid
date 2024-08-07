// import { ProposalStatus, ProposalType } from '../../../model'
// import { EventHandlerContext } from '../../types/contexts'
// import { updateProposalStatus } from '../../utils/proposals'
// import { getTimedOutData } from './getters'
// import {createTally} from '../../utils/proposals'

// export async function handleTimedOut(ctx: EventHandlerContext) {
//     const { index } = getTimedOutData(ctx)

//     await updateProposalStatus(ctx, index, ProposalType.FellowshipReferendum, {
//         isEnded: true,
//         status: ProposalStatus.TimedOut,
//     })
// }