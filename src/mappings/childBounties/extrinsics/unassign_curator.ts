// import { MissingProposalRecordWarn } from '../../../common/errors'
// import { Proposal, ProposalType } from '../../../model'
// import { CallHandlerContext } from '../../types/contexts'
// import { getUnassingCuratorData } from './getters'

// export async function handleUnassignCurator(ctx: CallHandlerContext) {
//     if (!ctx.call.success) return
//     const { parentBountyId, childBountyId } = getUnassingCuratorData(ctx)

//     const proposal = await ctx.store.get(Proposal, { where: { index: childBountyId, parentBountyIndex: parentBountyId, type: ProposalType.ChildBounty } })
//     if (!proposal) {
//         ctx.log.warn(MissingProposalRecordWarn(ProposalType.ChildBounty, childBountyId))
//         return
//     }

//     proposal.curator = null

//     await ctx.store.save(proposal)
// }
