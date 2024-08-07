import { ProposalStatus, ProposalType } from '../../../model'
import { ProcessorContext, Event, Block } from '../../../processor'
import { updateProposalStatus } from '../../utils/proposals'
import { getPassedData } from './getters'
import { Store } from '@subsquid/typeorm-store'

export async function handlePassed(ctx: ProcessorContext<Store>,
    item: Event,
    header: Block) {
    const index = getPassedData(ctx, item)
    const extrinsicIndex = `${header.height}-${item.index}`

    await updateProposalStatus(ctx, header, index, ProposalType.Referendum, {
        isEnded: true,
        status: ProposalStatus.Passed,
        extrinsicIndex,
    })
}