import { toHex } from '@subsquid/substrate-processor'
import { ProposalStatus } from '../../../model'
import { updatePreimageStatus } from '../../utils/proposals'
import { getPreimageMissingData } from './getters'
import { Store } from '@subsquid/typeorm-store'
import { ProcessorContext, Block, Event } from '../../../processor'

export async function handlePreimageMissing(ctx: ProcessorContext<Store>,
    item: Event,
    header: Block) {
    const { hash } = getPreimageMissingData(ctx, item)
    const extrinsicIndex = `${header.height}-${item.index}`

    await updatePreimageStatus(ctx, header, hash, {
        status: ProposalStatus.Missing,
        extrinsicIndex,
    })
}