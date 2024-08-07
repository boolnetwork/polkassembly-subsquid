import * as ethers from 'ethers'
import {LogEvent, Func, ContractBase} from './abi.support'
import {ABI_JSON} from './moonbeamAbi.abi'

export const abi = new ethers.Interface(ABI_JSON);

export const functions = {
    delegate: new Func<[representative: string, conviction: bigint, amount: bigint], {representative: string, conviction: bigint, amount: bigint}, []>(
        abi, '0x0185921e'
    ),
    deposit_of: new Func<[prop_index: bigint], {prop_index: bigint}, bigint>(
        abi, '0xa30305e9'
    ),
    finished_referendum_info: new Func<[ref_index: bigint], {ref_index: bigint}, [_: boolean, _: bigint]>(
        abi, '0xb1fd383f'
    ),
    lowest_unbaked: new Func<[], {}, bigint>(
        abi, '0x0388f282'
    ),
    note_imminent_preimage: new Func<[encoded_proposal: string], {encoded_proposal: string}, []>(
        abi, '0xcf205f96'
    ),
    note_preimage: new Func<[encoded_proposal: string], {encoded_proposal: string}, []>(
        abi, '0x200881f5'
    ),
    ongoing_referendum_info: new Func<[ref_index: bigint], {ref_index: bigint}, [_: bigint, _: string, _: bigint, _: bigint, _: bigint, _: bigint, _: bigint]>(
        abi, '0x8b93d11a'
    ),
    propose: new Func<[proposal_hash: string, value: bigint], {proposal_hash: string, value: bigint}, []>(
        abi, '0x7824e7d1'
    ),
    public_prop_count: new Func<[], {}, bigint>(
        abi, '0x56fdf547'
    ),
    remove_vote: new Func<[ref_index: bigint], {ref_index: bigint}, []>(
        abi, '0x2042f50b'
    ),
    second: new Func<[prop_index: bigint, seconds_upper_bound: bigint], {prop_index: bigint, seconds_upper_bound: bigint}, []>(
        abi, '0xc7a76601'
    ),
    standard_vote: new Func<[ref_index: bigint, aye: boolean, vote_amount: bigint, conviction: bigint], {ref_index: bigint, aye: boolean, vote_amount: bigint, conviction: bigint}, []>(
        abi, '0x3f3c21cc'
    ),
    un_delegate: new Func<[], {}, []>(
        abi, '0xcb37b8ea'
    ),
    unlock: new Func<[target: string], {target: string}, []>(
        abi, '0x2f6c493c'
    ),
}

export class Contract extends ContractBase {

    deposit_of(prop_index: bigint): Promise<bigint> {
        return this.eth_call(functions.deposit_of, [prop_index])
    }

    finished_referendum_info(ref_index: bigint): Promise<[_: boolean, _: bigint]> {
        return this.eth_call(functions.finished_referendum_info, [ref_index])
    }

    lowest_unbaked(): Promise<bigint> {
        return this.eth_call(functions.lowest_unbaked, [])
    }

    ongoing_referendum_info(ref_index: bigint): Promise<[_: bigint, _: string, _: bigint, _: bigint, _: bigint, _: bigint, _: bigint]> {
        return this.eth_call(functions.ongoing_referendum_info, [ref_index])
    }

    public_prop_count(): Promise<bigint> {
        return this.eth_call(functions.public_prop_count, [])
    }
}
