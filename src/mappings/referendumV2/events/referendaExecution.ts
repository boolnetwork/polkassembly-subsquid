import { Proposal, ProposalStatus, ProposalType } from '../../../model'
import { updateProposalStatus } from '../../utils/proposals'
import { getDispatchedEventData } from '../../../common/scheduledData'
import { Store } from '@subsquid/typeorm-store'
import { ProcessorContext, Event } from '../../../processor'

export async function handleReferendumV2Execution(ctx: ProcessorContext<Store>,
    item: Event,
    header: any) {
    const eventData = getDispatchedEventData(ctx, item, header)
    if(!eventData){
        return;
    }

    try{
        const storageData = await header._runtime.getStorage(header.parentHash, 'Scheduler.Agenda', eventData.blockNumber)
        if (!storageData || !storageData[0]) return null

        const callData = storageData[0]?.call

        const extrinsicIndex = `${header.height}-${item.index}`

        let preimageHash = null

        if(callData.__kind == 'Inline'){
            preimageHash = callData.value
        }
        else {
            preimageHash = callData.hash
        }
        if(!preimageHash) return null

        const proposal = await ctx.store.get(Proposal, {
            where: {
                        type: ProposalType.ReferendumV2,
                        status: ProposalStatus.Confirmed,
                        hash: preimageHash
                    },
            order: {
                id: 'DESC',
            },
        })

        if(!proposal || !proposal.index){
            return;
        }

        await updateProposalStatus(ctx, header, proposal.index, ProposalType.ReferendumV2, {
            isEnded: true,
            status: eventData.result == 'Ok' ? ProposalStatus.Executed : ProposalStatus.ExecutionFailed,
            extrinsicIndex,
            data: {
                executedAt: new Date(header.timestamp),
                executeAtBlockNumber: eventData.blockNumber
            }
        })
    }catch(e){
        console.error('error', e)
    }

}