import {lookupArchive} from "@subsquid/archive-registry"
// import { ProcessorConfig } from './common/processorConfig'
// import { Store } from '@subsquid/typeorm-store'

const config: any = {
    chain: {
        name: 'bool_beta_testnet',
        prefix: 42,
    },
    dataSource: {
        chain: 'ws://127.0.0.1:9944',
    },
    typesBundle: 'moonbeam',
    batchSize: 500,
    blockRange: {
        from: 0,
    },
}

export default config
