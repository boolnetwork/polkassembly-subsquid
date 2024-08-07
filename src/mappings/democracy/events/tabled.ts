import { tabled } from '../../../types/democracy/events'
import { UnknownVersionError } from '../../../common/errors'
import { ProposalStatus, ProposalType } from '../../../model'
import { updateProposalStatus } from '../../utils/proposals'
import { Store } from '@subsquid/typeorm-store'
import { ProcessorContext, Block, Event } from '../../../processor'
interface TabledEventData {
    index: number
    deposit: bigint
    depositors?: string[]
}

function getEventData(ctx: ProcessorContext<Store>, itemEvent: Event): TabledEventData {
    if (tabled.v900.is(itemEvent)) {
        const [index, deposit, depositors] = tabled.v900.decode(itemEvent)
        return {
            index,
            deposit,
            depositors,
        }
    } else if (tabled.v1201.is(itemEvent)) {
        const { proposalIndex: index, deposit, depositors } = tabled.v1201.decode(itemEvent)
        return {
            index,
            deposit,
            depositors,
        }
    } else if (tabled.v2000.is(itemEvent)) {
        const { proposalIndex: index, deposit } = tabled.v2000.decode(itemEvent)
        return {
            index,
            deposit,
        }
    }
     else {
        throw new UnknownVersionError(itemEvent.name)
    }
}

export async function handleTabled(ctx: ProcessorContext<Store>,
    item: Event,
    header: Block) {
    const { index } = getEventData(ctx,  item)
    const extrinsicIndex = `${header.height}-${item.index}`

    await updateProposalStatus(ctx, header, index, ProposalType.DemocracyProposal, {
        status: ProposalStatus.Tabled,
        isEnded: true,
        extrinsicIndex,
    })
}