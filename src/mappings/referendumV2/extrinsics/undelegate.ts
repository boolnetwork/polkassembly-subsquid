import { getOriginAccountId } from '../../../common/tools'
import { handleSubstrateAndPrecompileUndelegate } from './utils'
import { getUndelegateData } from './getters'
import { Store } from '@subsquid/typeorm-store'
import { Call, ProcessorContext } from '../../../processor'

export async function handleUndelegate(ctx: ProcessorContext<Store>,
    item: Call,
    header: any): Promise<void> {
    if (!(item as any).success) return
    const from = getOriginAccountId(item.origin)
    const { track } = getUndelegateData(ctx, item)
    if(!from){
        return
    }
    const extrinsicIndex = `${header.height}-${item.extrinsicIndex}`

    await handleSubstrateAndPrecompileUndelegate(ctx, header, from, track, extrinsicIndex)
}

export async function handlePrecompileUndelegate(ctx: ProcessorContext<Store>, itemCall: any, header: any, data: any, originAccountId: any, txnHash?: string): Promise<void> {
    const [track] = data
    const from = originAccountId
    if(!from){
        return
    }
    const extrinsicIndex = `${header.height}-${itemCall.extrinsicIndex}`

    await handleSubstrateAndPrecompileUndelegate(ctx, header, from, Number(track), extrinsicIndex)
}