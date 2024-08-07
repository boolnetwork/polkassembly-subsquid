import { UnknownVersionError } from '../../../common/errors'
import { ProcessorContext, Event } from '../../../processor'
import { awarded, proposed, rejected, spendApproved } from '../../../types/treasury/events'
import { Store } from '@subsquid/typeorm-store'
interface ProposedData {
    index: number
}

export function getProposedData(ctx: ProcessorContext<Store>, itemEvent: Event): ProposedData {
    if (proposed.v900.is(itemEvent)) {
        const index = proposed.v900.decode(itemEvent)
        return {
            index,
        }
    } else if (proposed.v1300.is(itemEvent)) {
        const { proposalIndex: index } = proposed.v1300.decode(itemEvent)
        return {
            index,
        }
    } else {
        throw new UnknownVersionError(itemEvent.name)
    }
}

interface RejectedData {
    index: number
}

export function getRejectedData(ctx: ProcessorContext<Store>, itemEvent: Event): RejectedData {
    if (rejected.v900.is(itemEvent)) {
        const [index] = rejected.v900.decode(itemEvent)
        return {
            index,
        }
    } else if (rejected.v1300.is(itemEvent)) {
        const { proposalIndex: index } = rejected.v1300.decode(itemEvent)
        return {
            index,
        }
    } else {
        throw new UnknownVersionError(itemEvent.name)
    }
}

interface AwarderData {
    index: number
}

export function getAwarderData(ctx: ProcessorContext<Store>, itemEvent: Event): AwarderData {
    if (awarded.v900.is(itemEvent)) {
        const [index] = awarded.v900.decode(itemEvent)
        return {
            index,
        }
    } else if (awarded.v1300.is(itemEvent)) {
        const { proposalIndex: index } = awarded.v1300.decode(itemEvent)
        return {
            index,
        }
    } else {
        throw new UnknownVersionError(itemEvent.name)
    }
}

interface SpendApprovedData {
    proposalIndex: number
    amount: bigint
    beneficiary: string

}

export function getSpendApprovedData(ctx: ProcessorContext<Store>, itemEvent: Event): SpendApprovedData {
    if (spendApproved.v1802.is(itemEvent)) {
        const { proposalIndex, amount, beneficiary}= spendApproved.v1802.decode(itemEvent)
        return {
            proposalIndex,
            amount,
            beneficiary
        }
    }
    else {
        throw new UnknownVersionError(itemEvent.name)
    }

}