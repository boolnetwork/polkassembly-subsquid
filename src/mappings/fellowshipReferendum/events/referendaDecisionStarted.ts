// import { ProposalStatus, ProposalType } from '../../../model'
// import { EventHandlerContext } from '../../types/contexts'
// import { createDeciding, updateProposalStatus } from '../../utils/proposals'
// import { getDecisionStartedData } from './getters'
// import {createTally} from '../../utils/proposals'
// import { toHex } from '@subsquid/substrate-processor'

// export async function handleDecisionStarted(ctx: EventHandlerContext) {
//     const { index, tally, track, hash } = getDecisionStartedData(ctx)
//     const tallyData = createTally(tally)

//     const deciding = createDeciding({confirming: undefined, since: ctx.block.height})

//     await updateProposalStatus(ctx, index, ProposalType.FellowshipReferendum, {
//         isEnded: true,
//         status: ProposalStatus.Deciding,
//         data: {
//             tally: tallyData,
//             trackNumber: track,
//             hash: toHex(hash),
//             deciding: deciding
//         }
//     })
// }