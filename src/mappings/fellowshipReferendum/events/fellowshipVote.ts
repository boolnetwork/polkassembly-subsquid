// import { MissingProposalRecordWarn } from '../../../common/errors'
// import { ss58codec } from '../../../common/tools'
// import { Proposal, ProposalType, StandardVoteBalance, Vote, VoteType } from '../../../model'
// import { EventHandlerContext } from '../../types/contexts'
// import { getVotesCount } from '../../utils/votes'
// import { getFellowshipVoteData } from './getters'

// export async function handleFellowshipVotes(ctx: EventHandlerContext) {
//     const { accountId, index, decision, amount, tally } = getFellowshipVoteData(ctx)

//     const proposal = await ctx.store.get(Proposal, { where: { index, type: ProposalType.FellowshipReferendum } })
//     if (!proposal) {
//         ctx.log.warn(MissingProposalRecordWarn(ProposalType.FellowshipReferendum, index))
//         return
//     }

//     const count = await getVotesCount(ctx, proposal.id)

//     await ctx.store.insert(
//         new Vote({
//             id: `${proposal.id}-${count.toString().padStart(8, '0')}`,
//             voter: toHex(accountId),
//             blockNumber: ctx.block.height,
//             decision: decision,
//             proposal,
//             balance: new StandardVoteBalance({
//                 value: amount ? BigInt(amount) : BigInt(0),
//             }),
//             timestamp: new Date(ctx.block.timestamp),
//             type: VoteType.Fellowship,
//         })
//     )
// }