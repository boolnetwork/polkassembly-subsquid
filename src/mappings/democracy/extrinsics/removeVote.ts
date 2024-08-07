import { Store } from '@subsquid/typeorm-store'
import { getOriginAccountId } from '../../../common/tools'
import { getRemoveVoteData } from './getters'
import { handleSubstratAndPrecompileRemoveVote } from './utils'
import { Call, ProcessorContext } from '../../../processor'

export async function handleRemoveVote(ctx: ProcessorContext<Store>,
    item: Call,
    header: any) : Promise<void> {
    if (!(item as any).success) return
    const { index } = getRemoveVoteData(ctx, item)
    const extrinsicIndex = `${header.height}-${item.extrinsicIndex}`
    const wallet = getOriginAccountId(item.origin)
    if(!wallet){
        return
    }
    await handleSubstratAndPrecompileRemoveVote(ctx, header, index, wallet, extrinsicIndex)
}

export async function handleDemocracyPrecompiledRemoveVote(ctx: ProcessorContext<Store>, itemCall: any, header: any, data: any, originAccountId: any, txnHash?: string) : Promise<void> {
    const [ index ] = data
    const extrinsicIndex = `${header.height}-${itemCall.extrinsicIndex}`
    if(!originAccountId){
        return
    }
    await handleSubstratAndPrecompileRemoveVote(ctx, header, Number(index), originAccountId, extrinsicIndex, txnHash)
}