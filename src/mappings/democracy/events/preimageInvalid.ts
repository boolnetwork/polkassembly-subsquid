import { toHex } from '@subsquid/substrate-processor'
import { ProposalStatus, ProposalType } from '../../../model'
import { updatePreimageStatus } from '../../utils/proposals'
import { getPreimageInvalidData } from './getters'
import { Store } from '@subsquid/typeorm-store'
import { ProcessorContext, Block, Event } from '../../../processor'

export async function handlePreimageInvalid(ctx: ProcessorContext<Store>,
    item: Event,
    header: Block) {
    const { hash } = getPreimageInvalidData(ctx, item)
    const extrinsicIndex = `${header.height}-${item.index}`

    await updatePreimageStatus(ctx, header, hash, {
        status: ProposalStatus.Invalid,
        extrinsicIndex,
    })
}