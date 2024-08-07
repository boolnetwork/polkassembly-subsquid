import { toHex } from '@subsquid/substrate-processor'
import { ProposalStatus } from '../../../model'
import { updatePreimageStatus } from '../../utils/proposals'
import { getPreimageUsedData } from './getters'
import { Store } from '@subsquid/typeorm-store'
import { ProcessorContext, Block, Event } from '../../../processor'

export async function handlePreimageUsed(ctx: ProcessorContext<Store>,
    item: Event,
    header: Block) {
    const { hash } = getPreimageUsedData(ctx, item)
    const extrinsicIndex = `${header.height}-${item.index}`

    await updatePreimageStatus(ctx, header, hash, {
        status: ProposalStatus.Used,
        extrinsicIndex,
    })
}