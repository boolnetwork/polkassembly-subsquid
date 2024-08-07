import { toHex } from '@subsquid/substrate-processor'
import { proposed } from '../../../types/democracy/events'
import { StorageNotExistsWarn, UnknownVersionError } from '../../../common/errors'
import { ProposalStatus, ProposalType } from '../../../model'
import { ss58codec } from '../../../common/tools'
import { publicProps } from '../../../types/democracy/storage'
import { createDemocracyProposal } from '../../utils/proposals'
import { Store } from '@subsquid/typeorm-store'
import { Block, Event, ProcessorContext } from '../../../processor'
import { storage } from '../../../storage'

interface DemocracyProposalEventData {
    index: number
    deposit: bigint
}

function getEventData(ctx: ProcessorContext<Store>, itemEvent: Event): DemocracyProposalEventData {
    if (proposed.v900.is(itemEvent)) {
        const [index, deposit] = proposed.v900.decode(itemEvent)
        return {
            index,
            deposit,
        }
    } else if (proposed.v1201.is(itemEvent)) {
        const { proposalIndex: index, deposit } = proposed.v1201.decode(itemEvent)
        return {
            index,
            deposit,
        }
    } else {
        throw new UnknownVersionError(itemEvent.name)
    }
}

export async function handleProposed(ctx: ProcessorContext<Store>,
    item: Event,
    header: Block) {
    const { index, deposit } = getEventData(ctx, item)
    const extrinsicIndex = `${header.height}-${item.index}`

    const storageData = await storage.democracy.getProposals(ctx, header)
    if (!storageData) {
        ctx.log.warn(`Storage doesn't exist for democracy proposals at block ${header.height}`)
        return
    }

    const proposalData = storageData.find((prop) => prop.index === index)
    if (!proposalData) {
        ctx.log.warn(StorageNotExistsWarn(ProposalType.DemocracyProposal, index))
        return
    }
    const { hash, proposer } = proposalData

    await createDemocracyProposal(ctx, header, {
        hash: hash,
        index,
        proposer: proposer,
        status: ProposalStatus.Proposed,
        deposit,
        extrinsicIndex,
    })
}