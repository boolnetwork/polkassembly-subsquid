import {sts, Block, Bytes, Option, Result, CallType, RuntimeCtx} from '../support'
import * as v900 from '../v900'
import * as v1201 from '../v1201'

export const transact =  {
    name: 'Ethereum.transact',
    /**
     * Transact an Ethereum transaction.
     */
    v900: new CallType(
        'Ethereum.transact',
        sts.struct({
            transaction: v900.LegacyTransaction,
        })
    ),
    /**
     * Transact an Ethereum transaction.
     */
    v1201: new CallType(
        'Ethereum.transact',
        sts.struct({
            transaction: v1201.TransactionV2,
        })
    ),
}
