import { toHex } from '@subsquid/substrate-processor'
import { ProposalStatus } from '../../../model'
import { updatePreimageStatus } from '../../utils/proposals'
import { getPreimageReapedData } from './getters'
import { Store } from '@subsquid/typeorm-store'
import { ProcessorContext, Block, Event } from '../../../processor'

export async function handlePreimageReaped(ctx: ProcessorContext<Store>,
    item: Event,
    header: Block) {
    const { hash } = getPreimageReapedData(ctx, item)

    const extrinsicIndex = `${header.height}-${item.index}`

    await updatePreimageStatus(ctx, header, hash, {
        status: ProposalStatus.Reaped,
        extrinsicIndex,
    })
}