import { Proposal, ProposalType } from '../../../model'
import { Store } from '@subsquid/typeorm-store'
// import { BatchContext, SubstrateBlock } from '@subsquid/substrate-processor'
// import { CallItem } from '@subsquid/substrate-processor/lib/interfaces/dataSelection'
import { getOriginAccountId } from '../../../common/tools'
import { getRemoveVoteData } from './getters'
import { MissingProposalRecordWarn } from '../../../common/errors'
import { handleSubstratAndPrecompileRemoveVote } from './utils'
import { Call, ProcessorContext } from '../../../processor'

export async function handleRemoveVote(ctx: ProcessorContext<Store>,
    item: Call,
    header: any) : Promise<void> {
    if (!(item as any).success) return
    const { index } = getRemoveVoteData(ctx, item)
    const wallet = getOriginAccountId(item.origin)
    if(!wallet){
        return
    }
    const extrinsicIndex = `${header.height}-${item.extrinsicIndex}`

    await handleSubstratAndPrecompileRemoveVote(ctx, header, index, wallet)
}

export async function handlePrecompiledRemoveVote(ctx: ProcessorContext<Store>, itemCall: any, header: any, data: any, originAccountId: any, txnHash?: string) : Promise<void> {
    const [ index ] = data
    if(!originAccountId){
        return
    }
    const extrinsicIndex = `${header.height}-${itemCall.extrinsicIndex}`

    await handleSubstratAndPrecompileRemoveVote(ctx, header, Number(index), originAccountId, extrinsicIndex, txnHash)
}