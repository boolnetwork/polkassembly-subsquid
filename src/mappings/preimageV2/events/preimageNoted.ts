/* eslint-disable @typescript-eslint/ban-ts-comment */
import { StorageNotExistsWarn, UnknownVersionError } from '../../../common/errors'
import {
    statusFor,
    preimageFor,
    requestStatusFor
} from '../../../types/preimage/storage'

import { ProposalStatus, ProposalType } from '../../../model'
import { Chain } from '@subsquid/substrate-processor/lib/chain'
import { createPreimageV2 } from '../../utils/proposals'
import { getPreimageNotedData } from './getters'
import { Store } from '@subsquid/typeorm-store'
import { ProcessorContext, Event, Block } from '../../../processor'

type ProposalCall = any

interface PreimageStorageData {
    data: string
    status?: string
    value?: number | [string, bigint] | undefined
    len?: number
}

// function decodeProposal(chain: Chain, data: string): ProposalCall {
//     // @ts-ignore
//     return chain.scaleCodec.decodeBinary(chain.description.call, data)
// }

async function getStorageData(ctx: ProcessorContext<Store>, hash: string, block: any): Promise<PreimageStorageData | undefined> {
    const preimageStatus: PreimageStatusStorageData | undefined = await getPreimageRequestStatusData(ctx, hash, block) || await getPreimageStatusData(ctx, hash, block)
    if (preimageFor.v2000.is(block)) {
        if(preimageStatus && preimageStatus.len){
            const storageData = await preimageFor.v2000.get(block, [hash, preimageStatus.len])
            if (!storageData) return undefined
            return {
                data: storageData,
                ...preimageStatus
            }
        }
        else {
            throw new UnknownVersionError('preimage.PreimageFor')
        }
    }
    else {
        return
    }
}

interface PreimageStatusStorageData{
    status: string
    value: number | [string, bigint] | undefined
    len?: number
}

export async function getPreimageRequestStatusData(ctx: ProcessorContext<Store>, hash: string, block: Block): Promise<PreimageStatusStorageData | undefined> {
    if(requestStatusFor.v2700.is(block)) {
        const storageData = await requestStatusFor.v2700.get(block, hash)
        if (!storageData) return undefined
        if(storageData.__kind == 'Unrequested'){
            return {
                status: storageData.__kind,
                value: storageData.ticket,
                len: storageData.len
            }
        } else{
            return {
                status: storageData.__kind,
                value: storageData.maybeTicket,
                len: storageData.maybeLen
            }
        }
    }
    else {
        throw new UnknownVersionError('preimage.StatusFor')
    }
}

export async function getPreimageStatusData(ctx: ProcessorContext<Store>, hash: string, block: Block): Promise<PreimageStatusStorageData | undefined> {
    if(statusFor.v2000.is(block)) {
        const storageData = await statusFor.v2000.get(block, hash)
        if (!storageData) return undefined
        return {
            status: storageData.__kind,
            value: storageData.deposit,
            len: storageData.len
        }
    }
    else {
        throw new UnknownVersionError('preimage.StatusFor')
    }
}

export async function handlePreimageV2Noted(ctx: ProcessorContext<Store>,
    item: Event,
    header: any) {
    if(!item.call) return;
    const { hash } = getPreimageNotedData(ctx, item)

    if(!item.call.args?.bytes) return;

    const hexHash = hash
    const extrinsicIndex = `${header.height}-${item.index}`

    const storageData = await getPreimageStatusData(ctx, hash, header) || await getPreimageRequestStatusData(ctx, hash, header)
    if (!storageData) {
        ctx.log.warn(StorageNotExistsWarn('PreimageV2', hexHash))
        return
    }
    let args;
    try {
        args = item.block._runtime.decodeCall(item?.call.args.bytes);
    }
    catch (e) {
        console.log(`Error decoding call ${header.height}, extrinsicIndex: ${item.index} ${e}`)
        return
    }

    const section = args.__kind as string
    const method = args.value.__kind as string
    const desc = (item.block._runtime.calls.get(`${section}.${method}`).docs as string[]).join('\n');

    const { __kind, ...argsValue } = args.value;

    const decodedCall = {
        section,
        method,
        description: desc,
        args: argsValue,
    }

    const value = storageData.value as [string, bigint]

    const proposer =  storageData.value ? value[0] : undefined
    const deposit = storageData.value ? value[1] : undefined

    await createPreimageV2(ctx, header, {
        hash: hexHash,
        proposer,
        deposit,
        call: decodedCall,
        section: decodedCall?.section,
        method: decodedCall?.method,
        status: ProposalStatus.Noted,
        length: storageData.len,
        extrinsicIndex,
    })
}
