import * as ethers from 'ethers'
import {LogEvent, Func, ContractBase} from './abi.support'
import {ABI_JSON} from './proxyAbi.abi'

export const abi = new ethers.Interface(ABI_JSON);

export const functions = {
    addProxy: new Func<[delegate: string, proxyType: number, delay: number], {delegate: string, proxyType: number, delay: number}, []>(
        abi, '0x74a34dd3'
    ),
    isProxy: new Func<[real: string, delegate: string, proxyType: number, delay: number], {real: string, delegate: string, proxyType: number, delay: number}, boolean>(
        abi, '0xe26d38ed'
    ),
    proxy: new Func<[real: string, callTo: string, callData: string], {real: string, callTo: string, callData: string}, []>(
        abi, '0x0d3cff86'
    ),
    proxyForceType: new Func<[real: string, forceProxyType: number, callTo: string, callData: string], {real: string, forceProxyType: number, callTo: string, callData: string}, []>(
        abi, '0x685b9d2f'
    ),
    removeProxies: new Func<[], {}, []>(
        abi, '0x14a5b5fa'
    ),
    removeProxy: new Func<[delegate: string, proxyType: number, delay: number], {delegate: string, proxyType: number, delay: number}, []>(
        abi, '0xfef3f708'
    ),
}

export class Contract extends ContractBase {

    isProxy(real: string, delegate: string, proxyType: number, delay: number): Promise<boolean> {
        return this.eth_call(functions.isProxy, [real, delegate, proxyType, delay])
    }
}
