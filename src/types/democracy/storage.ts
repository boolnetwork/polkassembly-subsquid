import {sts, Block, Bytes, Option, Result, StorageType, RuntimeCtx} from '../support'
import * as v900 from '../v900'
import * as v2000 from '../v2000'

export const publicProps =  {
    /**
     *  The public proposals. Unsorted. The second item is the proposal's hash.
     */
    v900: new StorageType('Democracy.PublicProps', 'Default', [], sts.array(() => sts.tuple(() => [sts.number(), v900.H256, v900.H160]))) as PublicPropsV900,
    /**
     *  The public proposals. Unsorted. The second item is the proposal.
     */
    v2000: new StorageType('Democracy.PublicProps', 'Default', [], sts.array(() => sts.tuple(() => [sts.number(), v2000.Bounded, v2000.AccountId20]))) as PublicPropsV2000,
}

/**
 *  The public proposals. Unsorted. The second item is the proposal's hash.
 */
export interface PublicPropsV900  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): [number, v900.H256, v900.H160][]
    get(block: Block): Promise<([number, v900.H256, v900.H160][] | undefined)>
}

/**
 *  The public proposals. Unsorted. The second item is the proposal.
 */
export interface PublicPropsV2000  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): [number, v2000.Bounded, v2000.AccountId20][]
    get(block: Block): Promise<([number, v2000.Bounded, v2000.AccountId20][] | undefined)>
}

export const preimages =  {
    /**
     *  Map of hashes to the proposal preimage, along with who registered it and their deposit.
     *  The block number is the block at which it was deposited.
     */
    v900: new StorageType('Democracy.Preimages', 'Optional', [v900.H256], v900.PreimageStatus) as PreimagesV900,
}

/**
 *  Map of hashes to the proposal preimage, along with who registered it and their deposit.
 *  The block number is the block at which it was deposited.
 */
export interface PreimagesV900  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: v900.H256): Promise<(v900.PreimageStatus | undefined)>
    getMany(block: Block, keys: v900.H256[]): Promise<(v900.PreimageStatus | undefined)[]>
    getKeys(block: Block): Promise<v900.H256[]>
    getKeys(block: Block, key: v900.H256): Promise<v900.H256[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v900.H256[]>
    getKeysPaged(pageSize: number, block: Block, key: v900.H256): AsyncIterable<v900.H256[]>
    getPairs(block: Block): Promise<[k: v900.H256, v: (v900.PreimageStatus | undefined)][]>
    getPairs(block: Block, key: v900.H256): Promise<[k: v900.H256, v: (v900.PreimageStatus | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: v900.H256, v: (v900.PreimageStatus | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: v900.H256): AsyncIterable<[k: v900.H256, v: (v900.PreimageStatus | undefined)][]>
}

export const referendumInfoOf =  {
    /**
     *  Information concerning any given referendum.
     * 
     *  TWOX-NOTE: SAFE as indexes are not under an attacker’s control.
     */
    v900: new StorageType('Democracy.ReferendumInfoOf', 'Optional', [sts.number()], v900.ReferendumInfo) as ReferendumInfoOfV900,
    /**
     *  Information concerning any given referendum.
     * 
     *  TWOX-NOTE: SAFE as indexes are not under an attacker’s control.
     */
    v2000: new StorageType('Democracy.ReferendumInfoOf', 'Optional', [sts.number()], v2000.ReferendumInfo) as ReferendumInfoOfV2000,
}

/**
 *  Information concerning any given referendum.
 * 
 *  TWOX-NOTE: SAFE as indexes are not under an attacker’s control.
 */
export interface ReferendumInfoOfV900  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: number): Promise<(v900.ReferendumInfo | undefined)>
    getMany(block: Block, keys: number[]): Promise<(v900.ReferendumInfo | undefined)[]>
    getKeys(block: Block): Promise<number[]>
    getKeys(block: Block, key: number): Promise<number[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<number[]>
    getKeysPaged(pageSize: number, block: Block, key: number): AsyncIterable<number[]>
    getPairs(block: Block): Promise<[k: number, v: (v900.ReferendumInfo | undefined)][]>
    getPairs(block: Block, key: number): Promise<[k: number, v: (v900.ReferendumInfo | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: number, v: (v900.ReferendumInfo | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: number): AsyncIterable<[k: number, v: (v900.ReferendumInfo | undefined)][]>
}

/**
 *  Information concerning any given referendum.
 * 
 *  TWOX-NOTE: SAFE as indexes are not under an attacker’s control.
 */
export interface ReferendumInfoOfV2000  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: number): Promise<(v2000.ReferendumInfo | undefined)>
    getMany(block: Block, keys: number[]): Promise<(v2000.ReferendumInfo | undefined)[]>
    getKeys(block: Block): Promise<number[]>
    getKeys(block: Block, key: number): Promise<number[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<number[]>
    getKeysPaged(pageSize: number, block: Block, key: number): AsyncIterable<number[]>
    getPairs(block: Block): Promise<[k: number, v: (v2000.ReferendumInfo | undefined)][]>
    getPairs(block: Block, key: number): Promise<[k: number, v: (v2000.ReferendumInfo | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: number, v: (v2000.ReferendumInfo | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: number): AsyncIterable<[k: number, v: (v2000.ReferendumInfo | undefined)][]>
}
