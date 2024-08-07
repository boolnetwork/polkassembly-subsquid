import { toHex } from '@subsquid/substrate-processor'
// import { EventHandlerContext } from '../../types/contexts'
import { ProposalStatus, ProposalType } from '../../../model'
import { updatePreimageStatusV2 } from '../../utils/proposals'
import { getPreimageClearedData } from './getters'
// import { BatchContext, SubstrateBlock } from '@subsquid/substrate-processor'
// import { EventItem } from '@subsquid/substrate-processor/lib/interfaces/dataSelection'
import { Store } from '@subsquid/typeorm-store'
import { ProcessorContext, Event } from '../../../processor'

export async function handlePreimageV2Cleared(ctx: ProcessorContext<Store>,
    item: Event,
    header: any) {
    const { hash } = getPreimageClearedData(ctx, item)

    // const hexHash = toHex(hash)
    const extrinsicIndex = `${header.height}-${item.index}`

    const hexHash = hash

    await updatePreimageStatusV2(ctx, header, hexHash, {
        status: ProposalStatus.Cleared,
        extrinsicIndex,
    })
}