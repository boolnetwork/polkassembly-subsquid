
import { lookupArchive } from '@subsquid/archive-registry'
import { BlockHeader, DataHandlerContext, SubstrateBatchProcessor, SubstrateBatchProcessorFields, Event as _Event, Call as _Call, Extrinsic as _Extrinsic } from '@subsquid/substrate-processor'
import { TypeormDatabase } from '@subsquid/typeorm-store'
import * as modules from './mappings'
import { events, calls } from './types'
import { PRECOMPILES } from './consts/consts'
//@ts-ignore ts(2589)
const processor = new SubstrateBatchProcessor()
    .setDataSource({
        chain: 'wss://wss.api.moonbeam.network',
        archive: lookupArchive('moonbeam',  {type: 'Substrate', release: 'ArrowSquid' }),
    })
    .setBlockRange({ from: 0})
    .setFields({event: {}, call: { origin: true, success: true, error: true }, extrinsic: { hash: true, fee: true, tip: true }, block: { timestamp: true } })
    .addCall({
        name: [ 'ConvictionVoting.vote', 'ConvictionVoting.delegate', 'ConvictionVoting.undelegate', 'ConvictionVoting.remove_vote', 'ConvictionVoting.remove_other_vote', 'Democracy.vote',
        'Democracy.remove_vote', 'Democracy.remove_other_vote', 'Democracy.delegate', 'Democracy.undelegate',
    ]
    })
    .addEvent({
        name: [ 'Referenda.Submitted', 'Referenda.Cancelled', 'Referenda.DecisionDepositPlaced', 'Referenda.Rejected', 'Referenda.TimedOut', 'Referenda.Approved', 'Referenda.DecisionStarted', 'Referenda.ConfirmStarted', 
        'Referenda.ConfirmAborted', 'Referenda.Killed', 'Referenda.Confirmed', 'Preimage.Requested', 'Preimage.Noted', 'Preimage.Cleared', 'Preimage.Cleared', 'Referenda.ConfirmStarted', 
        'Referenda.ConfirmAborted', 'Democracy.Proposed', 'Democracy.Tabled', 'Democracy.Started', 'Democracy.Passed', 'Democracy.NotPassed', 'Democracy.Cancelled', 'Democracy.Executed', 
        'Democracy.PreimageNoted', 'Democracy.PreimageUsed', 'Democracy.PreimageInvalid', 'Democracy.PreimageMissing', 'Democracy.PreimageReaped', 'DemocracySeconded', 'Treasury.Proposed', 
        'Treasury.Awarded', 'Treasury.Rejected', 'Treasury.SpendApproved', 'Scheduler.Dispatched'
    ],
        call: true,
        extrinsic: true
    })
    .addEthereumTransaction({to: PRECOMPILES})
    processor.run(new TypeormDatabase(), async (ctx: any) => {
        for (let block of ctx.blocks) {
            for (let event of block.events) {
                if (event.name == 'Democracy.Proposed'){
                    await modules.democracy.events.handleProposed(ctx, event, block.header)
                }
                if (event.name == 'Democracy.Tabled'){
                    await modules.democracy.events.handleTabled(ctx, event, block.header)
                }
                if (event.name == 'Democracy.Started'){
                    await modules.democracy.events.handleStarted(ctx, event, block.header)
                }
                if (event.name == 'Democracy.Passed'){
                    await modules.democracy.events.handlePassed(ctx, event, block.header)
                }
                if (event.name == 'Democracy.NotPassed'){
                    await modules.democracy.events.handleNotPassed(ctx, event, block.header)
                }
                if (event.name == 'Democracy.Cancelled'){
                    await modules.democracy.events.handleCancelled(ctx, event, block.header)
                }
                if (event.name == 'Democracy.Executed'){
                    await modules.democracy.events.handleExecuted(ctx, event, block.header)
                }
                if (event.name == 'Democracy.Seconded'){
                    await modules.democracy.events.handleDemocracySeconds(ctx, event, block.header)
                }
                if (event.name == 'Democracy.PreimageNoted'){
                    await modules.democracy.events.handlePreimageNoted(ctx, event, block.header)
                }
                if (event.name == 'Democracy.PreimageUsed'){
                    await modules.democracy.events.handlePreimageUsed(ctx, event, block.header)
                }
                if (event.name == 'Democracy.PreimageInvalid'){
                    await modules.democracy.events.handlePreimageInvalid(ctx, event, block.header)
                }
                if (event.name == 'Democracy.PreimageMissing'){
                    await modules.democracy.events.handlePreimageMissing(ctx, event, block.header)
                }
                if (event.name == 'Democracy.PreimageReaped'){
                    await modules.democracy.events.handlePreimageReaped(ctx, event, block.header)
                }
                if (event.name == 'Treasury.Proposed'){
                    await modules.treasury.events.handleProposed(ctx, event, block.header)
                }
                if (event.name == 'Treasury.Awarded'){
                    await modules.treasury.events.handleAwarded(ctx, event, block.header)
                }
                if (event.name == 'Treasury.Rejected'){
                    await modules.treasury.events.handleRejected(ctx, event, block.header)
                }
                if (event.name == 'Treasury.SpendApproved'){
                    await modules.treasury.events.handleSpendApproved(ctx, event, block.header)
                }
                if (event.name == events.referenda.submitted.name){
                    await modules.referendumV2.events.handleSubmitted(ctx, event, block.header)
                }
                if (event.name == events.referenda.approved.name){
                    await modules.referendumV2.events.handleApproved(ctx, event, block.header)
                }
                if (event.name == events.referenda.cancelled.name){
                    await modules.referendumV2.events.handleCancelled(ctx, event, block.header)
                }
                if (event.name == events.referenda.rejected.name){
                    await modules.referendumV2.events.handleRejected(ctx, event, block.header)
                }
                if (event.name == events.referenda.timedOut.name){
                    await modules.referendumV2.events.handleTimedOut(ctx, event, block.header)
                }
                if (event.name == events.referenda.killed.name){
                    await modules.referendumV2.events.handleKilled(ctx, event, block.header)
                }
                if (event.name == events.referenda.decisionDepositPlaced.name){
                    await modules.referendumV2.events.handleDecisionDepositPlaced(ctx, event, block.header)
                }                
                if (event.name == events.referenda.decisionStarted.name){
                    await modules.referendumV2.events.handleDecisionStarted(ctx, event, block.header)
                }                
                if (event.name == events.referenda.confirmStarted.name){
                    await modules.referendumV2.events.handleConfirmStarted(ctx, event, block.header)
                }
                if (event.name == events.referenda.confirmAborted.name){
                    await modules.referendumV2.events.handleConfirmAborted(ctx, event, block.header)
                }
                if (event.name == events.referenda.confirmed.name){
                    await modules.referendumV2.events.handleConfirmed(ctx, event, block.header)
                }
                if (event.name == events.referenda.cancelled.name){
                    await modules.referendumV2.events.handleCancelled(ctx, event, block.header)
                }
                if (event.name == events.preimage.noted.name){
                    await modules.preimageV2.events.handlePreimageV2Noted(ctx, event, block.header)
                }
                if (event.name == events.preimage.cleared.name){
                    await modules.preimageV2.events.handlePreimageV2Cleared(ctx, event, block.header)
                }
                if (event.name == events.preimage.requested.name){
                    await modules.preimageV2.events.handlePreimageV2Requested(ctx, event, block.header)
                }
                if(event.name == 'Scheduler.Dispatched'){
                    await modules.referendumV2.events.handleReferendumV2Execution(ctx, event, block.header)
                }
            }
            for (let call of block.calls){
                if (call.name == calls.convictionVoting.vote.name){
                    await modules.referendumV2.extrinsics.handleConvictionVote(ctx, call, block.header)
                }
                if (call.name == calls.convictionVoting.removeOtherVote.name){
                    await modules.referendumV2.extrinsics.handleRemoveOtherVote(ctx, call, block.header)
                }
                if (call.name == calls.convictionVoting.delegate.name){
                    await modules.referendumV2.extrinsics.handleDelegate(ctx, call, block.header)
                }
                if (call.name == calls.convictionVoting.undelegate.name){
                    await modules.referendumV2.extrinsics.handleUndelegate(ctx, call, block.header)
                }
                if (call.name == calls.convictionVoting.removeVote.name){
                    await modules.referendumV2.extrinsics.handleRemoveVote(ctx, call, block.header)
                }
                if (call.name == calls.democracy.vote.name){
                    await modules.democracy.extrinsics.handleDemocracyVote(ctx, call, block.header)
                }
                if (call.name == calls.democracy.removeVote.name){
                    await modules.democracy.extrinsics.handleRemoveVote(ctx, call, block.header)
                }
                if (call.name == calls.democracy.removeOtherVote.name){
                    await modules.democracy.extrinsics.handleRemoveOtherVote(ctx, call, block.header)
                }
                if (call.name == calls.democracy.delegate.name){
                    await modules.democracy.extrinsics.handleDelegate(ctx, call, block.header)
                }
                if (call.name == calls.democracy.undelegate.name){
                    await modules.democracy.extrinsics.handleUndelegate(ctx, call, block.header)
                }
                if (call.name == calls.ethereum.transact.name){
                    await modules.ethereum.extrinsics.handlePrecompileTransaction(ctx, call, block.header)
                }
            }
            // for (let hash in recievedTxns){
            //     if(executedTxns[hash]){
            //         if(recievedTxns[hash] && recievedTxns[hash][0] && recievedTxns[hash][1]){
            //             await modules.ethereum.extrinsics.handlePrecompileTransaction(ctx, recievedTxns[hash][0], recievedTxns[hash][1])
            //         }
            //     }
            // }
        }  
    });


export type Fields = SubstrateBatchProcessorFields<typeof processor>
export type Block = BlockHeader<Fields>
export type Event = _Event<Fields>
export type Call = _Call<Fields>
export type Extrinsic = _Extrinsic<Fields>
export type ProcessorContext<Store> = DataHandlerContext<Store, Fields>