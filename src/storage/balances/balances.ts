import { Store } from '@subsquid/typeorm-store'
import { Block, ProcessorContext} from '../../processor'


export async function getTotalIssuanceStorageData(ctx: ProcessorContext<Store>, block: Block): Promise<bigint> {
    const storageData = await block._runtime.getStorage(block.hash, 'Balances.TotalIssuance')
    return storageData || BigInt(0)
}

export async function getTotalInactiveIssuanceStorageData(ctx: ProcessorContext<Store>, block: Block): Promise<bigint> {
    const storageData = await block._runtime.getStorage(block.hash, 'Balances.InactiveIssuance')
    return storageData || BigInt(0)
}