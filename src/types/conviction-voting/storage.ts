import {sts, Block, Bytes, Option, Result, StorageType, RuntimeCtx} from '../support'
import * as v2403 from '../v2403'

export const votingFor =  {
    /**
     *  All voting for a particular voter in a particular voting class. We store the balance for the
     *  number of votes that we have recorded.
     */
    v2403: new StorageType('ConvictionVoting.VotingFor', 'Default', [v2403.AccountId20, sts.number()], v2403.Type_499) as VotingForV2403,
}

/**
 *  All voting for a particular voter in a particular voting class. We store the balance for the
 *  number of votes that we have recorded.
 */
export interface VotingForV2403  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): v2403.Type_499
    get(block: Block, key1: v2403.AccountId20, key2: number): Promise<(v2403.Type_499 | undefined)>
    getMany(block: Block, keys: [v2403.AccountId20, number][]): Promise<(v2403.Type_499 | undefined)[]>
    getKeys(block: Block): Promise<[v2403.AccountId20, number][]>
    getKeys(block: Block, key1: v2403.AccountId20): Promise<[v2403.AccountId20, number][]>
    getKeys(block: Block, key1: v2403.AccountId20, key2: number): Promise<[v2403.AccountId20, number][]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<[v2403.AccountId20, number][]>
    getKeysPaged(pageSize: number, block: Block, key1: v2403.AccountId20): AsyncIterable<[v2403.AccountId20, number][]>
    getKeysPaged(pageSize: number, block: Block, key1: v2403.AccountId20, key2: number): AsyncIterable<[v2403.AccountId20, number][]>
    getPairs(block: Block): Promise<[k: [v2403.AccountId20, number], v: (v2403.Type_499 | undefined)][]>
    getPairs(block: Block, key1: v2403.AccountId20): Promise<[k: [v2403.AccountId20, number], v: (v2403.Type_499 | undefined)][]>
    getPairs(block: Block, key1: v2403.AccountId20, key2: number): Promise<[k: [v2403.AccountId20, number], v: (v2403.Type_499 | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: [v2403.AccountId20, number], v: (v2403.Type_499 | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key1: v2403.AccountId20): AsyncIterable<[k: [v2403.AccountId20, number], v: (v2403.Type_499 | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key1: v2403.AccountId20, key2: number): AsyncIterable<[k: [v2403.AccountId20, number], v: (v2403.Type_499 | undefined)][]>
}
