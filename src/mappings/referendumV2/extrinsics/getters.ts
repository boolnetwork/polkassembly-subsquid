import { IsNull } from 'typeorm'
import { TooManyOpenVotes, UnknownVersionError } from '../../../common/errors'
import { ConvictionVote, VotingDelegation } from '../../../model'
// import { BatchContext } from '@subsquid/substrate-processor'
import { Store } from '@subsquid/typeorm-store'
import { vote, 
    removeOtherVote, 
    removeVote,
    delegate,
    undelegate,
 } from '../../../types/conviction-voting/calls' 
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
    | {
          type: 'SplitAbstain'
          aye: bigint
          nay: bigint
          abstain: bigint
    }


interface DemocracyVoteCallData {
    index: number
    vote: DemocracyVote
}

export function getVoteData(ctx: ProcessorContext<Store>, itemCall: any): DemocracyVoteCallData {
    if (vote.v2403.is(itemCall)) {
        const { pollIndex, vote: voteData } = vote.v2403.decode(itemCall)
        if(voteData.__kind === 'Standard') {
            return {
                index: pollIndex,
                vote: {
                    type: 'Standard',
                    balance: voteData.balance,
                    value: voteData.vote
                },
            }
        }
         else if(voteData.__kind === 'Split') {
            return {
                index: pollIndex,
                vote: {
                    type: 'Split',
                    aye: voteData.aye,
                    nay: voteData.nay,
                },
            }
        }else {
            return {
                index: pollIndex,
                vote: {
                    type: 'SplitAbstain',
                    aye: voteData.aye,
                    nay: voteData.nay,
                    abstain: voteData.abstain,
                },
            }
        }
    }
    else {
        throw new UnknownVersionError(itemCall.name)
    }
}

export interface ConvictionVoteDelegateCallData {
    track: number
    to: any
    lockPeriod: number
    balance?: bigint
}

export function getDelegateData(ctx: ProcessorContext<Store>, itemCall: any): ConvictionVoteDelegateCallData {
    // const event = new ConvictionVotingDelegateCall(ctx, itemCall)
   
    if (delegate.v2403.is(itemCall)) {
        //{ class, to, conviction, balance}
        const eventData = delegate.v2403.decode(itemCall)
        return {
            track: eventData.class,
            to: eventData.to,
            lockPeriod:convictionToLockPeriod(eventData.conviction.__kind),
            balance: eventData.balance
        }
    } else {
        throw new UnknownVersionError(itemCall.name)
    }
}
export interface ConvictionVoteUndelegateCallData {
    track: number
}

export function getUndelegateData(ctx: ProcessorContext<Store>, itemCall: any): ConvictionVoteUndelegateCallData {
    // const event = new ConvictionVotingUndelegateCall(ctx, itemCall)
   
    if (undelegate.v2403.is(itemCall)) {
        const eventData = undelegate.v2403.decode(itemCall)
        return {
            track: eventData.class
        }
    } else {
        throw new UnknownVersionError(itemCall.name)
    }
}

export interface ConvictionVotingRemoveVoteCallData {
    index: number
    track: number | undefined
}

export function getRemoveVoteData(ctx: ProcessorContext<Store>, itemCall: any): ConvictionVotingRemoveVoteCallData {
    // const event = new ConvictionVotingRemoveVoteCall(ctx, itemCall)
    if (removeVote.v2403.is(itemCall)) {
        const eventData = removeVote.v2403.decode(itemCall)
        return {
            index: eventData.index,
            track: eventData.class
        }
    } else {
        throw new UnknownVersionError(itemCall.name)
    }
}

export interface ConvictionVotingRemoveOtherVoteCallData {
    index: number
    track: number | undefined
    target: string | null
}

export function getRemoveOtherVoteData(ctx: ProcessorContext<Store>, itemCall: any): ConvictionVotingRemoveOtherVoteCallData {
    // const event = new ConvictionVotingRemoveOtherVoteCall(ctx, itemCall)
    if (removeOtherVote.v2403.is(itemCall)) {
        const eventData = removeOtherVote.v2403.decode(itemCall)
        return {
            index: eventData.index,
            track: eventData.class,
            target: eventData.target
        }
    } else {
        throw new UnknownVersionError(itemCall.name)
    }
}