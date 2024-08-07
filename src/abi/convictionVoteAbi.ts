import * as ethers from 'ethers'
import {LogEvent, Func, ContractBase} from './abi.support'
import {ABI_JSON} from './convictionVoteAbi.abi'

export const abi = new ethers.Interface(ABI_JSON);

export const functions = {
    delegate: new Func<[trackId: number, representative: string, conviction: number, amount: bigint], {trackId: number, representative: string, conviction: number, amount: bigint}, []>(
        abi, '0x681750e8'
    ),
    removeOtherVote: new Func<[target: string, trackId: number, pollIndex: number], {target: string, trackId: number, pollIndex: number}, []>(
        abi, '0xcbcb9276'
    ),
    removeVote: new Func<[pollIndex: number], {pollIndex: number}, []>(
        abi, '0x79cae220'
    ),
    undelegate: new Func<[trackId: number], {trackId: number}, []>(
        abi, '0x98be4094'
    ),
    unlock: new Func<[trackId: number, target: string], {trackId: number, target: string}, []>(
        abi, '0x4259d98c'
    ),
    voteNo: new Func<[pollIndex: number, voteAmount: bigint, conviction: number], {pollIndex: number, voteAmount: bigint, conviction: number}, []>(
        abi, '0xcc600eba'
    ),
    voteYes: new Func<[pollIndex: number, voteAmount: bigint, conviction: number], {pollIndex: number, voteAmount: bigint, conviction: number}, []>(
        abi, '0xda9df518'
    ),
}

export class Contract extends ContractBase {
}
