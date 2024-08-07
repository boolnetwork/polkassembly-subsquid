import { UnknownVersionError } from '../../../common/errors'
import {
    cancelled,
    executed,
    notPassed,
    passed,
    preimageInvalid,
    preimageMissing,
    preimageNoted,
    preimageReaped,
    preimageUsed,
    seconded,
} from '../../../types/democracy/events'
import { Store } from '@subsquid/typeorm-store'
import { ProcessorContext, Event } from '../../../processor'

export function getCancelledData(ctx: ProcessorContext<Store>, itemEvent: Event): number {
    if (cancelled.v900.is(itemEvent)) {
        return cancelled.v900.decode(itemEvent)
    } else if (cancelled.v1201.is(itemEvent)) {
        return cancelled.v1201.decode(itemEvent).refIndex
    } else {
        throw new UnknownVersionError(itemEvent.name)
    }
}

export function getExecutedData(ctx: ProcessorContext<Store>, itemEvent: Event): number {
     if (executed.v900.is(itemEvent)) {
        return executed.v900.decode(itemEvent)[0]
    } else if (executed.v1201.is(itemEvent)) {
        return executed.v1201.decode(itemEvent).refIndex
    } else if (executed.v1300.is(itemEvent)) {
        return executed.v1300.decode(itemEvent).refIndex
    } else if (executed.v1401.is(itemEvent)) {
        return executed.v1401.decode(itemEvent).refIndex
    } else if (executed.v1606.is(itemEvent)) {
        return executed.v1606.decode(itemEvent).refIndex
    } else{
        throw new UnknownVersionError(itemEvent.name)
    }
}

export function getNotPassedData(ctx: ProcessorContext<Store>, itemEvent: Event): number {
    if (notPassed.v900.is(itemEvent)) {
        return notPassed.v900.decode(itemEvent)
    } else if (notPassed.v1201.is(itemEvent)) {
        return notPassed.v1201.decode(itemEvent).refIndex
    } else {
        throw new UnknownVersionError(itemEvent.name)
    }
}

export function getPassedData(ctx: ProcessorContext<Store>, itemEvent: Event): number {
    if (passed.v900.is(itemEvent)) {
        return passed.v900.decode(itemEvent)
    } else if (passed.v1201.is(itemEvent)) {
        return passed.v1201.decode(itemEvent).refIndex
    } else {
        throw new UnknownVersionError(itemEvent.name)
    }
}

export interface PreimageInvalidData {
    hash: string
    index: number
}

export function getPreimageInvalidData(ctx: ProcessorContext<Store>, itemEvent: Event): PreimageInvalidData {
    if (preimageInvalid.v900.is(itemEvent)) {
        const [hash, index] = preimageInvalid.v900.decode(itemEvent)
        return {
            hash,
            index,
        }
    } else if (preimageInvalid.v1201.is(itemEvent)) {
        const { proposalHash: hash, refIndex: index } = preimageInvalid.v1201.decode(itemEvent)
        return {
            hash,
            index,
        }
    } else {
        throw new UnknownVersionError(itemEvent.name)
    }
}

export interface PreimageMissingData {
    hash: string
    index: number
}

export function getPreimageMissingData(ctx: ProcessorContext<Store>, itemEvent: Event): PreimageMissingData {
    if (preimageMissing.v900.is(itemEvent)) {
        const [hash, index] = preimageMissing.v900.decode(itemEvent)
        return {
            hash,
            index,
        }
    } else if (preimageMissing.v1201.is(itemEvent)) {
        const { proposalHash: hash, refIndex: index } = preimageMissing.v1201.decode(itemEvent)
        return {
            hash,
            index,
        }
    } else {
        throw new UnknownVersionError(itemEvent.name)
    }
}

interface PreimageNotedData {
    hash: string
    provider: string
    deposit: bigint
}

export function getPreimageNotedData(ctx: ProcessorContext<Store>, itemEvent: Event): PreimageNotedData {
    if (preimageNoted.v900.is(itemEvent)) {
        const [hash, provider, deposit] = preimageNoted.v900.decode(itemEvent)
        return {
            hash,
            provider,
            deposit,
        }
    } else if (preimageNoted.v1201.is(itemEvent)) {
        const { proposalHash: hash, who: provider, deposit } = preimageNoted.v1201.decode(itemEvent)
        return {
            hash,
            provider,
            deposit,
        }
    } else {
        throw new UnknownVersionError(itemEvent.name)
    }
}

export interface PreimageReapedData {
    hash: string
    provider: string
    deposit: bigint
}

export function getPreimageReapedData(ctx: ProcessorContext<Store>, itemEvent: Event): PreimageReapedData {
    if (preimageReaped.v900.is(itemEvent)) {
        const [hash, provider, deposit] = preimageReaped.v900.decode(itemEvent)
        return {
            hash,
            provider,
            deposit,
        }
    } else if (preimageReaped.v1201.is(itemEvent)) {
        const { proposalHash: hash, provider, deposit } = preimageReaped.v1201.decode(itemEvent)
        return {
            hash,
            provider,
            deposit,
        }
    } else {
        throw new UnknownVersionError(itemEvent.name)
    }
}

export interface PreimageUsedData {
    hash: string
    provider: string
    deposit: bigint
}

export function getPreimageUsedData(ctx: ProcessorContext<Store>, itemEvent: Event): PreimageUsedData {
    if (preimageUsed.v900.is(itemEvent)) {
        const [hash, provider, deposit] = preimageUsed.v900.decode(itemEvent)
        return {
            hash,
            provider,
            deposit,
        }
    } else if (preimageUsed.v1201.is(itemEvent)) {
        const { proposalHash: hash, provider, deposit } = preimageUsed.v1201.decode(itemEvent)
        return {
            hash,
            provider,
            deposit,
        }
    } else {
        throw new UnknownVersionError(itemEvent.name)
    }
}

interface DemocracySecondedData {
    accountId: string
    refIndex: number
}

export function getDemocracySecondedData(ctx: ProcessorContext<Store>, itemEvent: Event): DemocracySecondedData {
    if (seconded.v1001.is(itemEvent)) {
        const [seconder, propIndex] = seconded.v1001.decode(itemEvent)
        return {
            accountId: seconder,
            refIndex: propIndex
        }
    } else if (seconded.v1201.is(itemEvent)) {
        const { who: seconder, proposalIndex: propIndex } = seconded.v1201.decode(itemEvent)
        return {
            accountId: seconder,
            refIndex: propIndex
        }
    } else if (seconded.v1300.is(itemEvent)) {
        const { seconder, propIndex } = seconded.v1300.decode(itemEvent)
        return {
            accountId: seconder,
            refIndex: propIndex
        }
    }
    else {
        throw new UnknownVersionError(itemEvent.name)
    }
}