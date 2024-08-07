// /* eslint-disable @typescript-eslint/ban-ts-comment */
// import { UnknownVersionError } from '../../common/errors'
// import { BountiesBountiesStorage, BountiesBountyDescriptionsStorage, TreasuryBountiesStorage, TreasuryBountyDescriptionsStorage } from '../../types/storage'
// import { BlockContext } from '../../types/support'

// interface BountyStorageData {
//     proposer: Uint8Array
//     value: bigint
//     bond: bigint
//     fee: bigint
//     curatorDeposit: bigint
// }

// async function getBountyStorageData(ctx: BlockContext, index: number): Promise<BountyStorageData | undefined> {
//     const storage = new BountiesBountiesStorage(ctx)
//     if (!storage.isExists) return undefined

//     if (storage.isV9111) {
//         return await storage.getAsV9111(index)
//     } else {
//         throw new UnknownVersionError(storage.constructor.name)
//     }
// }

// async function getTreasuryStorageData(ctx: BlockContext, index: number): Promise<BountyStorageData | undefined> {
//     const storage = new TreasuryBountiesStorage(ctx)
//     if (!storage.isExists) return undefined

//     if (storage.isV2025) {
//         return await storage.getAsV2025(index)
//     } else {
//         throw new UnknownVersionError(storage.constructor.name)
//     }
// }

// export async function getBounties(ctx: BlockContext, index: number) {
//     let bountyInfo =  (await getBountyStorageData(ctx, index)) || (await getTreasuryStorageData(ctx, index))
//     if(!bountyInfo) return undefined;
//     let description = await getDescription(ctx, index).then((r) => r || '');
//     return {
//         ...bountyInfo,
//         description
//     }
// }


// async function getBountyDescriptionStorageData(ctx: BlockContext, index: number): Promise<string | undefined> {
//     const storage = new BountiesBountyDescriptionsStorage(ctx)
//     if (!storage.isExists) return undefined

//     if (storage.isV9111) {
//         return await storage.getAsV9111(index).then((r) => Buffer.from(r || []).toString('utf8'))
//     } else {
//         throw new UnknownVersionError(storage.constructor.name)
//     }
// }

// async function getTreasuryDescriptionStorageData(ctx: BlockContext, index: number): Promise<string | undefined> {
//     const storage = new TreasuryBountyDescriptionsStorage(ctx)
//     if (!storage.isExists) return undefined

//     if (storage.isV2025) {
//         return await storage.getAsV2025(index).then((r) => Buffer.from(r || []).toString('utf8'))
//     } else {
//         throw new UnknownVersionError(storage.constructor.name)
//     }
// }

// async function getDescription(ctx: BlockContext, index: number) {
//     return (await getBountyDescriptionStorageData(ctx, index)) || (await getTreasuryDescriptionStorageData(ctx, index))
// }