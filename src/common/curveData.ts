// import { BatchContext, SubstrateBlock } from '@subsquid/substrate-processor'
import { Store } from '@subsquid/typeorm-store'
import { randomUUID } from 'crypto';
import { getStorageData } from '../mappings/referendumV2/events/referendaSubmitted';
import { Proposal, CurveData, ProposalType } from '../model'
import { getTotalIssuanceStorageData, getTotalInactiveIssuanceStorageData } from '../storage/balances';
import { StorageNotExistsWarn } from './errors';
import { Block, ProcessorContext } from '../processor';


export async function updateCurveData(ctx: ProcessorContext<Store>,
    header: any,
    proposal: Proposal) {
    if(proposal.index == null || proposal.index == undefined){
        return;
    }
    // const cd = await ctx.store.get(CurveData, { 
    //     where: { 
    //         index: proposal.index,
    //     },
    //     order: {
    //         timestamp: 'DESC',
    //     },
    // })

    const blockDateTime = new Date(header.timestamp)
    let approvalPercent = 0.0
    let supportPercent = 0.0
    const storageData = await getStorageData(proposal.index, header)
    if (storageData) {
        const tally = storageData.tally
        const totalIssuance = await getTotalIssuanceStorageData(ctx, header)
        const inactiveIssuance = await getTotalInactiveIssuanceStorageData(ctx, header)
        const activeIssuance = totalIssuance - inactiveIssuance;
        approvalPercent = Number(tally.ayes) / Number((tally.ayes + tally.nays)) * 100
        supportPercent = Number(tally.support) / Number(activeIssuance) * 100
    }

    await ctx.store.insert(
        new CurveData({
            id: randomUUID(),
            index: proposal.index,
            timestamp: new Date(header.timestamp),
            approvalPercent: approvalPercent,
            supportPercent: supportPercent,
            block: header.height,
        })
    )

}