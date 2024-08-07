// import { EventHandlerContext } from '../../types/contexts'
// import { StorageNotExistsWarn } from '../../../common/errors'
// import { ProposalStatus, ProposalType } from '../../../model'
// import { ss58codec } from '../../../common/tools'
// import { storage } from '../../../storage'
// import { createChildBounty } from '../../utils/proposals'
// import { getChildBountyAddedData } from './getters'

// export async function handleProposed(ctx: EventHandlerContext) {
//     const { parentIndex, childIndex } = getChildBountyAddedData(ctx)

//     const storageData = await storage.childBounties.getChildBounties(ctx, parentIndex, childIndex)
//     if (!storageData) {
//         ctx.log.warn(StorageNotExistsWarn(ProposalType.ChildBounty, childIndex))
//         return
//     }

//     const { value, fee, description, curatorDeposit } = storageData

//     await createChildBounty(ctx, {
//         index: childIndex,
//         parentBountyIndex: parentIndex,
//         status: ProposalStatus.Added,
//         reward: value,
//         fee: fee,
//         curatorDeposit: curatorDeposit,
//         description: description,
//     })
// }