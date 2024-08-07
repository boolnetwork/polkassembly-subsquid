import { ProposalStatus, ProposalType } from '../../../model'
import { ProcessorContext, Event } from '../../../processor';
import { updateProposalStatus } from '../../utils/proposals'
import { getTimedOutData } from './getters'
import { Store } from '@subsquid/typeorm-store'

export async function handleTimedOut(ctx: ProcessorContext<Store>,
    item: Event,
    header: any) {
    const { index } = getTimedOutData(item)

    const extrinsicIndex = `${header.height}-${item.index}`

    await updateProposalStatus(ctx, header, index, ProposalType.ReferendumV2, {
        isEnded: true,
        extrinsicIndex,
        status: ProposalStatus.TimedOut,
    })
}