import {sts, Block, Bytes, Option, Result, EventType, RuntimeCtx} from '../support'
import * as v2000 from '../v2000'

export const noted =  {
    name: 'Preimage.Noted',
    /**
     * A preimage has been noted.
     */
    v2000: new EventType(
        'Preimage.Noted',
        sts.struct({
            hash: v2000.H256,
        })
    ),
}

export const requested =  {
    name: 'Preimage.Requested',
    /**
     * A preimage has been requested.
     */
    v2000: new EventType(
        'Preimage.Requested',
        sts.struct({
            hash: v2000.H256,
        })
    ),
}

export const cleared =  {
    name: 'Preimage.Cleared',
    /**
     * A preimage has ben cleared.
     */
    v2000: new EventType(
        'Preimage.Cleared',
        sts.struct({
            hash: v2000.H256,
        })
    ),
}
