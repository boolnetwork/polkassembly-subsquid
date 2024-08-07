import { Store } from '@subsquid/typeorm-store'
import { getTransaction } from '@subsquid/frontier'
import { functions as batchFunctions} from '../../../batchAbi/batchAbi'
import { functions as proxyFunctions } from '../../../proxyAbi/proxyAbi'
import { Call, ProcessorContext } from '../../../processor'
import { handlePrecompileTransactions } from './utils'
import { PRECOMPILES } from '../../../consts/consts'

export async function handlePrecompileTransaction(ctx: ProcessorContext<Store>,
    item: Call,
    header: any) {
    if (!(item as any).success) return
    let tx;
    try{
        tx = getTransaction(item)
    }catch{
        console.log(`Error getting transaction ${header.height}, extrinsicIndex: ${item.extrinsicIndex}`)
    }
    if (!tx) return;
    const originAccountId = tx.from;
    const txnHash = tx.hash;
    let flag = false;
    try {
        const [to, value, callData, gasLimit] = batchFunctions.batchAll.decode(tx.input);
        flag = true;
        for (let i = 0; i < to.length; i++) {
            if (!PRECOMPILES.includes(to[i])) {
                continue;
            }
            await handlePrecompileTransactions(ctx, header, item, originAccountId, txnHash, callData[i]);
        }
    } catch (e) {}
    if(!flag){
        try {
            const [real, callTo, callData] = proxyFunctions.proxy.decode(tx.input);
            flag = true;
            if (!PRECOMPILES.includes(callTo)) {
                return;
            }
            await handlePrecompileTransactions(ctx, header, item, originAccountId, txnHash, callData);
        } catch (e) {}
    }
    if (!flag) {
        await handlePrecompileTransactions(ctx, header, item, originAccountId, txnHash, tx.input);
    }
}