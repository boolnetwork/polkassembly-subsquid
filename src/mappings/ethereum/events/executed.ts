// import { ConvictionVote, ProposalStatus, ProposalType } from '../../../model'
// import { updateProposalStatus } from '../../utils/proposals'
// import { getExecutedData } from './getters'
// import { BatchContext, SubstrateBlock, toHex } from '@subsquid/substrate-processor'
// import { EventItem } from '@subsquid/substrate-processor/lib/interfaces/dataSelection'
// import { Store } from '@subsquid/typeorm-store'

// export async function handleExecuted(ctx: BatchContext<Store, unknown>,
//     item: EventItem<'Ethereum.Executed', { event: { args: true; extrinsic: { hash: true } } }>,
//     header: SubstrateBlock) {
//     const { success, txnHash } = getExecutedData(ctx, item.event)

//     const vote = await ctx.store.get(ConvictionVote, { where: { txnHash: toHex(txnHash) } })

//     if (!vote) {
//         ctx.log.warn(`No conviction precompile vote found for executed transaction ${toHex(txnHash)}`)
//         return
//     }
//     if(success){
//         vote.txnExecuted = true
//     }
//     else{
//         vote.txnExecuted = false
//     }
//     await ctx.store.save(vote)

// }