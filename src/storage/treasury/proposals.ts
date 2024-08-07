import { Store } from '@subsquid/typeorm-store'
import { UnknownVersionError } from '../../common/errors'
import { proposals } from '../../types/treasury/storage'
import { ProcessorContext, Block } from '../../processor'

interface TreasuryProposalStorageData {
    proposer: string
    value: bigint
    beneficiary: string
    bond: bigint
}

async function getStorageData(ctx: ProcessorContext<Store>, index: number, block: Block): Promise<TreasuryProposalStorageData | undefined> {
    if (proposals.v900.is(block)) {
        return await proposals.v900.get(block, index)
    } else {
        throw new UnknownVersionError('Treasury.Proposals')
    }
}

export async function getProposals(ctx: ProcessorContext<Store>, index: number, block: Block) {
    return await getStorageData(ctx, index, block)
}