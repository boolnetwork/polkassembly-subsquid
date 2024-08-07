import { toHex } from '@subsquid/substrate-processor'
import { started } from '../../../types/democracy/events'
import { StorageNotExistsWarn, UnknownVersionError } from '../../../common/errors'
import { ProposalStatus, ProposalType, ReferendumThresholdType } from '../../../model'
import { storage } from '../../../storage'
import { createReferendum } from '../../utils/proposals'
import { Store } from '@subsquid/typeorm-store'
import { ProcessorContext, Block, Event } from '../../../processor'
interface ReferendumEventData {
    index: number
    threshold: string
}

function getEventData(ctx: ProcessorContext<Store>, itemEvent: Event): ReferendumEventData {
    if (started.v900.is(itemEvent)) {
        const [index, threshold] = started.v900.decode(itemEvent)
        return {
            index,
            threshold: threshold.__kind,
        }
    } else if (started.v1201.is(itemEvent)) {
        const { refIndex: index, threshold } = started.v1201.decode(itemEvent)
        return {
            index,
            threshold: threshold.__kind,
        }
    } else {
        throw new UnknownVersionError(itemEvent.name)
    }
}

export async function handleStarted(ctx: ProcessorContext<Store>,
    item: Event,
    header: Block) {
    const { index, threshold } = getEventData(ctx, item)
    const extrinsicIndex = `${header.height}-${item.index}`

    const storageData = await storage.democracy.getReferendumInfoOf(ctx, index, header)
    if (!storageData) {
        ctx.log.warn(StorageNotExistsWarn(ProposalType.Referendum, index))
        return
    }

    if (storageData.status === 'Finished') {
        ctx.log.warn(`Referendum with index ${index} has already finished at block ${header.height}`)
        return
    }

    const { hash, end, delay } = storageData

    await createReferendum(ctx, header, {
        index,
        threshold: threshold as ReferendumThresholdType,
        status: ProposalStatus.Started,
        hash: hash,
        end: end,
        delay: delay,
        extrinsicIndex,
    })
}