// import { UnknownVersionError } from '../../../common/errors'
// import {
//     EthereumExecutedEvent
// } from '../../../types/events'
// import { Event } from '../../../types/support'
// import { BatchContext } from '@subsquid/substrate-processor'
// import { Store } from '@subsquid/typeorm-store'

// interface EthExecuted {
//     success: boolean
//     txnHash: Uint8Array
// }

// export function getExecutedData(ctx: BatchContext<Store, unknown>, itemEvent: Event): EthExecuted {
//     const event = new EthereumExecutedEvent(ctx, itemEvent)
//     if (event.isV40) {
//         const [from, to, transactionHash, exitReason] = event.asV40
//         if (exitReason.__kind == 'Succeed') {
//             return {
//                 success: true,
//                 txnHash: transactionHash
//             }
//         }
//         else {
//             return {
//                 success: false,
//                 txnHash: transactionHash
//             }
//         }
//     } else if (event.isV1200) {
//         const [from, to, transactionHash, exitReason] = event.asV1200
//         if (exitReason.__kind == 'Succeed') {
//             return {
//                 success: true,
//                 txnHash: transactionHash
//             }
//         }
//         else {
//             return {
//                 success: false,
//                 txnHash: transactionHash
//             }
//         }
//     } else if (event.isV1400) {
//         const [from, to, transactionHash, exitReason] = event.asV1400
//         if (exitReason.__kind == 'Succeed') {
//             return {
//                 success: true,
//                 txnHash: transactionHash
//             }
//         }
//         else {
//             return {
//                 success: false,
//                 txnHash: transactionHash
//             }
//         }
//     } else if (event.isV1700) {
//         const [from, to, transactionHash, exitReason] = event.asV1700
//         if (exitReason.__kind == 'Succeed') {
//             return {
//                 success: true,
//                 txnHash: transactionHash
//             }
//         }
//         else {
//             return {
//                 success: false,
//                 txnHash: transactionHash
//             }
//         }
//     } else if (event.isV1800) {
//         const { from, to, transactionHash, exitReason } = event.asV1800
//         if (exitReason.__kind == 'Succeed') {
//             return {
//                 success: true,
//                 txnHash: transactionHash
//             }
//         }
//         else {
//             return {
//                 success: false,
//                 txnHash: transactionHash
//             }
//         }
//     } else {
//         throw new UnknownVersionError(event.constructor.name)

//     }
// }