// import { MissingProposalRecordWarn } from '../../../common/errors'
// import { getOriginAccountId } from '../../../common/tools'
// import { Proposal, ProposalType } from '../../../model'
// import { CallHandlerContext } from '../../types/contexts'
// import { getAccepterCuratorData } from './getters'

// export async function handleAcceptCurator(ctx: CallHandlerContext) {
//     if (!ctx.call.success) return

//     const { parentBountyId, childBountyId } = getAccepterCuratorData(ctx)

//     const proposal = await ctx.store.get(Proposal, { where: { index: childBountyId, parentBountyIndex: parentBountyId, type: ProposalType.ChildBounty } })
//     if (!proposal) {
//         ctx.log.warn(MissingProposalRecordWarn(ProposalType.ChildBounty, childBountyId))
//         return
//     }

//     const origin = getOriginAccountId(ctx.call.origin)
//     if (!origin) {
//         ctx.log.warn(`Origin for accept_curator is null`)
//         return
//     }
//     proposal.curator = origin

//     await ctx.store.save(proposal)
// }
