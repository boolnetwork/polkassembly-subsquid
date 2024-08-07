import {sts, Block, Bytes, Option, Result, StorageType, RuntimeCtx} from '../support'
import * as v900 from '../v900'

export const proposals =  {
    /**
     *  Proposals that have been made.
     */
    v900: new StorageType('Treasury.Proposals', 'Optional', [sts.number()], v900.Proposal) as ProposalsV900,
}

/**
 *  Proposals that have been made.
 */
export interface ProposalsV900  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: number): Promise<(v900.Proposal | undefined)>
    getMany(block: Block, keys: number[]): Promise<(v900.Proposal | undefined)[]>
    getKeys(block: Block): Promise<number[]>
    getKeys(block: Block, key: number): Promise<number[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<number[]>
    getKeysPaged(pageSize: number, block: Block, key: number): AsyncIterable<number[]>
    getPairs(block: Block): Promise<[k: number, v: (v900.Proposal | undefined)][]>
    getPairs(block: Block, key: number): Promise<[k: number, v: (v900.Proposal | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: number, v: (v900.Proposal | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: number): AsyncIterable<[k: number, v: (v900.Proposal | undefined)][]>
}
