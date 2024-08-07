import {sts, Block, Bytes, Option, Result, EventType, RuntimeCtx} from '../support'
import * as v900 from '../v900'
import * as v1300 from '../v1300'
import * as v1802 from '../v1802'

export const proposed =  {
    name: 'Treasury.Proposed',
    /**
     * New proposal. \[proposal_index\]
     */
    v900: new EventType(
        'Treasury.Proposed',
        sts.number()
    ),
    /**
     * New proposal.
     */
    v1300: new EventType(
        'Treasury.Proposed',
        sts.struct({
            proposalIndex: sts.number(),
        })
    ),
}

export const awarded =  {
    name: 'Treasury.Awarded',
    /**
     * Some funds have been allocated. \[proposal_index, award, beneficiary\]
     */
    v900: new EventType(
        'Treasury.Awarded',
        sts.tuple([sts.number(), sts.bigint(), v900.H160])
    ),
    /**
     * Some funds have been allocated.
     */
    v1300: new EventType(
        'Treasury.Awarded',
        sts.struct({
            proposalIndex: sts.number(),
            award: sts.bigint(),
            account: v1300.AccountId20,
        })
    ),
}

export const rejected =  {
    name: 'Treasury.Rejected',
    /**
     * A proposal was rejected; funds were slashed. \[proposal_index, slashed\]
     */
    v900: new EventType(
        'Treasury.Rejected',
        sts.tuple([sts.number(), sts.bigint()])
    ),
    /**
     * A proposal was rejected; funds were slashed.
     */
    v1300: new EventType(
        'Treasury.Rejected',
        sts.struct({
            proposalIndex: sts.number(),
            slashed: sts.bigint(),
        })
    ),
}

export const spendApproved =  {
    name: 'Treasury.SpendApproved',
    /**
     * A new spend proposal has been approved.
     */
    v1802: new EventType(
        'Treasury.SpendApproved',
        sts.struct({
            proposalIndex: sts.number(),
            amount: sts.bigint(),
            beneficiary: v1802.AccountId20,
        })
    ),
}
