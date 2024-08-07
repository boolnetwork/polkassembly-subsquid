import { UnknownVersionError } from '../../../common/errors'
// import { BatchContext } from '@subsquid/substrate-processor'
import { Store } from '@subsquid/typeorm-store'
import { vote, 
    removeOtherVote, 
    removeVote,
    delegate,
    undelegate,
 } from '../../../types/democracy/calls' 
import { convictionToLockPeriod } from './utils'
import { ProcessorContext } from '../../../processor'

type DemocracyVote =
    | {
          type: 'Standard'
          balance?: bigint
          value: number
      }
    | {
          type: 'Split'
          aye: bigint
          nay: bigint
      }


interface DemocracyVoteCallData {
    index: number
    vote: DemocracyVote
}

export function getVoteData(ctx: ProcessorContext<Store>, itemCall: any): DemocracyVoteCallData {
    if (vote.v900.is(itemCall)) {
        const { refIndex, vote: voteData } = vote.v900.decode(itemCall)
        if(voteData.__kind === 'Standard') {
            return {
                index: refIndex,
                vote: {
                    type: 'Standard',
                    balance: voteData.balance,
                    value: voteData.vote
                },
            }
        }
         else {
            return {
                index: refIndex,
                vote: {
                    type: 'Split',
                    aye: voteData.aye,
                    nay: voteData.nay,
                },
            }
        }
    }
    else {
        throw new UnknownVersionError(itemCall.name)
    }
}

export interface ConvictionVoteDelegateCallData {
    to: any
    lockPeriod: number
    balance?: bigint
}

export function getDelegateData(ctx: ProcessorContext<Store>, itemCall: any): ConvictionVoteDelegateCallData {   
    if (delegate.v900.is(itemCall)) {
        //{ class, to, conviction, balance}
        const eventData = delegate.v900.decode(itemCall)
        return {
            to: eventData.to,
            lockPeriod:convictionToLockPeriod(eventData.conviction.__kind),
            balance: eventData.balance
        }
    } else {
        throw new UnknownVersionError(itemCall.name)
    }
}

export interface ConvictionVotingRemoveVoteCallData {
    index: number
}

export function getRemoveVoteData(ctx: ProcessorContext<Store>, itemCall: any): ConvictionVotingRemoveVoteCallData {
    // const event = new ConvictionVotingRemoveVoteCall(ctx, itemCall)
    if (removeVote.v900.is(itemCall)) {
        const eventData = removeVote.v900.decode(itemCall)
        return {
            index: eventData.index,
        }
    } else {
        throw new UnknownVersionError(itemCall.name)
    }
}

export interface ConvictionVotingRemoveOtherVoteCallData {
    index: number
    target: string | null
}

export function getRemoveOtherVoteData(ctx: ProcessorContext<Store>, itemCall: any): ConvictionVotingRemoveOtherVoteCallData {
    // const event = new ConvictionVotingRemoveOtherVoteCall(ctx, itemCall)
    if (removeOtherVote.v900.is(itemCall)) {
        const eventData = removeOtherVote.v900.decode(itemCall)
        return {
            index: eventData.index,
            target: eventData.target
        }
    } else {
        throw new UnknownVersionError(itemCall.name)
    }
}