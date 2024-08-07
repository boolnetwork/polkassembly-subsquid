/* eslint-disable @typescript-eslint/ban-ts-comment */
import { StorageNotExistsWarn } from '../../../common/errors'
import { ProposalStatus, ProposalType } from '../../../model'
import { ProcessorContext, Block, Event } from '../../../processor'
import { storage } from '../../../storage'
import { createTreasury } from '../../utils/proposals'
import { getProposedData, getSpendApprovedData } from './getters'
import { Store } from '@subsquid/typeorm-store'

export async function handleProposed(ctx: ProcessorContext<Store>,
    item: Event,
    header: Block) {
    const { index } = getProposedData(ctx, item)

    const extrinsicIndex = `${header.height}-${item.index}`

    const storageData = await storage.treasury.getProposals(ctx, index, header)
    if (!storageData) {
        ctx.log.warn(StorageNotExistsWarn(ProposalType.TreasuryProposal, index))
        return
    }

    const { proposer, beneficiary, value, bond } = storageData

    await createTreasury(ctx, header, {
        index,
        proposer: proposer,
        status: ProposalStatus.Proposed,
        reward: value,
        deposit: bond,
        payee: beneficiary,
        extrinsicIndex,
    })
}

export async function handleSpendApproved(ctx: ProcessorContext<Store>,
    item: Event,
    header: Block) {
    const { proposalIndex, amount, beneficiary } = getSpendApprovedData(ctx, item)

    const extrinsicIndex = `${header.height}-${item.index}`

    await createTreasury(ctx, header, {
        index: proposalIndex,
        proposer: beneficiary,
        status: ProposalStatus.Approved,
        reward: amount,
        deposit: 0 as unknown as bigint,
        payee: beneficiary,
        extrinsicIndex,
    })
}