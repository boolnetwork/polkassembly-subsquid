import {lookupArchive} from "@subsquid/archive-registry"
// import { ProcessorConfig } from './common/processorConfig'
// import { Store } from '@subsquid/typeorm-store'

const config: any = {
    chain: {
        name: 'moonbeam',
        prefix: 42,
    },
    dataSource: {
        archive: lookupArchive('moonbeam', {type: 'Substrate', release: 'ArrowSquid' }),
        chain: 'wss://wss.api.moonbeam.network',
    },
    typesBundle: 'moonbeam',
    batchSize: 500,
    blockRange: {
        from: 0,
    },
}

export default config
