import { Store } from '@subsquid/typeorm-store'
import { ConvictionDelegatedVotes, ConvictionVote, FlattenedConvictionVotes, Vote } from '../../model'
import { ProcessorContext } from '../../processor'
// import { CommonHandlerContext } from '../types/contexts'

const proposalsVotes = new Map<string, number>()

export async function getVotesCount(ctx: ProcessorContext<Store>, proposalId: string) {
    let count = proposalsVotes.get(proposalId)
    if (count == null) {
        count = await ctx.store.count(Vote, {
            where: {
                proposalId,
            },
        })
    }
    proposalsVotes.set(proposalId, count + 1)
    return count
}

const proposals = new Map<string, number>()

export async function getConvictionVotesCount(ctx: ProcessorContext<Store>, proposalId: string) {
    let count = proposals.get(proposalId)
    if (count == null) {
        count = await ctx.store.count(ConvictionVote, {
            where: {
                proposalId,
            },
        })
    }
    proposals.set(proposalId, count + 1)
    return count
}

const delegatedVotesCount = new Map<String, number>()

export async function getConvictionDelegatedVotesCount(ctx: ProcessorContext<Store>) {
    let count = delegatedVotesCount.get('delegatedVoteCount')
    if (count == null) {
        count = await ctx.store.count(ConvictionDelegatedVotes)
    }
    delegatedVotesCount.set('delegatedVoteCount', count + 1)
    return count
}

const flattenedVotesCount = new Map<String, number>()

export async function getFlattenedConvictionVotesCount(ctx: ProcessorContext<Store>) {
    let count = flattenedVotesCount.get('flattenedVoteCount')
    if (count == null) {
        count = await ctx.store.count(FlattenedConvictionVotes)
    }
    flattenedVotesCount.set('flattenedVoteCount', count + 1)
    return count
}