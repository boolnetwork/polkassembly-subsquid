// import { CallHandlerContext } from '../../types/contexts'
import { MissingProposalRecordWarn, TooManyOpenVotes } from '../../../common/errors'
import {
    VoteDecision,
} from '../../../model'
import { getOriginAccountId } from '../../../common/tools'
import { getVoteData } from './getters'
import { Store } from '@subsquid/typeorm-store'
import { handleSubstrateAndPrecompileVotes } from './utils'
import { Call, ProcessorContext } from '../../../processor'

export async function handleConvictionVote(ctx: ProcessorContext<Store>,
    item: Call,
    header: any) {
    if (!(item as any).success) return

    const { index, vote } = getVoteData(ctx, item)

    const extrinsicIndex = `${header.height}-${item.extrinsicIndex}`

    const from = getOriginAccountId(item.origin)

    if(!from){
        return
    }

    await handleSubstrateAndPrecompileVotes(ctx, header, index, vote, from, true, extrinsicIndex)

}

export async function handleConvictionVotesFromPrecompile(ctx: ProcessorContext<Store>, itemCall: any, header: any, data: any, aye: boolean = true, originAccountId: string, txnHash: string) {
    const [ index, amount, conviction ] = data

    const extrinsicIndex = `${header.height}-${itemCall.extrinsicIndex}`

    const vote = {
        type: 'Standard',
        balance: BigInt(amount),
        lockPeriod: Number(conviction),
        decision: aye ? VoteDecision.yes : VoteDecision.no,
    }

    await handleSubstrateAndPrecompileVotes(ctx, header, Number(index), vote, originAccountId, false, extrinsicIndex, txnHash)

}