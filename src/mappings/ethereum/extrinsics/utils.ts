import { Store } from '@subsquid/typeorm-store'
import { functions } from '../../../abi/convictionVoteAbi'
import { functions as oldFunctions } from '../../../gov1AbiOld/moonbeamAbi'
import { functions as newFunctions } from '../../../gov1AbiNew/moonbeamAbi'
import { handleConvictionVotesFromPrecompile } from '../../referendumV2/extrinsics/convictionVoting'
import { handlePrecompileDelegate } from '../../referendumV2/extrinsics/delegate'
import { handlePrecompileUndelegate } from '../../referendumV2/extrinsics/undelegate'
import { handlePrecompiledRemoveVote } from '../../referendumV2/extrinsics/removeVote'
import { handlePrecompileRemoveOtherVote } from '../../referendumV2/extrinsics/removeOtherVote'
import { Call, ProcessorContext } from '../../../processor'
import { handleDemocracyVotesFromPrecompile } from '../../democracy/extrinsics/democracyVote'
import { handleDemocracyPrecompileDelegate } from '../../democracy/extrinsics/delegate'
import { handleDemocracyPrecompileUndelegate } from '../../democracy/extrinsics/undelegate'
import { handleDemocracyPrecompiledRemoveVote } from '../../democracy/extrinsics/removeVote'

export async function handlePrecompileTransactions(ctx: ProcessorContext<Store>, header: any, item: Call, originAccountId: string, txnHash: string, tx: any) {
    let flag = false;
    try {
        const decoded = newFunctions.standardVote.decode(tx)
        if(decoded){
            await handleDemocracyVotesFromPrecompile(ctx, item, header, decoded, originAccountId, txnHash)
            flag = true
        }
    }
    catch (e){
    }
    if(!flag){
        try {
            const decoded = oldFunctions.standard_vote.decode(tx)
            if(decoded){
                await handleDemocracyVotesFromPrecompile(ctx, item, header, decoded, originAccountId, txnHash)
                flag = true
            }
        }
        catch (e){
        }
    }
    if(!flag){
        try {
            const decoded = newFunctions.delegate.decode(tx)
            if(decoded){
                await handleDemocracyPrecompileDelegate(ctx, item, header, decoded, originAccountId, txnHash)
                flag = true
            }
        }
        catch (e){
        }
    }
    if(!flag){
        try {
            const decoded = oldFunctions.delegate.decode(tx)
            if(decoded){
                await handleDemocracyPrecompileDelegate(ctx, item, header, decoded, originAccountId, txnHash)
                flag = true
            }
        }
        catch (e){
        }
    }
    if(!flag){
        try {
            const decoded = newFunctions.unDelegate.decode(tx)
            if(decoded){
                await handleDemocracyPrecompileUndelegate(ctx, item, header, decoded, originAccountId, txnHash)
                flag = true
            }
        }
        catch (e){
        }
    }
    if(!flag){
        try {
            const decoded = oldFunctions.un_delegate.decode(tx)
            if(decoded){
                await handleDemocracyPrecompileUndelegate(ctx, item, header, decoded, originAccountId, txnHash)
                flag = true
            }
        }
        catch (e){
        }
    }
    if(!flag){
        try {
            const decoded = newFunctions.removeVote.decode(tx)
            if(decoded){
                await handleDemocracyPrecompiledRemoveVote(ctx, item, header, decoded, originAccountId, txnHash)
                flag = true
            }
        }
        catch (e){
        }
    }
    if(!flag){
        try {
            const decoded = oldFunctions.remove_vote.decode(tx)
            if(decoded){
                await handleDemocracyPrecompiledRemoveVote(ctx, item, header, decoded, originAccountId, txnHash)
                flag = true
            }
        }
        catch (e){
        }
    }
    if(!flag){
        try {
            const decoded = functions.voteYes.decode(tx)
            if(decoded){
                await handleConvictionVotesFromPrecompile(ctx, item, header, decoded, true, originAccountId, txnHash)
                flag = true
            }
        }
        catch (e){
            // ctx.log.info(`Ethereum transaction looking for suitable decoder`)
        }
    }
    if (!flag){
        try{
            const decoded = functions.voteNo.decode(tx)
            if(decoded){
                flag = true
                await handleConvictionVotesFromPrecompile(ctx, item, header, decoded, false, originAccountId, txnHash)
                flag = true
            }
        }
        catch (e){
            // ctx.log.info(`Ethereum transaction looking for suitable decoder`)
        }
    }
    if (!flag){
        try{
            const decoded = functions.delegate.decode(tx)
            if(decoded){
                await handlePrecompileDelegate(ctx, item, header, decoded, originAccountId, txnHash)
                flag = true

            }
        }
        catch (e){
            // ctx.log.info(`Ethereum transaction looking for suitable decoder`)
        }
    }
    if (!flag){
        try{
            const decoded = functions.undelegate.decode(tx)
            if(decoded){
                flag = true
                await handlePrecompileUndelegate(ctx, item, header, decoded, originAccountId, txnHash)
            }
        }
        catch (e){
            // ctx.log.info(`Ethereum transaction looking for suitable decoder`)
        }
    }
    if (!flag){
        try{
            const decoded = functions.removeVote.decode(tx)
            if(decoded){
                await handlePrecompiledRemoveVote(ctx, item, header, decoded, originAccountId, txnHash)
                flag = true
            }
        }
        catch (e){
            // ctx.log.info(`Ethereum transaction looking for suitable decoder`)
        }
    }
    if (!flag){
        try{
            const decoded = functions.removeOtherVote.decode(tx)
            if(decoded){
                await handlePrecompileRemoveOtherVote(ctx, item, header, decoded, originAccountId, txnHash)
                flag = true
            }
        }
        catch (e){
            // ctx.log.info(`Ethereum transaction looking for suitable decoder`)
        }
    }
}