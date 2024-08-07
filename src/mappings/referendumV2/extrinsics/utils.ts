import { In, IsNull } from 'typeorm'
import { Store } from '@subsquid/typeorm-store'

import { MissingProposalRecordWarn, NoDelegationFound, NoOpenVoteFound, TooManyOpenDelegations, TooManyOpenVotes } from '../../../common/errors'
import { ConvictionDelegatedVotes, ConvictionVote, DelegationType, FlattenedConvictionVotes, Proposal, ProposalType, SplitVoteBalance, StandardVoteBalance, VoteBalance, VoteDecision, VoteType, VotingDelegation } from '../../../model'
import { getConvictionDelegatedVotesCount, getConvictionVotesCount, getFlattenedConvictionVotesCount } from '../../utils/votes'
import { ProcessorContext } from '../../../processor'
import { updateCurveData } from '../../../common/curveData'
import { randomUUID } from 'crypto'

export function convictionToLockPeriod(convictionKind: string): number {
    return convictionKind === 'None' ? 0 : Number(convictionKind[convictionKind.search(/\d/)])
}

export async function addDelegatedVotesReferendumV2(ctx: ProcessorContext<Store>, block: number, blockTime: number, nestedDelegations: VotingDelegation[], convictionVote: ConvictionVote): Promise<{delegatedVotes: ConvictionDelegatedVotes[], delegatedVotePower: bigint, flattenedVotes: FlattenedConvictionVotes[]}> {
    let votingPower = BigInt(0)
    const delegatedVotes = [];
    let delegatedVotePower = BigInt(0)
    const flattenedVotes = []
    for (let i = 0; i < nestedDelegations.length; i++) {
        const delegation = nestedDelegations[i]
        const count = await getConvictionDelegatedVotesCount(ctx)
        const voteBalance = new StandardVoteBalance({
            value: delegation.balance,
        })
        if (delegation.lockPeriod === 0 && delegation.balance) {
            votingPower = delegation.balance/BigInt(10)
        }else{
            votingPower = delegation.balance ? BigInt(delegation.lockPeriod) * delegation.balance : BigInt(0)
        }      
        delegatedVotes.push(
            new ConvictionDelegatedVotes({
                id: `${convictionVote.proposalIndex}-${count.toString().padStart(8, '0')}-${VoteType.ReferendumV2}`,
                voter: delegation.from,
                createdAtBlock: block,
                proposalIndex: convictionVote.proposalIndex,
                decision: convictionVote.decision,
                votingPower: votingPower,
                lockPeriod: delegation.lockPeriod,
                balance: voteBalance,
                createdAt: new Date(blockTime),
                delegatedTo: convictionVote,
                type: VoteType.ReferendumV2,
            })
        )
        delegatedVotePower += votingPower
        // const flattenedCount = await getFlattenedConvictionVotesCount(ctx)

        flattenedVotes.push(
            new FlattenedConvictionVotes({
                id: randomUUID(),
                voter: delegation.from,
                parentVote: convictionVote,
                isDelegated: true,
                delegatedTo: delegation.to,
                proposalIndex: convictionVote.proposalIndex,
                proposal: convictionVote.proposal,
                createdAtBlock: block,
                removedAtBlock: null,
                createdAt: new Date(blockTime),
                removedAt: null,
                decision: convictionVote.decision,
                balance: voteBalance,
                lockPeriod: delegation.lockPeriod,
                type: VoteType.ReferendumV2,
            })
        )
    }
    return {
        delegatedVotes,
        delegatedVotePower,
        flattenedVotes
    }
}


export async function getDelegations(ctx: ProcessorContext<Store>, voter: string | undefined, track: number): Promise<any> {
    try{
        let delegations = await ctx.store.find(VotingDelegation, { where: { to: voter, endedAtBlock: IsNull(), track, type: DelegationType.OpenGov} })
        if (delegations != null && delegations != undefined && delegations.length > 0) {
            return delegations
        }
        else {
            return []
        }
    }
    catch(e) {
        return []
    }
}

export async function removeDelegatedVotesReferendum(ctx: ProcessorContext<Store>, block: number, blockTime: number, delegatedVotes: ConvictionDelegatedVotes[]): Promise<void> {
    const addresses: string[] = []
    for (let i = 0; i < delegatedVotes.length; i++) {
        const vote = delegatedVotes[i]
        vote.removedAtBlock = block
        vote.removedAt = new Date(blockTime)
        await ctx.store.save(vote)
        if(vote.voter){
            addresses.push(vote.voter)
        }
    }
    if(addresses.length > 0){
        await removeFlattenedVotes(ctx, addresses, delegatedVotes[0].proposalIndex, block, blockTime)
    }
}

export async function removeVote(ctx: ProcessorContext<Store>, wallet: string, proposalIndex: number, block: number, blockTime: number, shouldHaveVote: boolean, extrinsicIndex?: string, txnHash?: string): Promise<void> {
    const votes = await ctx.store.find(ConvictionVote, { where: { voter: wallet, proposalIndex, removedAtBlock: IsNull(), type: VoteType.ReferendumV2 },
        relations: {
            delegatedVotes: true
        }
    })
    if(votes){
        if (votes.length > 1) {
            ctx.log.warn(TooManyOpenVotes(block, proposalIndex, wallet))
            return
        }
        else if (votes.length === 0 && shouldHaveVote) {
            ctx.log.warn(NoOpenVoteFound(block, proposalIndex, wallet))
            return
        }
        else if (votes.length === 0 && !shouldHaveVote) {
            return
        }
        const vote = votes[0]
        vote.removedAtBlock = block
        vote.removedAt = new Date(blockTime)
        if(txnHash){
            vote.txnHash = txnHash
        }
        if(extrinsicIndex){
            vote.extrinsicIndex = extrinsicIndex
        }
        await ctx.store.save(vote)
        if(vote.delegatedVotes){
            await removeDelegatedVotesReferendum(ctx, block, blockTime, vote.delegatedVotes)
        }
    }
    await removeFlattenedVotes(ctx, [wallet], proposalIndex, block, blockTime)
}

export async function removeFlattenedVotes(ctx: ProcessorContext<Store>, wallet: string[], proposalIndex: number, block: number, blockTime: number): Promise<void> {
    const flattenedVotes = await ctx.store.find(FlattenedConvictionVotes, { where: { voter: In(wallet), proposalIndex, removedAtBlock: IsNull(), type: VoteType.ReferendumV2 } })
    
    for (let i = 0; i < flattenedVotes.length; i++) {
        const vote = flattenedVotes[i]
        vote.removedAtBlock = block
        vote.removedAt = new Date(blockTime)
        await ctx.store.save(vote)
    }
}

export async function handleSubstrateAndPrecompileVotes(ctx: ProcessorContext<Store>, header: any, index: number, vote: any, from: string, isSubstrate: boolean, extrinsicIndex?: string, txHash?: string): Promise<void>{

    const proposal = await ctx.store.get(Proposal, { where: { index, type: ProposalType.ReferendumV2 } })
    if (!proposal || proposal.trackNumber === undefined || proposal.trackNumber === null) {
        ctx.log.warn(MissingProposalRecordWarn(ProposalType.ReferendumV2, index))
        return
    }

    const votes = await ctx.store.find(ConvictionVote, { where: { voter: from, proposalIndex: index, removedAtBlock: IsNull(), type: VoteType.ReferendumV2 } })
    if (votes) {
        if (votes.length > 1) {
            ctx.log.warn(TooManyOpenVotes(header.height, index, from))
        }

        if (votes.length > 0) {
            const vote = votes[0]
            vote.removedAtBlock = header.height
            vote.removedAt = new Date(header.timestamp)
            const flattenedVote = await ctx.store.get(FlattenedConvictionVotes, { where: { voter: from, proposalIndex: index, removedAtBlock: IsNull(), type: VoteType.ReferendumV2 } })
            if (flattenedVote) {
                flattenedVote.removedAtBlock = header.height
                flattenedVote.removedAt = new Date(header.timestamp)
                await ctx.store.save(flattenedVote)
            }
            await ctx.store.save(vote)
            const delegatedVotes = vote.delegatedVotes
            if (delegatedVotes) {
                await removeDelegatedVotesReferendum(ctx, header.height, header.timestamp, delegatedVotes)
            }
        }
    }

    const nestedDelegations = await getDelegations(ctx, from, proposal.trackNumber)

    let decision: VoteDecision
    switch (vote.type) {
        case 'Standard':
            decision = isSubstrate ? vote.value < 128 ? VoteDecision.no : VoteDecision.yes : vote.decision
            break
        case 'Split':
            decision = VoteDecision.split
            break

        case 'SplitAbstain':
            decision = VoteDecision.abstain
            break
    }

    let lockPeriod: number | undefined
    let balance: VoteBalance | undefined
    let votingPower: bigint | undefined = BigInt(0)
    if (vote.type === 'Split') {
        balance = new SplitVoteBalance({
            aye: vote.aye,
            nay: vote.nay,
        })
    } else if (vote.type === 'Standard') {
        balance = new StandardVoteBalance({
            value: vote.balance,
        })
        lockPeriod = isSubstrate ? vote.value < 128 ? vote.value : vote.value - 128 : vote.lockPeriod
        if (lockPeriod === 0 && vote.balance) {
            votingPower = vote.balance / BigInt(10)
        }
        else {
            votingPower = lockPeriod && vote.balance ? (vote.balance) * BigInt(lockPeriod) : BigInt(0)
        }

    }
    else if (vote.type === 'SplitAbstain') {
        balance = new SplitVoteBalance({
            aye: vote.aye,
            nay: vote.nay,
            abstain: vote.abstain,
        })
    }

    // const count = await getConvictionVotesCount(ctx, index)

    const convictionVote = new ConvictionVote({
        id: randomUUID(),
        voter: from,
        createdAtBlock: header.height,
        proposalIndex: index,
        proposalId: proposal.id,
        decision: decision!,
        lockPeriod,
        proposal,
        balance,
        createdAt: new Date(header.timestamp),
        selfVotingPower: votingPower,
        txnHash: txHash,
        extrinsicIndex: extrinsicIndex,
        type: VoteType.ReferendumV2,
    })

    // const flattenedCount = await getFlattenedConvictionVotesCount(ctx)

    const { delegatedVotes, delegatedVotePower, flattenedVotes } = await addDelegatedVotesReferendumV2(ctx, header.height, header.timestamp, nestedDelegations, convictionVote)

    convictionVote.delegatedVotingPower = convictionVote.delegatedVotingPower ? convictionVote.delegatedVotingPower + delegatedVotePower : delegatedVotePower
    convictionVote.totalVotingPower = votingPower + convictionVote.delegatedVotingPower

    await ctx.store.insert(convictionVote)

    await ctx.store.insert(delegatedVotes)

    flattenedVotes.push(new FlattenedConvictionVotes({
        id: randomUUID(),
        voter: from,
        parentVote: convictionVote,
        isDelegated: false,
        delegatedTo: null,
        proposalIndex: index,
        proposal: proposal,
        createdAtBlock: header.height,
        removedAtBlock: null,
        createdAt: new Date(header.timestamp),
        removedAt: null,
        decision: decision!,
        balance: balance,
        lockPeriod: lockPeriod,
        type: VoteType.ReferendumV2,
    }))

    await ctx.store.insert(flattenedVotes)

    await updateCurveData(ctx, header, proposal)
}

export async function handleSubtrateAndPrecompileDelegationVote(ctx: ProcessorContext<Store>, header: any, track: number, toWallet: string, lockPeriod: number, balance: bigint, from: string, extrinsicIndex?: string): Promise<void> {

    const delegations = await ctx.store.find(VotingDelegation, { where: { from, endedAtBlock: IsNull(), track, type: DelegationType.OpenGov } })

    if (delegations != null && delegations != undefined && delegations.length > 1) {
        ctx.log.warn(TooManyOpenDelegations(header.height, track, from))
    }

    const ongoingReferenda = await ctx.store.find(Proposal, { where: { endedAtBlock: IsNull(), trackNumber: track, type: ProposalType.ReferendumV2 } })

    if (delegations.length > 0) {
        const delegation = delegations[0]
        delegation.endedAtBlock = header.height
        delegation.endedAt = new Date(header.timestamp)
        await ctx.store.save(delegation)
        for (let i = 0; i < ongoingReferenda.length; i++) {
            const referendum = ongoingReferenda[i]
            if(referendum.index || referendum.index === 0){
                await removeVote(ctx, from, referendum.index, header.height, header.timestamp, false)
            }
        }
    }

    await ctx.store.insert(
        new VotingDelegation({
            id: `${await ctx.store.count(VotingDelegation)}`,
            createdAtBlock: header.height,
            from: from,
            to: toWallet,
            balance,
            lockPeriod,
            type: DelegationType.OpenGov,
            track,
            extrinsicIndex,
            createdAt: new Date(header.timestamp),
        })
    )
    let votingPower = BigInt(0)
    const nestedDelegations = await getDelegations(ctx, from, track)
    for (let i = 0; i < ongoingReferenda.length; i++) {
        const referendum = ongoingReferenda[i]
        if(!referendum || referendum.index === undefined || referendum.index === null){
            continue
        }
        const votes = await ctx.store.find(ConvictionVote, { where: { voter: toWallet, proposalIndex: referendum.index, removedAtBlock: IsNull(), type: VoteType.ReferendumV2 } })
        if(votes){
            if (votes.length > 1) {
                ctx.log.warn(TooManyOpenVotes(header.height, referendum.index, toWallet))
                return
            }
            else if (votes.length === 0) {
                ctx.log.warn(NoOpenVoteFound(header.height, referendum.index, toWallet))
                return
            }
            const vote = votes[0]
            const voteBalance = new StandardVoteBalance({
                value: balance,
            })
            const voter = from
            const count = await getConvictionDelegatedVotesCount(ctx)
            if (lockPeriod === 0 && balance) {
                votingPower = balance/BigInt(10)
            }else{
                votingPower = balance ? BigInt(lockPeriod) * balance : BigInt(0)
            }

            const { delegatedVotes, delegatedVotePower, flattenedVotes } = await addDelegatedVotesReferendumV2(ctx, header.height, header.timestamp, nestedDelegations, vote)
            delegatedVotes.push(
                new ConvictionDelegatedVotes ({
                    id: `${referendum.index}-${count.toString().padStart(8, '0')}-${VoteType.ReferendumV2}`,
                    voter,
                    createdAtBlock: header.height,
                    decision: vote.decision,
                    lockPeriod,
                    proposalIndex: referendum.index,
                    balance: voteBalance,
                    votingPower,
                    type: VoteType.ReferendumV2,
                    createdAt: new Date(header.timestamp),
                    delegatedTo: vote
                })
            )
            
            vote.delegatedVotingPower = vote.delegatedVotingPower ? delegatedVotePower + votingPower + vote.delegatedVotingPower : delegatedVotePower + votingPower
            vote.totalVotingPower = vote.selfVotingPower ? vote.delegatedVotingPower + vote.selfVotingPower : delegatedVotePower

            await ctx.store.save(vote)
            await ctx.store.insert(delegatedVotes)
            await ctx.store.insert(flattenedVotes)
        }
    }
}

export async function handleSubstratAndPrecompileRemoveVote(ctx: ProcessorContext<Store>, header: any, index: number, wallet: string, extrinsicIndex?: string, txnHash?: string): Promise<void> {
    const referendum = await ctx.store.get(Proposal, { where: { index, type: ProposalType.ReferendumV2 } })
    if (!referendum || referendum.index == undefined || referendum.index == null || referendum.trackNumber == undefined || referendum.trackNumber == null) {
        ctx.log.warn(MissingProposalRecordWarn(ProposalType.ReferendumV2, index))
        return
    }
    if (referendum.endedAtBlock && referendum.endedAtBlock < header.height) {
        return
    }
    await removeVote(ctx, wallet, index, header.height, header.timestamp, true, extrinsicIndex)
    await updateCurveData(ctx, header, referendum)
    
}

export async function handleSubstrateAndPrecompileUndelegate(ctx: ProcessorContext<Store>, header: any, from: string, track: number, extrinsicIndex?: string): Promise<void> {
    let delegation = null;
    const delegations = await ctx.store.find(VotingDelegation, { where: { from, endedAtBlock: IsNull(), track, type: DelegationType.OpenGov } })
    if(delegations != undefined && delegations != null){
        if (delegations.length > 1) {
            ctx.log.warn(TooManyOpenDelegations(header.height, track, from))
        }
        else if (delegations.length === 0) {
            ctx.log.warn(NoDelegationFound(header.height, track, from))
            return
        }
        delegation = delegations[0]
        delegation.endedAtBlock = header.height
        delegation.extrinsicIndex = extrinsicIndex
        delegation.endedAt = new Date(header.timestamp)
        await ctx.store.save(delegation)
    }
    const ongoingReferenda = await ctx.store.find(Proposal, { where: { endedAt: IsNull(), trackNumber: track, type: ProposalType.ReferendumV2 } })
    for (let i = 0; i < ongoingReferenda.length; i++) {
        const referendum = ongoingReferenda[i]
        const wallets: string[] = []
        if(!referendum || referendum.index == undefined || referendum.index == null){
            continue
        }
        if(delegation && referendum){
            const votes = await ctx.store.find(ConvictionVote, { where: { voter: delegation.to, proposalIndex: referendum.index, removedAtBlock: IsNull(), type: VoteType.ReferendumV2 },
                relations: {
                    delegatedVotes: true
                }
            })
            if(votes){
                if (votes.length > 1) {
                    ctx.log.warn(TooManyOpenVotes(header.height, referendum.index, from))
                }
                if(votes.length > 0){
                    const vote = votes[0]
                    if (vote.delegatedVotes){
                        for(let j = 0; j < vote?.delegatedVotes?.length; j++){
                            const delegatedVote = vote.delegatedVotes[j]
                            if(delegatedVote && delegatedVote.voter == from){
                                delegatedVote.removedAtBlock = header.height
                                delegatedVote.removedAt = new Date(header.timestamp)
                                if (delegatedVote.voter){
                                    wallets.push(delegatedVote.voter)
                                }
                                await ctx.store.save(delegatedVote)
                                if(delegatedVote.votingPower && vote.totalVotingPower){
                                    vote.totalVotingPower -= delegatedVote.votingPower
                                }
                                if(delegatedVote.votingPower && vote.delegatedVotingPower){
                                    vote.delegatedVotingPower -= delegatedVote.votingPower
                                }
                                await ctx.store.save(vote)
                                break;
                            }
                        }
                    }
                }
            }
        }
        await removeFlattenedVotes(ctx, wallets, referendum.index, header.height, header.timestamp)
    }
}