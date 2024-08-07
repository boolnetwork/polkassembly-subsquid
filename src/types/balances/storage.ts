import {sts, Block, Bytes, Option, Result, StorageType, RuntimeCtx} from '../support'
import * as v900 from '../v900'
import * as v2501 from '../v2501'

export const totalIssuance =  {
    /**
     *  The total units issued in the system.
     */
    v900: new StorageType('Balances.TotalIssuance', 'Default', [], sts.bigint()) as TotalIssuanceV900,
}

/**
 *  The total units issued in the system.
 */
export interface TotalIssuanceV900  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): bigint
    get(block: Block): Promise<(bigint | undefined)>
}

export const account =  {
    /**
     *  The balance of an account.
     * 
     *  NOTE: This is only used in the case that this pallet is used to store balances.
     */
    v900: new StorageType('Balances.Account', 'Default', [v900.H160], v900.AccountData) as AccountV900,
    /**
     *  The Balances pallet example of storing the balance of an account.
     * 
     *  # Example
     * 
     *  ```nocompile
     *   impl pallet_balances::Config for Runtime {
     *     type AccountStore = StorageMapShim<Self::Account<Runtime>, frame_system::Provider<Runtime>, AccountId, Self::AccountData<Balance>>
     *   }
     *  ```
     * 
     *  You can also store the balance of an account in the `System` pallet.
     * 
     *  # Example
     * 
     *  ```nocompile
     *   impl pallet_balances::Config for Runtime {
     *    type AccountStore = System
     *   }
     *  ```
     * 
     *  But this comes with tradeoffs, storing account balances in the system pallet stores
     *  `frame_system` data alongside the account data contrary to storing account balances in the
     *  `Balances` pallet, which uses a `StorageMap` to store balances data only.
     *  NOTE: This is only used in the case that this pallet is used to store balances.
     */
    v2501: new StorageType('Balances.Account', 'Default', [v2501.AccountId20], v2501.AccountData) as AccountV2501,
}

/**
 *  The balance of an account.
 * 
 *  NOTE: This is only used in the case that this pallet is used to store balances.
 */
export interface AccountV900  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): v900.AccountData
    get(block: Block, key: v900.H160): Promise<(v900.AccountData | undefined)>
    getMany(block: Block, keys: v900.H160[]): Promise<(v900.AccountData | undefined)[]>
    getKeys(block: Block): Promise<v900.H160[]>
    getKeys(block: Block, key: v900.H160): Promise<v900.H160[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v900.H160[]>
    getKeysPaged(pageSize: number, block: Block, key: v900.H160): AsyncIterable<v900.H160[]>
    getPairs(block: Block): Promise<[k: v900.H160, v: (v900.AccountData | undefined)][]>
    getPairs(block: Block, key: v900.H160): Promise<[k: v900.H160, v: (v900.AccountData | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: v900.H160, v: (v900.AccountData | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: v900.H160): AsyncIterable<[k: v900.H160, v: (v900.AccountData | undefined)][]>
}

/**
 *  The Balances pallet example of storing the balance of an account.
 * 
 *  # Example
 * 
 *  ```nocompile
 *   impl pallet_balances::Config for Runtime {
 *     type AccountStore = StorageMapShim<Self::Account<Runtime>, frame_system::Provider<Runtime>, AccountId, Self::AccountData<Balance>>
 *   }
 *  ```
 * 
 *  You can also store the balance of an account in the `System` pallet.
 * 
 *  # Example
 * 
 *  ```nocompile
 *   impl pallet_balances::Config for Runtime {
 *    type AccountStore = System
 *   }
 *  ```
 * 
 *  But this comes with tradeoffs, storing account balances in the system pallet stores
 *  `frame_system` data alongside the account data contrary to storing account balances in the
 *  `Balances` pallet, which uses a `StorageMap` to store balances data only.
 *  NOTE: This is only used in the case that this pallet is used to store balances.
 */
export interface AccountV2501  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): v2501.AccountData
    get(block: Block, key: v2501.AccountId20): Promise<(v2501.AccountData | undefined)>
    getMany(block: Block, keys: v2501.AccountId20[]): Promise<(v2501.AccountData | undefined)[]>
    getKeys(block: Block): Promise<v2501.AccountId20[]>
    getKeys(block: Block, key: v2501.AccountId20): Promise<v2501.AccountId20[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v2501.AccountId20[]>
    getKeysPaged(pageSize: number, block: Block, key: v2501.AccountId20): AsyncIterable<v2501.AccountId20[]>
    getPairs(block: Block): Promise<[k: v2501.AccountId20, v: (v2501.AccountData | undefined)][]>
    getPairs(block: Block, key: v2501.AccountId20): Promise<[k: v2501.AccountId20, v: (v2501.AccountData | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: v2501.AccountId20, v: (v2501.AccountData | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: v2501.AccountId20): AsyncIterable<[k: v2501.AccountId20, v: (v2501.AccountData | undefined)][]>
}

export const inactiveIssuance =  {
    /**
     *  The total units of outstanding deactivated balance in the system.
     */
    v2201: new StorageType('Balances.InactiveIssuance', 'Default', [], sts.bigint()) as InactiveIssuanceV2201,
}

/**
 *  The total units of outstanding deactivated balance in the system.
 */
export interface InactiveIssuanceV2201  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): bigint
    get(block: Block): Promise<(bigint | undefined)>
}
