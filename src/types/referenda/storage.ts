import {sts, Block, Bytes, Option, Result, StorageType, RuntimeCtx} from '../support'
import * as v2403 from '../v2403'
import * as v2801 from '../v2801'
import * as v2901 from '../v2901'

export const referendumInfoFor =  {
    /**
     *  Information concerning any given referendum.
     */
    v2403: new StorageType('Referenda.ReferendumInfoFor', 'Optional', [sts.number()], v2403.Type_511) as ReferendumInfoForV2403,
    /**
     *  Information concerning any given referendum.
     */
    v2801: new StorageType('Referenda.ReferendumInfoFor', 'Optional', [sts.number()], v2801.Type_534) as ReferendumInfoForV2801,
    /**
     *  Information concerning any given referendum.
     */
    v2901: new StorageType('Referenda.ReferendumInfoFor', 'Optional', [sts.number()], v2901.ReferendumInfo) as ReferendumInfoForV2901,
}

/**
 *  Information concerning any given referendum.
 */
export interface ReferendumInfoForV2403  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: number): Promise<(v2403.Type_511 | undefined)>
    getMany(block: Block, keys: number[]): Promise<(v2403.Type_511 | undefined)[]>
    getKeys(block: Block): Promise<number[]>
    getKeys(block: Block, key: number): Promise<number[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<number[]>
    getKeysPaged(pageSize: number, block: Block, key: number): AsyncIterable<number[]>
    getPairs(block: Block): Promise<[k: number, v: (v2403.Type_511 | undefined)][]>
    getPairs(block: Block, key: number): Promise<[k: number, v: (v2403.Type_511 | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: number, v: (v2403.Type_511 | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: number): AsyncIterable<[k: number, v: (v2403.Type_511 | undefined)][]>
}

/**
 *  Information concerning any given referendum.
 */
export interface ReferendumInfoForV2801  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: number): Promise<(v2801.Type_534 | undefined)>
    getMany(block: Block, keys: number[]): Promise<(v2801.Type_534 | undefined)[]>
    getKeys(block: Block): Promise<number[]>
    getKeys(block: Block, key: number): Promise<number[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<number[]>
    getKeysPaged(pageSize: number, block: Block, key: number): AsyncIterable<number[]>
    getPairs(block: Block): Promise<[k: number, v: (v2801.Type_534 | undefined)][]>
    getPairs(block: Block, key: number): Promise<[k: number, v: (v2801.Type_534 | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: number, v: (v2801.Type_534 | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: number): AsyncIterable<[k: number, v: (v2801.Type_534 | undefined)][]>
}

/**
 *  Information concerning any given referendum.
 */
export interface ReferendumInfoForV2901  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: number): Promise<(v2901.ReferendumInfo | undefined)>
    getMany(block: Block, keys: number[]): Promise<(v2901.ReferendumInfo | undefined)[]>
    getKeys(block: Block): Promise<number[]>
    getKeys(block: Block, key: number): Promise<number[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<number[]>
    getKeysPaged(pageSize: number, block: Block, key: number): AsyncIterable<number[]>
    getPairs(block: Block): Promise<[k: number, v: (v2901.ReferendumInfo | undefined)][]>
    getPairs(block: Block, key: number): Promise<[k: number, v: (v2901.ReferendumInfo | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: number, v: (v2901.ReferendumInfo | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: number): AsyncIterable<[k: number, v: (v2901.ReferendumInfo | undefined)][]>
}
