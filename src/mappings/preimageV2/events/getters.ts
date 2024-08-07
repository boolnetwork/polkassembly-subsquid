import { UnknownVersionError } from '../../../common/errors'
import { ProcessorContext, Event } from '../../../processor'
import {
    noted,
    requested,
    cleared
} from '../../../types/preimage/events'
// import { EventContext } from '../../types/contexts'
// import { EventItem } from '@subsquid/substrate-processor/lib/interfaces/dataSelection'
// import { Event } from '../../../types/support'
// import { BatchContext, SubstrateBlock } from '@subsquid/substrate-processor'
import { Store } from '@subsquid/typeorm-store'

interface PreimageNotedData {
    hash: string
}

export function getPreimageNotedData(ctx: ProcessorContext<Store>, itemEvent: Event): PreimageNotedData {
    // const event = new PreimageNotedEvent(ctx, itemEvent)
    if (noted.v2000.is(itemEvent)) {
        const { hash } = noted.v2000.decode(itemEvent)
        return {
            hash
        }
    } else {
        throw new UnknownVersionError(itemEvent.name)
    }
}

export interface PreimageRequestedData {
    hash: string
}

export function getPreimageRequestedData(ctx: ProcessorContext<Store>, itemEvent: Event): PreimageRequestedData {
    // const event = new PreimageRequestedEvent(ctx, itemEvent)
    if (requested.v2000.is(itemEvent)) {
        const {hash} = requested.v2000.decode(itemEvent)
        return {
            hash
        }
    } else {
        throw new UnknownVersionError(itemEvent.name)
    }
}

export interface PreimageClearedData {
    hash: string
}

export function getPreimageClearedData(ctx: ProcessorContext<Store>, itemEvent: Event): PreimageClearedData {
    // const event = new PreimageClearedEvent(ctx, itemEvent)
    if (cleared.v2000.is(itemEvent)) {
        const {hash} = cleared.v2000.decode(itemEvent)
        return {
            hash
        }
    } else {
        throw new UnknownVersionError(itemEvent.name)
    }
}