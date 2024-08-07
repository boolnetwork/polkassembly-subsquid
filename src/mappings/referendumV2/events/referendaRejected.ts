import { ProposalStatus, ProposalType } from '../../../model'
import { updateProposalStatus } from '../../utils/proposals'
import { getRejectedData } from './getters'
import {createTally} from '../../utils/proposals'
import { Store } from '@subsquid/typeorm-store'
import { ProcessorContext, Event } from '../../../processor'

export async function handleRejected(ctx: ProcessorContext<Store>,
    item: Event,
    header: any) {
    const { index, tally } = getRejectedData(item)

    const tallyData = createTally(tally)

    const extrinsicIndex = `${header.height}-${item.index}`

    await updateProposalStatus(ctx, header, index, ProposalType.ReferendumV2, {
        isEnded: true,
        status: ProposalStatus.Rejected,
        extrinsicIndex,
        data: {
            tally: tallyData
        }
    })
}