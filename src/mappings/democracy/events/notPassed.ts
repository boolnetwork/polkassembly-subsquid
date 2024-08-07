import { ProposalStatus, ProposalType } from '../../../model'
import { ProcessorContext, Event, Block } from '../../../processor'
import { updateProposalStatus } from '../../utils/proposals'
import { getNotPassedData } from './getters'
import { Store } from '@subsquid/typeorm-store'

export async function handleNotPassed(ctx: ProcessorContext<Store>,
    item: Event,
    header: Block) {
    const index = getNotPassedData(ctx, item)
    const extrinsicIndex = `${header.height}-${item.index}`

    await updateProposalStatus(ctx, header, index, ProposalType.Referendum, {
        isEnded: true,
        status: ProposalStatus.NotPassed,
        extrinsicIndex,
    })
}