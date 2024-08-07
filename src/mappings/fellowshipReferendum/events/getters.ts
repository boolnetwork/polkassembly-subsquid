// import { FellowshipReferendaSubmittedEvent, 
//     FellowshipReferendaCancelledEvent, 
//     FellowshipReferendaApprovedEvent,
//     FellowshipReferendaKilledEvent,
//     FellowshipReferendaConfirmAbortedEvent,
//     FellowshipReferendaConfirmedEvent,
//     FellowshipReferendaDecisionDepositPlacedEvent,
//     FellowshipReferendaDecisionStartedEvent,
//     FellowshipReferendaConfirmStartedEvent,
//     FellowshipReferendaRejectedEvent,
//     FellowshipReferendaTimedOutEvent, FellowshipCollectiveVotedEvent } from '../../../types/events'
// import { UnknownVersionError } from '../../../common/errors'
// import { EventContext } from '../../../types/support'
// import { TallyData } from '../../types/data'
// import { VoteDecision } from '../../../model'

// interface ReferendumEventData {
//     index: number
//     track: number
//     hash: Uint8Array
// }


// export function getEventData(ctx: EventContext): ReferendumEventData {
//     const event = new FellowshipReferendaSubmittedEvent(ctx)
//     if (event.isV9320) {
//         const {index, track, proposal } = event.asV9320
//         let hash = null;
//         if(proposal.__kind == "Inline") {
//             hash = proposal.value
//         }
//         else{
//             hash = proposal.hash
//         }
//         return {
//             index,
//             track,
//             hash
//         }
//     } else {
//         throw new UnknownVersionError(event.constructor.name)
//     }
// }

// export interface ReferendaData {
//     tally: TallyData,
//     index: number,
// }

// export function getCancelledData(ctx: EventContext): ReferendaData {
//     const event = new FellowshipReferendaCancelledEvent(ctx)
//     if (event.isV9320) {
//         const { index, tally } = event.asV9320
//         return {
//             index,
//             tally
//         }
//     } else {
//         throw new UnknownVersionError(event.constructor.name)
//     }
// }

// export interface ReferendaIndexData {
//     index: number
// }

// export function getApprovedData(ctx: EventContext): ReferendaIndexData {
//     const event = new FellowshipReferendaApprovedEvent(ctx)
//     if (event.isV9320) {
//         const { index } = event.asV9320
//         return {
//             index
//         }
//     } else {
//         throw new UnknownVersionError(event.constructor.name)
//     }
// }

// export function getKilledData(ctx: EventContext): ReferendaData {
//     const event = new FellowshipReferendaKilledEvent(ctx)
//     if (event.isV9320) {
//         const { index, tally } = event.asV9320
//         return {
//             index,
//             tally
//         }
//     } else {
//         throw new UnknownVersionError(event.constructor.name)
//     }
// }

// export function getTimedOutData(ctx: EventContext): ReferendaIndexData {
//     const event = new FellowshipReferendaTimedOutEvent(ctx)
//     if (event.isV9320) {
//         const { index } = event.asV9320
//         return {
//             index
//         }
//     } else {
//         throw new UnknownVersionError(event.constructor.name)
//     }
// }

// export function getRejectedData(ctx: EventContext): ReferendaData {
//     const event = new FellowshipReferendaRejectedEvent(ctx)
//     if (event.isV9320) {
//         const { index, tally } = event.asV9320
//         return {
//             index,
//             tally
//         }
//     } else {
//         throw new UnknownVersionError(event.constructor.name)
//     }
// }

// export function getConfirmAbortedData(ctx: EventContext): ReferendaIndexData {
//     const event = new FellowshipReferendaConfirmAbortedEvent(ctx)
//     if (event.isV9320) {
//         const { index } = event.asV9320
//         return {
//             index
//         }
//     } else {
//         throw new UnknownVersionError(event.constructor.name)
//     }
// }

// export function getConfirmedData(ctx: EventContext): ReferendaData {
//     const event = new FellowshipReferendaConfirmedEvent(ctx)
//     if (event.isV9320) {
//         const { index, tally } = event.asV9320
//         return {
//             index,
//             tally
//         }
//     } else {
//         throw new UnknownVersionError(event.constructor.name)
//     }
// }

// export function getConfirmStartedData(ctx: EventContext): ReferendaIndexData {
//     const event = new FellowshipReferendaConfirmStartedEvent(ctx)
//     if (event.isV9320) {
//         const { index } = event.asV9320
//         return {
//             index,
//         }
//     } else {
//         throw new UnknownVersionError(event.constructor.name)
//     }
// }

// export interface ReferendaDepositData {
//     index: number,
//     who: Uint8Array,
//     amount: bigint,
// }

// export function getDecisionDepositPlacedData(ctx: EventContext): ReferendaDepositData {
//     const event = new FellowshipReferendaDecisionDepositPlacedEvent(ctx)
//     if (event.isV9320) {
//         const { index, who, amount } = event.asV9320
//         return {
//             index,
//             who,
//             amount
//         }
//     } else {
//         throw new UnknownVersionError(event.constructor.name)
//     }
// }

// export interface ReferendaDecisionStartedData {
//     index: number,
//     tally: TallyData,
//     track: number,
//     hash: Uint8Array,
// }

// export function getDecisionStartedData(ctx: EventContext): ReferendaDecisionStartedData {
//     const event = new FellowshipReferendaDecisionStartedEvent(ctx)
//     if (event.isV9320) {
//         let hash = undefined;
//         const { index, track, proposal, tally} = event.asV9320
//         if(proposal.__kind == "Inline") {
//             hash = proposal.value
//         }
//         else{
//             hash = proposal.hash
//         }
//         return {
//             index,
//             track,
//             tally,
//             hash
//         }
//     } else {
//         throw new UnknownVersionError(event.constructor.name)
//     }
// }

// interface FellowshipCollectiveVoteData {
//     accountId: Uint8Array, 
//     index: number, 
//     decision: VoteDecision,
//     amount: number, 
//     tally: TallyData

// }

// export function getFellowshipVoteData(ctx: EventContext): FellowshipCollectiveVoteData {
//     const event = new FellowshipCollectiveVotedEvent(ctx)
//     if (event.isV9320) {
//         const { who, poll, vote, tally  } = event.asV9320
//         const decision = vote.__kind == "Aye" ? VoteDecision.yes : VoteDecision.no
//         const amount = vote.value
//         return {
//             accountId: who,
//             index: poll,
//             decision,
//             amount,
//             tally
//         }
//     } else {
//         throw new UnknownVersionError(event.constructor.name)
//     }
// }