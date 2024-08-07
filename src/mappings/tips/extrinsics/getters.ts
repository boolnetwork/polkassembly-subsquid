// import { UnknownVersionError } from '../../../common/errors'
// import {
//     TipsTipCall,
// } from '../../../types/calls'
// import { CallContext } from '../../types/contexts'

// interface AccepterCuratorData {
//     hash: Uint8Array,
//     tipValue: bigint,
// }

// export function getTipsTipData(ctx: CallContext): AccepterCuratorData {
//     const call = new TipsTipCall(ctx)
//     if (call.isV2028) {
//         const { hash, tipValue } = call.asV2028
//         return {
//             hash,
//             tipValue,
//         }
//     } else {
//         throw new UnknownVersionError(call.constructor.name)
//     }
// }