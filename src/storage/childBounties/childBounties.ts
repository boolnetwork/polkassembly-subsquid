// /* eslint-disable @typescript-eslint/ban-ts-comment */
// import { UnknownVersionError } from '../../common/errors'
// import { ChildBountiesChildBountiesStorage, ChildBountiesChildBountyDescriptionsStorage } from '../../types/storage'
// import { BlockContext } from '../../types/support'

// interface ChildBountyBountyStorageData {
//     value: bigint
//     fee: bigint
//     parentBounty: number,
//     curatorDeposit: bigint,
// }

// async function getChildBountyStorageData(ctx: BlockContext, parentBountyId: number, index: number): Promise<ChildBountyBountyStorageData | undefined> {
//     const storage = new ChildBountiesChildBountiesStorage(ctx)
//     if (!storage.isExists) return undefined

//     if (storage.isV9190) {
//         return await storage.getAsV9190(parentBountyId, index)
//     } else {
//         throw new UnknownVersionError(storage.constructor.name)
//     }
// }


// export async function getChildBounties(ctx: BlockContext, parentBountyId: number, index: number) {
//     let childBountyInfo = await getChildBountyStorageData(ctx, parentBountyId, index)
//     if(!childBountyInfo) return undefined;
//     let description = await getDescription(ctx, index).then((r) => r || '');
//     return {
//         ...childBountyInfo,
//         description
//     }
// }

// async function getDescription(ctx: BlockContext, index: number) {
//     return (await getChildBountyStorageReasonData(ctx, index))
// }

// async function getChildBountyStorageReasonData(ctx: BlockContext, index: number): Promise<string | undefined> {
//     const storage = new ChildBountiesChildBountyDescriptionsStorage(ctx)
//     if (!storage.isExists) return undefined

//     if (storage.isV9190) {
//         return await storage.getAsV9190(index).then((r) => Buffer.from(r || []).toString('utf8'))
//     } else {
//         throw new UnknownVersionError(storage.constructor.name)
//     }
// }

