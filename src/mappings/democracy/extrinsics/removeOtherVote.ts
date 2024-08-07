import { Store } from '@subsquid/typeorm-store'
import { getRemoveOtherVoteData } from './getters'
import { handleSubstratAndPrecompileRemoveVote } from './utils'
import { Call, ProcessorContext } from '../../../processor'

export async function handleRemoveOtherVote(ctx: ProcessorContext<Store>,
    item: Call,
    header: any): Promise<void> {
    if (!(item as any).success) return
    const { target, index } = getRemoveOtherVoteData(ctx, item)
    const extrinsicIndex = `${header.height}-${item.extrinsicIndex}`

    if(!target){
        return
    }
    await handleSubstratAndPrecompileRemoveVote(ctx, header, index, target, extrinsicIndex)

}

export async function handleDemocracyPrecompileRemoveOtherVote(ctx: ProcessorContext<Store>, itemCall: any, header: any, data: any, originAccountId: any, txnHash?: string): Promise<void> {
    const [ wallet, index ] = data
    const extrinsicIndex = `${header.height}-${itemCall.extrinsicIndex}`

    if(!wallet){
        return
    }
    await handleSubstratAndPrecompileRemoveVote(ctx, header, Number(index), wallet.toLowerCase(), extrinsicIndex, txnHash)
}