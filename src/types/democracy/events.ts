import {sts, Block, Bytes, Option, Result, EventType, RuntimeCtx} from '../support'
import * as v900 from '../v900'
import * as v1001 from '../v1001'
import * as v1201 from '../v1201'
import * as v1300 from '../v1300'
import * as v1401 from '../v1401'
import * as v1606 from '../v1606'

export const proposed =  {
    name: 'Democracy.Proposed',
    /**
     * A motion has been proposed by a public account. \[proposal_index, deposit\]
     */
    v900: new EventType(
        'Democracy.Proposed',
        sts.tuple([sts.number(), sts.bigint()])
    ),
    /**
     * A motion has been proposed by a public account.
     */
    v1201: new EventType(
        'Democracy.Proposed',
        sts.struct({
            proposalIndex: sts.number(),
            deposit: sts.bigint(),
        })
    ),
}

export const tabled =  {
    name: 'Democracy.Tabled',
    /**
     * A public proposal has been tabled for referendum vote. \[proposal_index, deposit,
     * depositors\]
     */
    v900: new EventType(
        'Democracy.Tabled',
        sts.tuple([sts.number(), sts.bigint(), sts.array(() => v900.H160)])
    ),
    /**
     * A public proposal has been tabled for referendum vote.
     */
    v1201: new EventType(
        'Democracy.Tabled',
        sts.struct({
            proposalIndex: sts.number(),
            deposit: sts.bigint(),
            depositors: sts.array(() => v1201.AccountId20),
        })
    ),
    /**
     * A public proposal has been tabled for referendum vote.
     */
    v2000: new EventType(
        'Democracy.Tabled',
        sts.struct({
            proposalIndex: sts.number(),
            deposit: sts.bigint(),
        })
    ),
}

export const started =  {
    name: 'Democracy.Started',
    /**
     * A referendum has begun. \[ref_index, threshold\]
     */
    v900: new EventType(
        'Democracy.Started',
        sts.tuple([sts.number(), v900.VoteThreshold])
    ),
    /**
     * A referendum has begun.
     */
    v1201: new EventType(
        'Democracy.Started',
        sts.struct({
            refIndex: sts.number(),
            threshold: v1201.VoteThreshold,
        })
    ),
}

export const passed =  {
    name: 'Democracy.Passed',
    /**
     * A proposal has been approved by referendum. \[ref_index\]
     */
    v900: new EventType(
        'Democracy.Passed',
        sts.number()
    ),
    /**
     * A proposal has been approved by referendum.
     */
    v1201: new EventType(
        'Democracy.Passed',
        sts.struct({
            refIndex: sts.number(),
        })
    ),
}

export const notPassed =  {
    name: 'Democracy.NotPassed',
    /**
     * A proposal has been rejected by referendum. \[ref_index\]
     */
    v900: new EventType(
        'Democracy.NotPassed',
        sts.number()
    ),
    /**
     * A proposal has been rejected by referendum.
     */
    v1201: new EventType(
        'Democracy.NotPassed',
        sts.struct({
            refIndex: sts.number(),
        })
    ),
}

export const cancelled =  {
    name: 'Democracy.Cancelled',
    /**
     * A referendum has been cancelled. \[ref_index\]
     */
    v900: new EventType(
        'Democracy.Cancelled',
        sts.number()
    ),
    /**
     * A referendum has been cancelled.
     */
    v1201: new EventType(
        'Democracy.Cancelled',
        sts.struct({
            refIndex: sts.number(),
        })
    ),
}

export const executed =  {
    name: 'Democracy.Executed',
    /**
     * A proposal has been enacted. \[ref_index, result\]
     */
    v900: new EventType(
        'Democracy.Executed',
        sts.tuple([sts.number(), sts.result(() => sts.unit(), () => v900.DispatchError)])
    ),
    /**
     * A proposal has been enacted.
     */
    v1201: new EventType(
        'Democracy.Executed',
        sts.struct({
            refIndex: sts.number(),
            result: sts.result(() => sts.unit(), () => v1201.DispatchError),
        })
    ),
    /**
     * A proposal has been enacted.
     */
    v1300: new EventType(
        'Democracy.Executed',
        sts.struct({
            refIndex: sts.number(),
            result: sts.result(() => sts.unit(), () => v1300.DispatchError),
        })
    ),
    /**
     * A proposal has been enacted.
     */
    v1401: new EventType(
        'Democracy.Executed',
        sts.struct({
            refIndex: sts.number(),
            result: sts.result(() => sts.unit(), () => v1401.DispatchError),
        })
    ),
    /**
     * A proposal has been enacted.
     */
    v1606: new EventType(
        'Democracy.Executed',
        sts.struct({
            refIndex: sts.number(),
            result: sts.result(() => sts.unit(), () => v1606.DispatchError),
        })
    ),
}

export const preimageNoted =  {
    name: 'Democracy.PreimageNoted',
    /**
     * A proposal's preimage was noted, and the deposit taken. \[proposal_hash, who, deposit\]
     */
    v900: new EventType(
        'Democracy.PreimageNoted',
        sts.tuple([v900.H256, v900.H160, sts.bigint()])
    ),
    /**
     * A proposal's preimage was noted, and the deposit taken.
     */
    v1201: new EventType(
        'Democracy.PreimageNoted',
        sts.struct({
            proposalHash: v1201.H256,
            who: v1201.AccountId20,
            deposit: sts.bigint(),
        })
    ),
}

export const preimageUsed =  {
    name: 'Democracy.PreimageUsed',
    /**
     * A proposal preimage was removed and used (the deposit was returned).
     * \[proposal_hash, provider, deposit\]
     */
    v900: new EventType(
        'Democracy.PreimageUsed',
        sts.tuple([v900.H256, v900.H160, sts.bigint()])
    ),
    /**
     * A proposal preimage was removed and used (the deposit was returned).
     */
    v1201: new EventType(
        'Democracy.PreimageUsed',
        sts.struct({
            proposalHash: v1201.H256,
            provider: v1201.AccountId20,
            deposit: sts.bigint(),
        })
    ),
}

export const preimageInvalid =  {
    name: 'Democracy.PreimageInvalid',
    /**
     * A proposal could not be executed because its preimage was invalid.
     * \[proposal_hash, ref_index\]
     */
    v900: new EventType(
        'Democracy.PreimageInvalid',
        sts.tuple([v900.H256, sts.number()])
    ),
    /**
     * A proposal could not be executed because its preimage was invalid.
     */
    v1201: new EventType(
        'Democracy.PreimageInvalid',
        sts.struct({
            proposalHash: v1201.H256,
            refIndex: sts.number(),
        })
    ),
}

export const preimageMissing =  {
    name: 'Democracy.PreimageMissing',
    /**
     * A proposal could not be executed because its preimage was missing.
     * \[proposal_hash, ref_index\]
     */
    v900: new EventType(
        'Democracy.PreimageMissing',
        sts.tuple([v900.H256, sts.number()])
    ),
    /**
     * A proposal could not be executed because its preimage was missing.
     */
    v1201: new EventType(
        'Democracy.PreimageMissing',
        sts.struct({
            proposalHash: v1201.H256,
            refIndex: sts.number(),
        })
    ),
}

export const preimageReaped =  {
    name: 'Democracy.PreimageReaped',
    /**
     * A registered preimage was removed and the deposit collected by the reaper.
     * \[proposal_hash, provider, deposit, reaper\]
     */
    v900: new EventType(
        'Democracy.PreimageReaped',
        sts.tuple([v900.H256, v900.H160, sts.bigint(), v900.H160])
    ),
    /**
     * A registered preimage was removed and the deposit collected by the reaper.
     */
    v1201: new EventType(
        'Democracy.PreimageReaped',
        sts.struct({
            proposalHash: v1201.H256,
            provider: v1201.AccountId20,
            deposit: sts.bigint(),
            reaper: v1201.AccountId20,
        })
    ),
}

export const seconded =  {
    name: 'Democracy.Seconded',
    /**
     * An account has secconded a proposal
     */
    v1001: new EventType(
        'Democracy.Seconded',
        sts.tuple([v1001.AccountId20, sts.number()])
    ),
    /**
     * An account has secconded a proposal
     */
    v1201: new EventType(
        'Democracy.Seconded',
        sts.struct({
            who: v1201.AccountId20,
            proposalIndex: sts.number(),
        })
    ),
    /**
     * An account has secconded a proposal
     */
    v1300: new EventType(
        'Democracy.Seconded',
        sts.struct({
            seconder: v1300.AccountId20,
            propIndex: sts.number(),
        })
    ),
}
