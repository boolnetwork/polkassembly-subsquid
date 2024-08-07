// import { Index } from 'typeorm'
// import { UnknownVersionError } from '../../../common/errors'
// import {
//     ChildBountiesAddedEvent,
//     ChildBountiesAwardedEvent,
//     ChildBountiesCanceledEvent,
//     ChildBountiesClaimedEvent,
// } from '../../../types/events'
// import { EventContext } from '../../types/contexts'

// interface ChildBountyAwardedData {
//     parentIndex: number
//     childIndex: number
//     beneficiary: Uint8Array
// }

// export function getChildBountyAwardedData(ctx: EventContext): ChildBountyAwardedData {
//     const event = new ChildBountiesAwardedEvent(ctx)
//     if (event.isV9190) {
//         const { index, childIndex, beneficiary } = event.asV9190
//         return {
//             parentIndex: index,
//             childIndex,
//             beneficiary,
//         }
//     } else {
//         throw new UnknownVersionError(event.constructor.name)
//     }
// }

// interface ChildBountyCancelledData {
//     parentIndex: number,
//     childIndex: number,
// }

// export function getChildBountyCancelledData(ctx: EventContext): ChildBountyCancelledData {
//     const event = new ChildBountiesCanceledEvent(ctx)
//     if (event.isV9190) {
//         const { index, childIndex } = event.asV9190
//         return {
//             parentIndex: index,
//             childIndex
//         }
//     } else {
//         throw new UnknownVersionError(event.constructor.name)
//     }
// }

// interface ChildBountyClaimedData {
//     parentIndex: number
//     childIndex: number
//     payout: bigint
//     beneficiary: Uint8Array
// }

// export function getChildBountyClaimedData(ctx: EventContext): ChildBountyClaimedData {
//     const event = new ChildBountiesClaimedEvent(ctx)
//     if (event.isV9190) {
//         const { index, childIndex, payout, beneficiary } = event.asV9190
//         return {
//             parentIndex: index,
//             childIndex,
//             payout,
//             beneficiary,
//         }
//     } else {
//         throw new UnknownVersionError(event.constructor.name)
//     }
// }

// interface ChildBountyAddedData {
//     parentIndex: number
//     childIndex: number
// }

// export function getChildBountyAddedData(ctx: EventContext): ChildBountyAddedData {
//     const event = new ChildBountiesAddedEvent(ctx)
//     if (event.isV9190) {
//         const { index, childIndex } = event.asV9190
//         return {
//             parentIndex: index,
//             childIndex
//         }
//     } else {
//         throw new UnknownVersionError(event.constructor.name)
//     }
// }
