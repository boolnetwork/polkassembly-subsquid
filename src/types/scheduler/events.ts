import {sts, Block, Bytes, Option, Result, EventType, RuntimeCtx} from '../support'
import * as v900 from '../v900'
import * as v1300 from '../v1300'
import * as v1401 from '../v1401'
import * as v1606 from '../v1606'
import * as v2000 from '../v2000'
import * as v2501 from '../v2501'

export const dispatched =  {
    name: 'Scheduler.Dispatched',
    /**
     * Dispatched some task. \[task, id, result\]
     */
    v900: new EventType(
        'Scheduler.Dispatched',
        sts.tuple([sts.tuple(() => [sts.number(), sts.number()]), sts.option(() => sts.bytes()), sts.result(() => sts.unit(), () => v900.DispatchError)])
    ),
    /**
     * Dispatched some task.
     */
    v1300: new EventType(
        'Scheduler.Dispatched',
        sts.struct({
            task: sts.tuple(() => [sts.number(), sts.number()]),
            id: sts.option(() => sts.bytes()),
            result: sts.result(() => sts.unit(), () => v1300.DispatchError),
        })
    ),
    /**
     * Dispatched some task.
     */
    v1401: new EventType(
        'Scheduler.Dispatched',
        sts.struct({
            task: sts.tuple(() => [sts.number(), sts.number()]),
            id: sts.option(() => sts.bytes()),
            result: sts.result(() => sts.unit(), () => v1401.DispatchError),
        })
    ),
    /**
     * Dispatched some task.
     */
    v1606: new EventType(
        'Scheduler.Dispatched',
        sts.struct({
            task: sts.tuple(() => [sts.number(), sts.number()]),
            id: sts.option(() => sts.bytes()),
            result: sts.result(() => sts.unit(), () => v1606.DispatchError),
        })
    ),
    /**
     * Dispatched some task.
     */
    v2000: new EventType(
        'Scheduler.Dispatched',
        sts.struct({
            task: sts.tuple(() => [sts.number(), sts.number()]),
            id: sts.option(() => sts.bytes()),
            result: sts.result(() => sts.unit(), () => v2000.DispatchError),
        })
    ),
    /**
     * Dispatched some task.
     */
    v2501: new EventType(
        'Scheduler.Dispatched',
        sts.struct({
            task: sts.tuple(() => [sts.number(), sts.number()]),
            id: sts.option(() => sts.bytes()),
            result: sts.result(() => sts.unit(), () => v2501.DispatchError),
        })
    ),
}
