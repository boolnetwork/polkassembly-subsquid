// import { EventHandlerContext } from '../../types/contexts'
// import { StorageNotExistsWarn, UnknownVersionError } from '../../../common/errors'
// import { BlockContext, EventContext } from '../../../types/support'
// import { ProposalStatus, ProposalType } from '../../../model'
// import { createReferendumV2 } from '../../utils/proposals'
// import { getEventData } from './getters'
// import { FellowshipReferendaReferendumInfoForStorage } from "../../../types/storage";
// import { toHex } from '@subsquid/substrate-processor'
// import { ss58codec } from '../../../common/tools'
// import { OriginCaller } from '../../../types/v9320'

// interface ReferendumInfo {
//     index: number
//     trackNumber: number
//     origin: string
//     enactmentAt?: number
//     enactmentAfter?: number
//     submittedAt: number
//     submissionDeposit: {who: Uint8Array, amount: bigint}
//     decisionDeposit: {who: Uint8Array, amount: bigint} | undefined
//     deciding: {since: number, confirming: number | undefined} | undefined
//     tally: {ayes: bigint | number, nays: bigint | number, support?: bigint | number, bareAyes?: bigint | number}
// }


// export async function getStorageData(ctx: BlockContext, index: number): Promise<ReferendumInfo | undefined> {
//     const storage = new FellowshipReferendaReferendumInfoForStorage(ctx)

//     if (storage.isV9320) {
//         const storageData = await storage.getAsV9320(index)
//         if (!storageData) return undefined
//         if(storageData.__kind === 'Ongoing') {
//             let enactmentAt = undefined
//             let enactmentAfter = undefined;
//             if(storageData.value.enactment.__kind === 'At') {
//                 enactmentAt = storageData.value.enactment.value
//             }
//             else if(storageData.value.enactment.__kind === 'After') {
//                 enactmentAfter = storageData.value.enactment.value
//             }
//             return {
//                 index,
//                 trackNumber: storageData.value.track,
//                 origin: storageData.value.origin.value.__kind,
//                 enactmentAt: enactmentAt,
//                 enactmentAfter: enactmentAfter,
//                 submittedAt: storageData.value.submitted,
//                 submissionDeposit: storageData.value.submissionDeposit,
//                 decisionDeposit: storageData.value.decisionDeposit,
//                 deciding: storageData.value.deciding,
//                 tally: storageData.value.tally
//             }
//         }
//     }else if(storage.isV9350){
//         const storageData = await storage.getAsV9350(index)
//         if (!storageData) return undefined
//         if(storageData.__kind === 'Ongoing') {
//             let enactmentAt = undefined
//             let enactmentAfter = undefined;
//             if(storageData.value.enactment.__kind === 'At') {
//                 enactmentAt = storageData.value.enactment.value
//             }
//             else if(storageData.value.enactment.__kind === 'After') {
//                 enactmentAfter = storageData.value.enactment.value
//             }
//             return {
//                 index,
//                 trackNumber: storageData.value.track,
//                 origin: storageData.value.origin.value.__kind,
//                 enactmentAt: enactmentAt,
//                 enactmentAfter: enactmentAfter,
//                 submittedAt: storageData.value.submitted,
//                 submissionDeposit: storageData.value.submissionDeposit,
//                 decisionDeposit: storageData.value.decisionDeposit,
//                 deciding: storageData.value.deciding,
//                 tally: storageData.value.tally
//             }
//         }

//     }
//     else {
//         throw new UnknownVersionError(storage.constructor.name)
//     }
// }


// export async function handleSubmitted(ctx: EventHandlerContext) {
//     const { index, hash } = getEventData(ctx)

//     const storageData = await getStorageData(ctx, index)
//     if (!storageData) {
//         ctx.log.warn(StorageNotExistsWarn(ProposalType.ReferendumV2, index))
//         return
//     }

//     const hexHash = toHex(hash)

//     await createReferendumV2(ctx, {
//         index,
//         status: ProposalStatus.Submitted,
//         hash: hexHash,
//         proposer: toHex(storageData.submissionDeposit.who),
//         submissionDeposit: storageData.submissionDeposit,
//         decisionDeposit: storageData.decisionDeposit,
//         deciding: storageData.deciding,
//         tally: storageData.tally,
//         trackNumber: storageData.trackNumber,
//         origin: storageData.origin,
//         submittedAt: storageData.submittedAt,
//         enactmentAt: storageData.enactmentAt,
//         enactmentAfter: storageData.enactmentAfter 
//     }, ProposalType.FellowshipReferendum
//     )
// }