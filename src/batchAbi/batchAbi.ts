import * as ethers from 'ethers'
import {LogEvent, Func, ContractBase} from './abi.support'
import {ABI_JSON} from './batchAbi.abi'

export const abi = new ethers.Interface(ABI_JSON);

export const events = {
    SubcallFailed: new LogEvent<([index: bigint] & {index: bigint})>(
        abi, '0xdbc5d06f4f877f959b1ff12d2161cdd693fa8e442ee53f1790b2804b24881f05'
    ),
    SubcallSucceeded: new LogEvent<([index: bigint] & {index: bigint})>(
        abi, '0xbf855484633929c3d6688eb3caf8eff910fb4bef030a8d7dbc9390d26759714d'
    ),
}

export const functions = {
    batchAll: new Func<[to: Array<string>, value: Array<bigint>, callData: Array<string>, gasLimit: Array<bigint>], {to: Array<string>, value: Array<bigint>, callData: Array<string>, gasLimit: Array<bigint>}, []>(
        abi, '0x96e292b8'
    ),
    batchSome: new Func<[to: Array<string>, value: Array<bigint>, callData: Array<string>, gasLimit: Array<bigint>], {to: Array<string>, value: Array<bigint>, callData: Array<string>, gasLimit: Array<bigint>}, []>(
        abi, '0x79df4b9c'
    ),
    batchSomeUntilFailure: new Func<[to: Array<string>, value: Array<bigint>, callData: Array<string>, gasLimit: Array<bigint>], {to: Array<string>, value: Array<bigint>, callData: Array<string>, gasLimit: Array<bigint>}, []>(
        abi, '0xcf0491c7'
    ),
}

export class Contract extends ContractBase {
}
