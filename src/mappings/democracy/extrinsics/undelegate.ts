import { getOriginAccountId } from '../../../common/tools'
import { handleSubstrateAndPrecompileUndelegate } from './utils'
import { Store } from '@subsquid/typeorm-store'
import { Call, ProcessorContext } from '../../../processor'

export async function handleUndelegate(ctx: ProcessorContext<Store>,
    item: Call,
    header: any): Promise<void> {
    if (!(item as any).success) return
    const from = getOriginAccountId(item.origin)
    if(!from){
        return
    }
    const extrinsicIndex = `${header.height}-${item.extrinsicIndex}`

    await handleSubstrateAndPrecompileUndelegate(ctx, header, from, extrinsicIndex)
}

export async function handleDemocracyPrecompileUndelegate(ctx: ProcessorContext<Store>, itemCall: any, header: any, data: any, originAccountId: any, txnHash?: string): Promise<void> {
    const from = originAccountId
    const extrinsicIndex = `${header.height}-${itemCall.extrinsicIndex}`

    if(!from){
        return
    }
    await handleSubstrateAndPrecompileUndelegate(ctx, header, from.toLowerCase(), extrinsicIndex)
}