// import { toHex } from '@subsquid/substrate-processor'
// import { MissingProposalRecordWarn } from '../../../common/errors'
// import { getOriginAccountId } from '../../../common/tools'
// import { Proposal, ProposalType, Tippers } from '../../../model'
// import { CallHandlerContext } from '../../types/contexts'
// import { getTipsTipData } from './getters'
// import { randomUUID } from 'crypto'

// export async function handleNewTipValue(ctx: CallHandlerContext) {
//     if (!ctx.call.success) return

//     const { hash, tipValue } = getTipsTipData(ctx)
//     const hexHash = toHex(hash)
//     const proposal = await ctx.store.get(Proposal, { where: { hash: hexHash, type: ProposalType.Tip } })
//     if (!proposal) {
//         ctx.log.warn(MissingProposalRecordWarn(ProposalType.Tip, hexHash))
//         return
//     }

//     const origin = getOriginAccountId(ctx.call.origin)

//     if (!origin) {
//         ctx.log.warn(`Origin for Tips.tip is null`)
//         return
//     }

//     const tipper = new Tippers({
//         id: randomUUID(),
//         hash: hexHash,
//         tipper: origin,
//         value: tipValue,
//         proposal: proposal,
//         createdAtBlock: ctx.block.height,
//         createdAt: new Date(ctx.block.timestamp),
//     })

//     await ctx.store.save(tipper)
// }