import {sts, Result, Option, Bytes, BitSequence} from './support'

export type Type_511 = Type_511_Approved | Type_511_Cancelled | Type_511_Killed | Type_511_Ongoing | Type_511_Rejected | Type_511_TimedOut

export interface Type_511_Approved {
    __kind: 'Approved'
    value: [number, (Deposit | undefined), (Deposit | undefined)]
}

export interface Type_511_Cancelled {
    __kind: 'Cancelled'
    value: [number, (Deposit | undefined), (Deposit | undefined)]
}

export interface Type_511_Killed {
    __kind: 'Killed'
    value: number
}

export interface Type_511_Ongoing {
    __kind: 'Ongoing'
    value: Type_512
}

export interface Type_511_Rejected {
    __kind: 'Rejected'
    value: [number, (Deposit | undefined), (Deposit | undefined)]
}

export interface Type_511_TimedOut {
    __kind: 'TimedOut'
    value: [number, (Deposit | undefined), (Deposit | undefined)]
}

export interface Type_512 {
    track: number
    origin: OriginCaller
    proposal: Bounded
    enactment: DispatchTime
    submitted: number
    submissionDeposit: Deposit
    decisionDeposit?: (Deposit | undefined)
    deciding?: (DecidingStatus | undefined)
    tally: Tally
    inQueue: boolean
    alarm?: ([number, [number, number]] | undefined)
}

export interface Tally {
    ayes: bigint
    nays: bigint
    support: bigint
}

export interface DecidingStatus {
    since: number
    confirming?: (number | undefined)
}

export type DispatchTime = DispatchTime_After | DispatchTime_At

export interface DispatchTime_After {
    __kind: 'After'
    value: number
}

export interface DispatchTime_At {
    __kind: 'At'
    value: number
}

export type Bounded = Bounded_Inline | Bounded_Legacy | Bounded_Lookup

export interface Bounded_Inline {
    __kind: 'Inline'
    value: Bytes
}

export interface Bounded_Legacy {
    __kind: 'Legacy'
    hash: H256
}

export interface Bounded_Lookup {
    __kind: 'Lookup'
    hash: H256
    len: number
}

export type H256 = Bytes

export type OriginCaller = OriginCaller_CouncilCollective | OriginCaller_CumulusXcm | OriginCaller_Ethereum | OriginCaller_EthereumXcm | OriginCaller_OpenTechCommitteeCollective | OriginCaller_Origins | OriginCaller_PolkadotXcm | OriginCaller_TechCommitteeCollective | OriginCaller_TreasuryCouncilCollective | OriginCaller_Void | OriginCaller_system

export interface OriginCaller_CouncilCollective {
    __kind: 'CouncilCollective'
    value: Type_122
}

export interface OriginCaller_CumulusXcm {
    __kind: 'CumulusXcm'
    value: Type_126
}

export interface OriginCaller_Ethereum {
    __kind: 'Ethereum'
    value: Type_120
}

export interface OriginCaller_EthereumXcm {
    __kind: 'EthereumXcm'
    value: Type_136
}

export interface OriginCaller_OpenTechCommitteeCollective {
    __kind: 'OpenTechCommitteeCollective'
    value: Type_125
}

export interface OriginCaller_Origins {
    __kind: 'Origins'
    value: Origin
}

export interface OriginCaller_PolkadotXcm {
    __kind: 'PolkadotXcm'
    value: Type_127
}

export interface OriginCaller_TechCommitteeCollective {
    __kind: 'TechCommitteeCollective'
    value: Type_123
}

export interface OriginCaller_TreasuryCouncilCollective {
    __kind: 'TreasuryCouncilCollective'
    value: Type_124
}

export interface OriginCaller_Void {
    __kind: 'Void'
    value: Void
}

export interface OriginCaller_system {
    __kind: 'system'
    value: RawOrigin
}

export type RawOrigin = RawOrigin_None | RawOrigin_Root | RawOrigin_Signed

export interface RawOrigin_None {
    __kind: 'None'
}

export interface RawOrigin_Root {
    __kind: 'Root'
}

export interface RawOrigin_Signed {
    __kind: 'Signed'
    value: AccountId20
}

export type Void = never

export type Type_124 = Type_124_Member | Type_124_Members | Type_124__Phantom

export interface Type_124_Member {
    __kind: 'Member'
    value: AccountId20
}

export interface Type_124_Members {
    __kind: 'Members'
    value: [number, number]
}

export interface Type_124__Phantom {
    __kind: '_Phantom'
}

export type Type_123 = Type_123_Member | Type_123_Members | Type_123__Phantom

export interface Type_123_Member {
    __kind: 'Member'
    value: AccountId20
}

export interface Type_123_Members {
    __kind: 'Members'
    value: [number, number]
}

export interface Type_123__Phantom {
    __kind: '_Phantom'
}

export type Type_127 = Type_127_Response | Type_127_Xcm

export interface Type_127_Response {
    __kind: 'Response'
    value: V3MultiLocation
}

export interface Type_127_Xcm {
    __kind: 'Xcm'
    value: V3MultiLocation
}

export interface V3MultiLocation {
    parents: number
    interior: V3Junctions
}

export type V3Junctions = V3Junctions_Here | V3Junctions_X1 | V3Junctions_X2 | V3Junctions_X3 | V3Junctions_X4 | V3Junctions_X5 | V3Junctions_X6 | V3Junctions_X7 | V3Junctions_X8

export interface V3Junctions_Here {
    __kind: 'Here'
}

export interface V3Junctions_X1 {
    __kind: 'X1'
    value: V3Junction
}

export interface V3Junctions_X2 {
    __kind: 'X2'
    value: [V3Junction, V3Junction]
}

export interface V3Junctions_X3 {
    __kind: 'X3'
    value: [V3Junction, V3Junction, V3Junction]
}

export interface V3Junctions_X4 {
    __kind: 'X4'
    value: [V3Junction, V3Junction, V3Junction, V3Junction]
}

export interface V3Junctions_X5 {
    __kind: 'X5'
    value: [V3Junction, V3Junction, V3Junction, V3Junction, V3Junction]
}

export interface V3Junctions_X6 {
    __kind: 'X6'
    value: [V3Junction, V3Junction, V3Junction, V3Junction, V3Junction, V3Junction]
}

export interface V3Junctions_X7 {
    __kind: 'X7'
    value: [V3Junction, V3Junction, V3Junction, V3Junction, V3Junction, V3Junction, V3Junction]
}

export interface V3Junctions_X8 {
    __kind: 'X8'
    value: [V3Junction, V3Junction, V3Junction, V3Junction, V3Junction, V3Junction, V3Junction, V3Junction]
}

export type V3Junction = V3Junction_AccountId32 | V3Junction_AccountIndex64 | V3Junction_AccountKey20 | V3Junction_GeneralIndex | V3Junction_GeneralKey | V3Junction_GlobalConsensus | V3Junction_OnlyChild | V3Junction_PalletInstance | V3Junction_Parachain | V3Junction_Plurality

export interface V3Junction_AccountId32 {
    __kind: 'AccountId32'
    network?: (V3NetworkId | undefined)
    id: Bytes
}

export interface V3Junction_AccountIndex64 {
    __kind: 'AccountIndex64'
    network?: (V3NetworkId | undefined)
    index: bigint
}

export interface V3Junction_AccountKey20 {
    __kind: 'AccountKey20'
    network?: (V3NetworkId | undefined)
    key: Bytes
}

export interface V3Junction_GeneralIndex {
    __kind: 'GeneralIndex'
    value: bigint
}

export interface V3Junction_GeneralKey {
    __kind: 'GeneralKey'
    length: number
    data: Bytes
}

export interface V3Junction_GlobalConsensus {
    __kind: 'GlobalConsensus'
    value: V3NetworkId
}

export interface V3Junction_OnlyChild {
    __kind: 'OnlyChild'
}

export interface V3Junction_PalletInstance {
    __kind: 'PalletInstance'
    value: number
}

export interface V3Junction_Parachain {
    __kind: 'Parachain'
    value: number
}

export interface V3Junction_Plurality {
    __kind: 'Plurality'
    id: V3BodyId
    part: V3BodyPart
}

export type V3BodyPart = V3BodyPart_AtLeastProportion | V3BodyPart_Fraction | V3BodyPart_Members | V3BodyPart_MoreThanProportion | V3BodyPart_Voice

export interface V3BodyPart_AtLeastProportion {
    __kind: 'AtLeastProportion'
    nom: number
    denom: number
}

export interface V3BodyPart_Fraction {
    __kind: 'Fraction'
    nom: number
    denom: number
}

export interface V3BodyPart_Members {
    __kind: 'Members'
    count: number
}

export interface V3BodyPart_MoreThanProportion {
    __kind: 'MoreThanProportion'
    nom: number
    denom: number
}

export interface V3BodyPart_Voice {
    __kind: 'Voice'
}

export type V3BodyId = V3BodyId_Administration | V3BodyId_Defense | V3BodyId_Executive | V3BodyId_Index | V3BodyId_Judicial | V3BodyId_Legislative | V3BodyId_Moniker | V3BodyId_Technical | V3BodyId_Treasury | V3BodyId_Unit

export interface V3BodyId_Administration {
    __kind: 'Administration'
}

export interface V3BodyId_Defense {
    __kind: 'Defense'
}

export interface V3BodyId_Executive {
    __kind: 'Executive'
}

export interface V3BodyId_Index {
    __kind: 'Index'
    value: number
}

export interface V3BodyId_Judicial {
    __kind: 'Judicial'
}

export interface V3BodyId_Legislative {
    __kind: 'Legislative'
}

export interface V3BodyId_Moniker {
    __kind: 'Moniker'
    value: Bytes
}

export interface V3BodyId_Technical {
    __kind: 'Technical'
}

export interface V3BodyId_Treasury {
    __kind: 'Treasury'
}

export interface V3BodyId_Unit {
    __kind: 'Unit'
}

export type V3NetworkId = V3NetworkId_BitcoinCash | V3NetworkId_BitcoinCore | V3NetworkId_ByFork | V3NetworkId_ByGenesis | V3NetworkId_Ethereum | V3NetworkId_Kusama | V3NetworkId_Polkadot | V3NetworkId_Rococo | V3NetworkId_Westend | V3NetworkId_Wococo

export interface V3NetworkId_BitcoinCash {
    __kind: 'BitcoinCash'
}

export interface V3NetworkId_BitcoinCore {
    __kind: 'BitcoinCore'
}

export interface V3NetworkId_ByFork {
    __kind: 'ByFork'
    blockNumber: bigint
    blockHash: Bytes
}

export interface V3NetworkId_ByGenesis {
    __kind: 'ByGenesis'
    value: Bytes
}

export interface V3NetworkId_Ethereum {
    __kind: 'Ethereum'
    chainId: bigint
}

export interface V3NetworkId_Kusama {
    __kind: 'Kusama'
}

export interface V3NetworkId_Polkadot {
    __kind: 'Polkadot'
}

export interface V3NetworkId_Rococo {
    __kind: 'Rococo'
}

export interface V3NetworkId_Westend {
    __kind: 'Westend'
}

export interface V3NetworkId_Wococo {
    __kind: 'Wococo'
}

export type Origin = Origin_GeneralAdmin | Origin_ReferendumCanceller | Origin_ReferendumKiller | Origin_WhitelistedCaller

export interface Origin_GeneralAdmin {
    __kind: 'GeneralAdmin'
}

export interface Origin_ReferendumCanceller {
    __kind: 'ReferendumCanceller'
}

export interface Origin_ReferendumKiller {
    __kind: 'ReferendumKiller'
}

export interface Origin_WhitelistedCaller {
    __kind: 'WhitelistedCaller'
}

export type Type_125 = Type_125_Member | Type_125_Members | Type_125__Phantom

export interface Type_125_Member {
    __kind: 'Member'
    value: AccountId20
}

export interface Type_125_Members {
    __kind: 'Members'
    value: [number, number]
}

export interface Type_125__Phantom {
    __kind: '_Phantom'
}

export type Type_136 = Type_136_XcmEthereumTransaction

export interface Type_136_XcmEthereumTransaction {
    __kind: 'XcmEthereumTransaction'
    value: H160
}

export type H160 = Bytes

export type Type_120 = Type_120_EthereumTransaction

export interface Type_120_EthereumTransaction {
    __kind: 'EthereumTransaction'
    value: H160
}

export type Type_126 = Type_126_Relay | Type_126_SiblingParachain

export interface Type_126_Relay {
    __kind: 'Relay'
}

export interface Type_126_SiblingParachain {
    __kind: 'SiblingParachain'
    value: Id
}

export type Id = number

export type Type_122 = Type_122_Member | Type_122_Members | Type_122__Phantom

export interface Type_122_Member {
    __kind: 'Member'
    value: AccountId20
}

export interface Type_122_Members {
    __kind: 'Members'
    value: [number, number]
}

export interface Type_122__Phantom {
    __kind: '_Phantom'
}

export interface Deposit {
    who: AccountId20
    amount: bigint
}

export const Type_511: sts.Type<Type_511> = sts.closedEnum(() => {
    return  {
        Approved: sts.tuple(() => [sts.number(), sts.option(() => Deposit), sts.option(() => Deposit)]),
        Cancelled: sts.tuple(() => [sts.number(), sts.option(() => Deposit), sts.option(() => Deposit)]),
        Killed: sts.number(),
        Ongoing: Type_512,
        Rejected: sts.tuple(() => [sts.number(), sts.option(() => Deposit), sts.option(() => Deposit)]),
        TimedOut: sts.tuple(() => [sts.number(), sts.option(() => Deposit), sts.option(() => Deposit)]),
    }
})

export const Type_512: sts.Type<Type_512> = sts.struct(() => {
    return  {
        track: sts.number(),
        origin: OriginCaller,
        proposal: Bounded,
        enactment: DispatchTime,
        submitted: sts.number(),
        submissionDeposit: Deposit,
        decisionDeposit: sts.option(() => Deposit),
        deciding: sts.option(() => DecidingStatus),
        tally: Tally,
        inQueue: sts.boolean(),
        alarm: sts.option(() => sts.tuple(() => [sts.number(), sts.tuple(() => [sts.number(), sts.number()])])),
    }
})

export const DecidingStatus: sts.Type<DecidingStatus> = sts.struct(() => {
    return  {
        since: sts.number(),
        confirming: sts.option(() => sts.number()),
    }
})

export const DispatchTime: sts.Type<DispatchTime> = sts.closedEnum(() => {
    return  {
        After: sts.number(),
        At: sts.number(),
    }
})

export const OriginCaller: sts.Type<OriginCaller> = sts.closedEnum(() => {
    return  {
        CouncilCollective: Type_122,
        CumulusXcm: Type_126,
        Ethereum: Type_120,
        EthereumXcm: Type_136,
        OpenTechCommitteeCollective: Type_125,
        Origins: Origin,
        PolkadotXcm: Type_127,
        TechCommitteeCollective: Type_123,
        TreasuryCouncilCollective: Type_124,
        Void: Void,
        system: RawOrigin,
    }
})

export const RawOrigin: sts.Type<RawOrigin> = sts.closedEnum(() => {
    return  {
        None: sts.unit(),
        Root: sts.unit(),
        Signed: AccountId20,
    }
})

export const Void: sts.Type<Void> = sts.closedEnum(() => {
    return  {
    }
})

export const Type_124: sts.Type<Type_124> = sts.closedEnum(() => {
    return  {
        Member: AccountId20,
        Members: sts.tuple(() => [sts.number(), sts.number()]),
        _Phantom: sts.unit(),
    }
})

export const Type_123: sts.Type<Type_123> = sts.closedEnum(() => {
    return  {
        Member: AccountId20,
        Members: sts.tuple(() => [sts.number(), sts.number()]),
        _Phantom: sts.unit(),
    }
})

export const Type_127: sts.Type<Type_127> = sts.closedEnum(() => {
    return  {
        Response: V3MultiLocation,
        Xcm: V3MultiLocation,
    }
})

export const V3MultiLocation: sts.Type<V3MultiLocation> = sts.struct(() => {
    return  {
        parents: sts.number(),
        interior: V3Junctions,
    }
})

export const V3Junctions: sts.Type<V3Junctions> = sts.closedEnum(() => {
    return  {
        Here: sts.unit(),
        X1: V3Junction,
        X2: sts.tuple(() => [V3Junction, V3Junction]),
        X3: sts.tuple(() => [V3Junction, V3Junction, V3Junction]),
        X4: sts.tuple(() => [V3Junction, V3Junction, V3Junction, V3Junction]),
        X5: sts.tuple(() => [V3Junction, V3Junction, V3Junction, V3Junction, V3Junction]),
        X6: sts.tuple(() => [V3Junction, V3Junction, V3Junction, V3Junction, V3Junction, V3Junction]),
        X7: sts.tuple(() => [V3Junction, V3Junction, V3Junction, V3Junction, V3Junction, V3Junction, V3Junction]),
        X8: sts.tuple(() => [V3Junction, V3Junction, V3Junction, V3Junction, V3Junction, V3Junction, V3Junction, V3Junction]),
    }
})

export const V3Junction: sts.Type<V3Junction> = sts.closedEnum(() => {
    return  {
        AccountId32: sts.enumStruct({
            network: sts.option(() => V3NetworkId),
            id: sts.bytes(),
        }),
        AccountIndex64: sts.enumStruct({
            network: sts.option(() => V3NetworkId),
            index: sts.bigint(),
        }),
        AccountKey20: sts.enumStruct({
            network: sts.option(() => V3NetworkId),
            key: sts.bytes(),
        }),
        GeneralIndex: sts.bigint(),
        GeneralKey: sts.enumStruct({
            length: sts.number(),
            data: sts.bytes(),
        }),
        GlobalConsensus: V3NetworkId,
        OnlyChild: sts.unit(),
        PalletInstance: sts.number(),
        Parachain: sts.number(),
        Plurality: sts.enumStruct({
            id: V3BodyId,
            part: V3BodyPart,
        }),
    }
})

export const V3BodyPart: sts.Type<V3BodyPart> = sts.closedEnum(() => {
    return  {
        AtLeastProportion: sts.enumStruct({
            nom: sts.number(),
            denom: sts.number(),
        }),
        Fraction: sts.enumStruct({
            nom: sts.number(),
            denom: sts.number(),
        }),
        Members: sts.enumStruct({
            count: sts.number(),
        }),
        MoreThanProportion: sts.enumStruct({
            nom: sts.number(),
            denom: sts.number(),
        }),
        Voice: sts.unit(),
    }
})

export const V3BodyId: sts.Type<V3BodyId> = sts.closedEnum(() => {
    return  {
        Administration: sts.unit(),
        Defense: sts.unit(),
        Executive: sts.unit(),
        Index: sts.number(),
        Judicial: sts.unit(),
        Legislative: sts.unit(),
        Moniker: sts.bytes(),
        Technical: sts.unit(),
        Treasury: sts.unit(),
        Unit: sts.unit(),
    }
})

export const V3NetworkId: sts.Type<V3NetworkId> = sts.closedEnum(() => {
    return  {
        BitcoinCash: sts.unit(),
        BitcoinCore: sts.unit(),
        ByFork: sts.enumStruct({
            blockNumber: sts.bigint(),
            blockHash: sts.bytes(),
        }),
        ByGenesis: sts.bytes(),
        Ethereum: sts.enumStruct({
            chainId: sts.bigint(),
        }),
        Kusama: sts.unit(),
        Polkadot: sts.unit(),
        Rococo: sts.unit(),
        Westend: sts.unit(),
        Wococo: sts.unit(),
    }
})

export const Origin: sts.Type<Origin> = sts.closedEnum(() => {
    return  {
        GeneralAdmin: sts.unit(),
        ReferendumCanceller: sts.unit(),
        ReferendumKiller: sts.unit(),
        WhitelistedCaller: sts.unit(),
    }
})

export const Type_125: sts.Type<Type_125> = sts.closedEnum(() => {
    return  {
        Member: AccountId20,
        Members: sts.tuple(() => [sts.number(), sts.number()]),
        _Phantom: sts.unit(),
    }
})

export const Type_136: sts.Type<Type_136> = sts.closedEnum(() => {
    return  {
        XcmEthereumTransaction: H160,
    }
})

export const H160 = sts.bytes()

export const Type_120: sts.Type<Type_120> = sts.closedEnum(() => {
    return  {
        EthereumTransaction: H160,
    }
})

export const Type_126: sts.Type<Type_126> = sts.closedEnum(() => {
    return  {
        Relay: sts.unit(),
        SiblingParachain: Id,
    }
})

export const Id = sts.number()

export const Type_122: sts.Type<Type_122> = sts.closedEnum(() => {
    return  {
        Member: AccountId20,
        Members: sts.tuple(() => [sts.number(), sts.number()]),
        _Phantom: sts.unit(),
    }
})

export const Deposit: sts.Type<Deposit> = sts.struct(() => {
    return  {
        who: AccountId20,
        amount: sts.bigint(),
    }
})

export type AccountId20 = Bytes

export type Type_499 = Type_499_Casting | Type_499_Delegating

export interface Type_499_Casting {
    __kind: 'Casting'
    value: Casting
}

export interface Type_499_Delegating {
    __kind: 'Delegating'
    value: Delegating
}

export interface Delegating {
    balance: bigint
    target: AccountId20
    conviction: Type_212
    delegations: Type_504
    prior: [number, bigint]
}

export interface Type_504 {
    votes: bigint
    capital: bigint
}

export type Type_212 = Type_212_Locked1x | Type_212_Locked2x | Type_212_Locked3x | Type_212_Locked4x | Type_212_Locked5x | Type_212_Locked6x | Type_212_None

export interface Type_212_Locked1x {
    __kind: 'Locked1x'
}

export interface Type_212_Locked2x {
    __kind: 'Locked2x'
}

export interface Type_212_Locked3x {
    __kind: 'Locked3x'
}

export interface Type_212_Locked4x {
    __kind: 'Locked4x'
}

export interface Type_212_Locked5x {
    __kind: 'Locked5x'
}

export interface Type_212_Locked6x {
    __kind: 'Locked6x'
}

export interface Type_212_None {
    __kind: 'None'
}

export interface Casting {
    votes: [number, Type_210][]
    delegations: Type_504
    prior: [number, bigint]
}

export type Type_210 = Type_210_Split | Type_210_SplitAbstain | Type_210_Standard

export interface Type_210_Split {
    __kind: 'Split'
    aye: bigint
    nay: bigint
}

export interface Type_210_SplitAbstain {
    __kind: 'SplitAbstain'
    aye: bigint
    nay: bigint
    abstain: bigint
}

export interface Type_210_Standard {
    __kind: 'Standard'
    vote: number
    balance: bigint
}

export const Type_499: sts.Type<Type_499> = sts.closedEnum(() => {
    return  {
        Casting: Casting,
        Delegating: Delegating,
    }
})

export const Delegating: sts.Type<Delegating> = sts.struct(() => {
    return  {
        balance: sts.bigint(),
        target: AccountId20,
        conviction: Type_212,
        delegations: Type_504,
        prior: sts.tuple(() => [sts.number(), sts.bigint()]),
    }
})

export const Type_504: sts.Type<Type_504> = sts.struct(() => {
    return  {
        votes: sts.bigint(),
        capital: sts.bigint(),
    }
})

export const Casting: sts.Type<Casting> = sts.struct(() => {
    return  {
        votes: sts.array(() => sts.tuple(() => [sts.number(), Type_210])),
        delegations: Type_504,
        prior: sts.tuple(() => [sts.number(), sts.bigint()]),
    }
})

export const Type_212: sts.Type<Type_212> = sts.closedEnum(() => {
    return  {
        Locked1x: sts.unit(),
        Locked2x: sts.unit(),
        Locked3x: sts.unit(),
        Locked4x: sts.unit(),
        Locked5x: sts.unit(),
        Locked6x: sts.unit(),
        None: sts.unit(),
    }
})

export const Type_210: sts.Type<Type_210> = sts.closedEnum(() => {
    return  {
        Split: sts.enumStruct({
            aye: sts.bigint(),
            nay: sts.bigint(),
        }),
        SplitAbstain: sts.enumStruct({
            aye: sts.bigint(),
            nay: sts.bigint(),
            abstain: sts.bigint(),
        }),
        Standard: sts.enumStruct({
            vote: sts.number(),
            balance: sts.bigint(),
        }),
    }
})

export const Tally: sts.Type<Tally> = sts.struct(() => {
    return  {
        ayes: sts.bigint(),
        nays: sts.bigint(),
        support: sts.bigint(),
    }
})

export const AccountId20 = sts.bytes()

export const Bounded: sts.Type<Bounded> = sts.closedEnum(() => {
    return  {
        Inline: sts.bytes(),
        Legacy: sts.enumStruct({
            hash: H256,
        }),
        Lookup: sts.enumStruct({
            hash: H256,
            len: sts.number(),
        }),
    }
})

export const H256 = sts.bytes()
