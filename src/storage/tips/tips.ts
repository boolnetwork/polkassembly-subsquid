// import { UnknownVersionError } from '../../common/errors'
// import { TipsTipsStorage, TipsReasonsStorage, TreasuryTipsStorage, TreasuryReasonsStorage } from '../../types/storage'
// import { BlockContext } from '../../types/support'
// interface TipStorageData {
//     who: Uint8Array
//     finder?: Uint8Array
//     deposit?: bigint
//     reason: Uint8Array
// }

// async function getTipsStorageData(ctx: BlockContext, hash: Uint8Array): Promise<TipStorageData | undefined> {
//     const storage = new TipsTipsStorage(ctx)
//     if (!storage.isExists) return undefined

//     if (storage.isV9111) {
//         return await storage.getAsV9111(hash)
//     } else {
//         throw new UnknownVersionError(storage.constructor.name)
//     }
// }

// async function getTreasuryStorageData(ctx: BlockContext, hash: Uint8Array): Promise<TipStorageData | undefined> {
//     const storage = new TreasuryTipsStorage(ctx)
//     if (!storage.isExists) return undefined

//     if (storage.isV1038) {
//         const storageData = await storage.getAsV1038(hash)
//         if (!storageData) return undefined

//         const { who, finder, reason } = storageData
//         return {
//             who,
//             finder: finder?.[0],
//             deposit: finder?.[1],
//             reason,
//         }
//     } else if (storage.isV2013) {
//         return await storage.getAsV2013(hash)
//     } else {
//         throw new UnknownVersionError(storage.constructor.name)
//     }
// }

// async function getTipsReasonsStorageData(ctx: BlockContext, hash: Uint8Array): Promise<string | undefined> {
//     const storage = new TipsReasonsStorage(ctx)
//     if (!storage.isExists) return undefined

//     if (storage.isV9111) {
//         return await storage.getAsV9111(hash).then((r) => Buffer.from(r || []).toString('utf8'))
//     } else {
//         throw new UnknownVersionError(storage.constructor.name)
//     }
// }

// async function getTreasuryReasonsStorageData(ctx: BlockContext, hash: Uint8Array): Promise<string | undefined> {
//     const storage = new TreasuryReasonsStorage(ctx)
//     if (!storage.isExists) return undefined

//     if (storage.isV1038) {
//         return await storage.getAsV1038(hash).then((r) => Buffer.from(r || []).toString('utf8'))
//     } else {
//         throw new UnknownVersionError(storage.constructor.name)
//     }
// }

// async function getReason(ctx: BlockContext, hash: Uint8Array) {
//     return (await getTipsReasonsStorageData(ctx, hash)) || (await getTreasuryReasonsStorageData(ctx, hash))
// }

// export async function getTips(ctx: BlockContext, hash: Uint8Array) {
//     let tipInfo = (await getTipsStorageData(ctx, hash)) || (await getTreasuryStorageData(ctx, hash))
//     if (!tipInfo) return undefined

//     let reason = await getReason(ctx, tipInfo.reason).then((r) => r || '')

//     return {
//         ...tipInfo,
//         reason,
//     }
// }