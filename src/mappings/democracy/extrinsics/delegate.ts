import { getOriginAccountId } from '../../../common/tools'
import { getDelegateData } from './getters'
import { Store } from '@subsquid/typeorm-store'
import { handleSubtrateAndPrecompileDelegationVote } from './utils'
import { ProcessorContext, Call } from '../../../processor'

export async function handleDelegate(ctx: ProcessorContext<Store>,
    item: Call,
    header: any): Promise<void> {
    if (!(item as any).success) return
    const extrinsicIndex = `${header.height}-${item.extrinsicIndex}`

    const { to, lockPeriod, balance } = getDelegateData(ctx, item)
    const toWallet = to
    const from = getOriginAccountId(item.origin)
    if(!from){
        return
    }
    await handleSubtrateAndPrecompileDelegationVote(ctx, header, toWallet, lockPeriod, balance || BigInt(0), from, extrinsicIndex)
}

export async function handleDemocracyPrecompileDelegate(ctx: ProcessorContext<Store>, item: Call, header: any, data: any, originAccountId: any, txnHash: string): Promise<void> {
    const [ toWallet, lockPeriod, balance] = data
    const extrinsicIndex = `${header.height}-${item.extrinsicIndex}`

    const from = originAccountId
    if(!from){
        return
    }
    await handleSubtrateAndPrecompileDelegationVote(ctx, header, toWallet.toLowerCase(), Number(lockPeriod), balance || BigInt(0), from, extrinsicIndex)
}
