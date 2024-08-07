import { FindOneOptions, Store } from '@subsquid/typeorm-store'
import { toJSON } from '@subsquid/util-internal-json'
import { toHex } from '@subsquid/substrate-processor'
import { MissingProposalRecordWarn } from '../../common/errors'
import { ss58codec } from '../../common/tools'
import { NOTIFICATION_URL, REDIS_CF_URL } from '../../consts/consts'
import { referendumV2EnactmentBlocks, fellowshipEnactmentBlocks } from '../../common/originEnactBlock'
import fetch from 'node-fetch'

import {
    MotionThreshold,
    Preimage,
    Proposal,
    ProposalStatus,
    ProposalType,
    ProposedCall,
    Tally,
    DecisionDeposit,
    SubmissionDeposit,
    Deciding,
    ReferendumThreshold,
    ReferendumThresholdType,
    StatusHistory,
    Tippers,
    ProposalGroup,
} from '../../model'
import {
    BountyData,
    ChildBountyData,
    CouncilMotionData,
    DemocracyProposalData,
    HashProposal,
    IndexProposal,
    PreimageData,
    ProposedCallData,
    ReferendumData,
    ReferendumDataV2,
    TechCommitteeMotionData,
    TipData,
    TreasuryData,
    DecisionDepositData,
    SubmissionDepositData,
    DecidingData,
    TallyData,
} from '../types/data'
import { randomUUID } from 'crypto'
import { ProcessorContext } from '../../processor'
import config from '../../config'

type ProposalUpdateData = Partial<
    Omit<
        Proposal,
        'updatedAt' | 'updatedAtBlock' | 'endedAt' | 'endedAtBlock' | 'status' | 'voting' | 'statusHistory' | 'id'
    >
>

export async function updatePreimageStatus(
    ctx: ProcessorContext<Store>,
    header: any,
    hash: string,
    options: {
        status: ProposalStatus
        isEnded?: boolean
        extrinsicIndex?: string
        data?: ProposalUpdateData
    }
) {
    const proposal = await ctx.store.get(Preimage, { where: { hash: hash } })

    if (!proposal) {
        ctx.log.warn(MissingProposalRecordWarn('Preimage', `with hash ${hash} not found`,))
        return
    }

    Object.assign(proposal, options.data)
    proposal.updatedAt = new Date(header.timestamp)
    proposal.updatedAtBlock = header.height
    proposal.status = options.status

    await ctx.store.insert(
        new StatusHistory({
            id: randomUUID(),
            block: proposal.updatedAtBlock || undefined,
            timestamp: proposal.updatedAt,
            status: proposal.status,
            extrinsicIndex: options?.extrinsicIndex,
            preimage: proposal,
        })
    )

    await ctx.store.save(proposal)
}

export async function updatePreimageStatusV2(
    ctx: ProcessorContext<Store>,
    header: any,
    hash: string,
    options: {
        status: ProposalStatus
        extrinsicIndex?: string
        isEnded?: boolean
        data?: ProposalUpdateData
    }
) {
    const proposal = await ctx.store.get(Preimage, { where: { hash: hash }, order: {createdAtBlock: 'DESC'}})

    if (!proposal) {
        ctx.log.warn(MissingProposalRecordWarn('PreimageV2', `with hash ${hash} not found`,))
        return
    }

    Object.assign(proposal, options.data)
    proposal.updatedAt = new Date(header.timestamp)
    proposal.updatedAtBlock = header.height
    proposal.status = options.status

    await ctx.store.insert(
        new StatusHistory({
            id: randomUUID(),
            block: proposal.updatedAtBlock || undefined,
            timestamp: proposal.updatedAt,
            status: proposal.status,
            extrinsicIndex: options?.extrinsicIndex,
            preimage: proposal,
        })
    )

    await ctx.store.save(proposal)
}

export async function updateProposalStatus(
    ctx: ProcessorContext<Store>,
    header: any,
    index: number,
    type: IndexProposal,
    options: {
        status: ProposalStatus
        extrinsicIndex?: string
        isEnded?: boolean
        data?: ProposalUpdateData
    }
): Promise<void>
export async function updateProposalStatus(
    ctx: ProcessorContext<Store>,
    header: any,
    hash: string,
    type: HashProposal,
    options: {
        status: ProposalStatus
        extrinsicIndex?: string
        isEnded?: boolean
        data?: ProposalUpdateData
    }
): Promise<void>
export async function updateProposalStatus(
    ctx: ProcessorContext<Store>,
    header: any,
    hashOrIndex: string | number,
    type: ProposalType,
    options: {
        status: ProposalStatus
        extrinsicIndex?: string
        isEnded?: boolean
        data?: ProposalUpdateData
    }
): Promise<void> {
    const proposal = await ctx.store.get(Proposal, {
        where:
            typeof hashOrIndex === 'string'
                ? {
                      hash: hashOrIndex,
                      type,
                  }
                : {
                      index: hashOrIndex,
                      type,
                  },
        order: {
            id: 'DESC',
        },
    })

    if (!proposal) {
        ctx.log.warn(MissingProposalRecordWarn(type, hashOrIndex, options.extrinsicIndex))
        return
    }

    Object.assign(proposal, options.data)
    proposal.updatedAt = new Date(header.timestamp)
    proposal.updatedAtBlock = header.height
    proposal.status = options.status

    if (options.isEnded) {
        proposal.endedAtBlock = proposal.updatedAtBlock
        proposal.endedAt = proposal.updatedAt
    }

    if(type == ProposalType.ReferendumV2 && options.status == ProposalStatus.Confirmed && proposal.origin){
        proposal.executeAtBlockNumber = header.height + referendumV2EnactmentBlocks[proposal.origin]
    }
    if(type == ProposalType.FellowshipReferendum && options.status == ProposalStatus.Confirmed && proposal.trackNumber){
        proposal.executeAtBlockNumber = header.height + fellowshipEnactmentBlocks[proposal.trackNumber]
    }

    await ctx.store.save(proposal)

    await ctx.store.insert(
        new StatusHistory({
            id: randomUUID(),
            block: proposal.updatedAtBlock || undefined,
            timestamp: proposal.updatedAt,
            status: proposal.status,
            extrinsicIndex: options?.extrinsicIndex,
            proposal,
        })
    )
    await sendNotification(ctx, proposal, 'proposalStatusChanged')
    await updateRedis(ctx, proposal)
}

async function getOrCreateProposalGroup(
    ctx: ProcessorContext<Store>,
    index: number,
    type: ProposalType,
    parentId: number,
    parentType: ProposalType
): Promise<ProposalGroup>
 {
    const condition: FindOneOptions<ProposalGroup>['where'] = {}
    switch (type) {
        case ProposalType.Bounty:
            condition.bountyIndex = index as number
            break
        case ProposalType.TreasuryProposal:
            condition.treasuryIndex = index as number
            break
        case ProposalType.Referendum:
            condition.referendumIndex = index as number
            break
        case ProposalType.DemocracyProposal:
            condition.democracyProposalIndex = index as number
            break
        case ProposalType.CouncilMotion:
            condition.councilMotionIndex = index as number
            break
        case ProposalType.TechCommitteeProposal:
            condition.techCommitteeProposalIndex = index as number
            break
        case ProposalType.ReferendumV2:
            condition.referendumV2Index = index as number
            break
        default:
            throw new Error(`Unknown proposal type ${type}`)
    }
    let link = await ctx.store.get(ProposalGroup, { where: condition })
    if(link){
        switch (parentType) {
            case ProposalType.Bounty:
                link.bountyIndex = parentId as number
                break
            case ProposalType.TreasuryProposal:
                link.treasuryIndex = parentId as number
                break
            case ProposalType.Referendum:
                link.referendumIndex = parentId as number
                break
            case ProposalType.DemocracyProposal:
                link.democracyProposalIndex = parentId as number
                break
            case ProposalType.CouncilMotion:
                link.councilMotionIndex = parentId as number
                break
            case ProposalType.TechCommitteeProposal:
                link.techCommitteeProposalIndex = parentId as number
                break
            case ProposalType.ReferendumV2:
                link.referendumV2Index = parentId as number
                break
            default:
                throw new Error(`Unknown proposal type ${type}`)
        }
        await ctx.store.save(link)
    }
    if (!link) {
        const id = await ctx.store.count(ProposalGroup)
        link = new ProposalGroup({
            id: id.toString(),
        })
        switch (type) {
            case ProposalType.Bounty:
                link.bountyIndex = index as number
                break
            case ProposalType.TreasuryProposal:
                link.treasuryIndex = index as number
                break
            case ProposalType.Referendum:
                link.referendumIndex = index as number
                break
            case ProposalType.DemocracyProposal:
                link.democracyProposalIndex = index as number
                break
            case ProposalType.CouncilMotion:
                link.councilMotionIndex = index as number
                break
            case ProposalType.TechCommitteeProposal:
                link.techCommitteeProposalIndex = index as number
                break
            case ProposalType.ReferendumV2:
                link.referendumV2Index = index as number
                break
            default:
                throw new Error(`Unknown proposal type ${type}`)
        }
        switch (parentType) {
            case ProposalType.Bounty:
                link.bountyIndex = parentId as number
                break
            case ProposalType.TreasuryProposal:
                link.treasuryIndex = parentId as number
                break
            case ProposalType.Referendum:
                link.referendumIndex = parentId as number
                break
            case ProposalType.DemocracyProposal:
                link.democracyProposalIndex = parentId as number
                break
            case ProposalType.CouncilMotion:
                link.councilMotionIndex = parentId as number
                break
            case ProposalType.TechCommitteeProposal:
                link.techCommitteeProposalIndex = parentId as number
                break
            case ProposalType.ReferendumV2:
                link.referendumV2Index = parentId as number
                break
            default:
                throw new Error(`Unknown proposal type ${type}`)
        }
        await ctx.store.insert(link)
    }
    return link
}

async function getProposalId(store: Store, type: ProposalType) {
    const count = await store.count(Proposal, { where: { type } })
    
    if(type == ProposalType.ReferendumV2){
        return `${Buffer.from(type.toLowerCase()).toString('hex')}-${count
            .toString()
            .padStart(8, '0')}`
    }
    return `${Buffer.from(type.toLowerCase()).toString('hex').slice(0, 8).padEnd(8, '0')}-${count
        .toString()
        .padStart(8, '0')}`
}

async function getPreimageId(store: Store) {
    const count = await store.count(Preimage)

    return count.toString().padStart(8, '0')
}

// async function getPreimageIdV2(store: Store) {
//     const count = await store.count(PreimageV2)

//     return count.toString().padStart(8, '0')
// }

export async function createDemocracyProposal(
    ctx: ProcessorContext<Store>,
    header: any,
    data: DemocracyProposalData
): Promise<Proposal> {
    const { index, hash, proposer, deposit, status } = data

    const type = ProposalType.DemocracyProposal

    const id = await getProposalId(ctx.store, type)

    const preimage = await ctx.store.get(Preimage, {
        where: {
            hash: hash,
            status: ProposalStatus.Noted,
        },
        order: {
            createdAtBlock: 'DESC'
        }
    })

    const proposal = new Proposal({
        id,
        index,
        type,
        hash,
        proposer,
        deposit,
        status,
        preimage,
        createdAtBlock: header.height,
        createdAt: new Date(header.timestamp),
        updatedAt: new Date(header.timestamp),
    })

    await ctx.store.insert(proposal)

    await ctx.store.insert(
        new StatusHistory({
            id: randomUUID(),
            block: proposal.createdAtBlock,
            timestamp: proposal.createdAt,
            status: proposal.status,
            extrinsicIndex: data.extrinsicIndex,
            proposal,
        })
    )

    await sendNotification(ctx, proposal, 'newProposalCreated')

    return proposal
}

export async function createReferendum( ctx: ProcessorContext<Store>, header: any, data: ReferendumData): Promise<Proposal> {
    const { index, threshold, hash, status, end, delay } = data

    const type = ProposalType.Referendum

    let group: ProposalGroup | undefined

    const id = await getProposalId(ctx.store, type)

    let preimage = null;
    let proposer = null;

    if(hash){
        const associatedProposal = await ctx.store.get(Proposal, {
            where: {
                hash: hash,
                status: ProposalStatus.Executed,
                type: ProposalType.CouncilMotion,
            },
            order: {
                createdAtBlock: 'DESC'
            }
        }) || await ctx.store.get(Proposal, {
            where: {
                hash: hash,
                status: ProposalStatus.Tabled,
                updatedAtBlock: header.height,
                type: ProposalType.DemocracyProposal,
            },
            order: {
                createdAtBlock: 'DESC'
            }
        }) || await ctx.store.get(Proposal, {
            where: {
                proposalArgumentHash: hash,
                status: ProposalStatus.Executed,
                type: ProposalType.CouncilMotion,
            },
            order: {
                createdAtBlock: 'DESC'
            }
        })
        if(associatedProposal && associatedProposal.index && associatedProposal.type){
            group = await getOrCreateProposalGroup(ctx, associatedProposal.index, associatedProposal.type as ProposalType, index, type)
            associatedProposal.group = group
            await ctx.store.save(associatedProposal)
            if(!preimage && associatedProposal.preimage){
                preimage = associatedProposal.preimage
                proposer = associatedProposal.proposer
            }

        }
    }

    if (!preimage) {
        preimage = await ctx.store.get(Preimage, {
            where: {
                hash: hash,
            },
            order: {
                createdAtBlock: 'DESC'
            }
        })
    }

    if(!proposer && preimage && preimage.proposer){
        proposer = preimage.proposer
    }

    const proposal = new Proposal({
        id,
        index,
        type,
        hash,
        proposer,
        threshold: new ReferendumThreshold({
            type: threshold as ReferendumThresholdType,
        }),
        preimage,
        status,
        end: end,
        delay: delay,
        group: group,
        createdAtBlock: header.height,
        createdAt: new Date(header.timestamp),
        updatedAt: new Date(header.timestamp),
    })

    await ctx.store.insert(proposal)

    await ctx.store.insert(
        new StatusHistory({
            id: randomUUID(),
            block: proposal.createdAtBlock,
            timestamp: proposal.createdAt,
            status: proposal.status,
            extrinsicIndex: data.extrinsicIndex,
            proposal,
        })
    )

    await sendNotification(ctx, proposal, 'newProposalCreated')

    return proposal
}

export async function createCoucilMotion(
    ctx: ProcessorContext<Store>,
    header: any,
    data: CouncilMotionData,
    type: ProposalType.CouncilMotion | ProposalType.TechCommitteeProposal = ProposalType.CouncilMotion
): Promise<Proposal> {
    const { index, status, threshold, hash, proposer, call } = data

    let group: ProposalGroup | undefined
    let preimage = null
    let hexHash = null;

    if (call.args){
        if(call.args['proposalHash']){
            hexHash = call.args['proposalHash'] as string
            preimage = await ctx.store.get(Preimage, {
                where: {
                    hash: hexHash,
                    status: ProposalStatus.Noted,
                },
                order: {
                    createdAtBlock: 'DESC'
                }
            })
        }
    }

    const id = await getProposalId(ctx.store, type)

    if (!preimage) {
        preimage = await ctx.store.get(Preimage, {
            where: {
                hash: hash,
                status: ProposalStatus.Noted,
            },
            order: {
                createdAtBlock: 'DESC'
            }
        })
    }

    if (call.args) {
        if (call.args['bountyId']) {
            const bountyIndex = call.args['bountyId'] as number
            group = await getOrCreateProposalGroup(ctx, bountyIndex, ProposalType.Bounty, index, type)
            const associatedBounty = await ctx.store.get(Proposal, {
                where: {
                    index: bountyIndex,
                    type: ProposalType.Bounty,
                },
                order: {
                    createdAtBlock: 'DESC'
                }
            })
            if (associatedBounty) {
                associatedBounty.group = group
                await ctx.store.save(associatedBounty)
            }
        } else if (call.args['proposalId'] || call.args['proposal_index'] || call.args['proposal_id']) {
            const proposalId = call.args['proposalId'] as number || call.args['proposal_index'] as number || call.args['proposal_id'] as number
            group = await getOrCreateProposalGroup(ctx, proposalId, ProposalType.TreasuryProposal, index, type)
            const associatedTreasuryProposal = await ctx.store.get(Proposal, {
                where: {
                    index: proposalId,
                    type: ProposalType.TreasuryProposal,
                },
                order: {
                    createdAtBlock: 'DESC'
                }
            })
            if (associatedTreasuryProposal) {
                associatedTreasuryProposal.group = group
                await ctx.store.save(associatedTreasuryProposal)
            }
        }
        else if (call.args['proposalHash'] && type === ProposalType.TechCommitteeProposal) {
            const motionHash = call.args['proposalHash'] as string
            const counciMotion = await ctx.store.get(Proposal, {
                where: {
                    hash: motionHash,
                    type: ProposalType.CouncilMotion,
                },
                order: {
                    createdAtBlock: 'DESC'
                }
            }) || await ctx.store.get(Proposal, {
                where: {
                    proposalArgumentHash: motionHash,
                    type: ProposalType.CouncilMotion,
                },
                order: {
                    createdAtBlock: 'DESC'
                }
            })
            if (counciMotion && counciMotion.index) {
                group = await getOrCreateProposalGroup(ctx, counciMotion.index, ProposalType.CouncilMotion, index, type)
                counciMotion.group = group
                await ctx.store.save(counciMotion)
            }
        }
    }

    const proposal = new Proposal({
        id,
        index,
        type,
        hash,
        proposer,
        status,
        threshold: new MotionThreshold({
            value: threshold,
        }),
        proposalArguments: createProposedCall(call),
        proposalArgumentHash: hexHash,
        preimage,
        group: group,
        createdAtBlock: header.height,
        createdAt: new Date(header.timestamp),
        updatedAt: new Date(header.timestamp),
    })

    await ctx.store.insert(proposal)

    await ctx.store.insert(
        new StatusHistory({
            id: randomUUID(),
            block: proposal.createdAtBlock,
            timestamp: proposal.createdAt,
            status: proposal.status,
            extrinsicIndex: data.extrinsicIndex,
            proposal,
        })
    )

    await sendNotification(ctx, proposal, 'newProposalCreated')

    return proposal
}

export async function createTechCommitteeMotion(
    ctx: ProcessorContext<Store>,
    header: any,
    data: TechCommitteeMotionData
): Promise<Proposal> {
    return await createCoucilMotion(ctx, header, data, ProposalType.TechCommitteeProposal)
}

export async function createTip( ctx: ProcessorContext<Store>, header: any, data: TipData): Promise<Proposal> {
    const { status, hash, proposer, payee, deposit, reason } = data

    const type = ProposalType.Tip

    const id = await getProposalId(ctx.store, type)

    const proposal = new Proposal({
        id,
        type,
        hash,
        proposer,
        payee,
        deposit,
        status,
        description: reason,
        createdAtBlock: header.height,
        createdAt: new Date(header.timestamp),
        updatedAt: new Date(header.timestamp),
    })

    await ctx.store.insert(proposal)

    await ctx.store.insert(
        new StatusHistory({
            id: randomUUID(),
            block: proposal.createdAtBlock,
            timestamp: proposal.createdAt,
            status: proposal.status,
            extrinsicIndex: data.extrinsicIndex,
            proposal,
        })
    )

    await sendNotification(ctx, proposal, 'newProposalCreated')

    return proposal
}

export async function createBounty( ctx: ProcessorContext<Store>, header: any, data: BountyData): Promise<Proposal> {
    const { status, index, proposer, deposit, reward, curatorDeposit, description, fee } = data

    const type = ProposalType.Bounty

    const id = await getProposalId(ctx.store, type)

    // const group = await getOrCreateProposalGroup(ctx, index, ProposalType.Bounty)

    const proposal = new Proposal({
        id,
        type,
        index,
        proposer,
        deposit,
        reward,
        curatorDeposit,
        description,
        status,
        fee,
        createdAtBlock: header.height,
        createdAt: new Date(header.timestamp),
        updatedAt: new Date(header.timestamp),
    })

    await ctx.store.insert(proposal)

    await ctx.store.insert(
        new StatusHistory({
            id: randomUUID(),
            block: proposal.createdAtBlock,
            timestamp: proposal.createdAt,
            status: proposal.status,
            extrinsicIndex: data.extrinsicIndex,
            proposal,
        })
    )

    await sendNotification(ctx, proposal, 'newProposalCreated')

    return proposal
}

export async function createChildBounty( ctx: ProcessorContext<Store>, header: any, data: ChildBountyData): Promise<Proposal> {
    const { status, index, parentBountyIndex, curatorDeposit, reward, fee, description } = data

    const type = ProposalType.ChildBounty

    const id = await getProposalId(ctx.store, type)

    // const group = await getOrCreateProposalGroup(ctx, index, ProposalType.Bounty)

    const proposal = new Proposal({
        id,
        type,
        index,
        reward,
        status,
        description,
        fee,
        parentBountyIndex,
        curatorDeposit,
        createdAtBlock: header.height,
        createdAt: new Date(header.timestamp),
        updatedAt: new Date(header.timestamp),
    })

    await ctx.store.insert(proposal)

    await ctx.store.insert(
        new StatusHistory({
            id: randomUUID(),
            block: proposal.createdAtBlock,
            timestamp: proposal.createdAt,
            status: proposal.status,
            extrinsicIndex: data.extrinsicIndex,
            proposal,
        })
    )

    await sendNotification(ctx, proposal, 'newProposalCreated')

    return proposal
}

export async function createTreasury( ctx: ProcessorContext<Store>, header: any, data: TreasuryData): Promise<Proposal> {
    const { status, index, proposer, deposit, reward, payee } = data

    const type = ProposalType.TreasuryProposal

    const id = await getProposalId(ctx.store, type)

    let group = null;

    if(status === ProposalStatus.Approved) {
        const referendumV2 = await ctx.store.get(Proposal, {
            where: {
                type: ProposalType.ReferendumV2,
                executeAtBlockNumber: header.height,
                status: ProposalStatus.Confirmed,
                proposer: proposer,
            }
        }) || await ctx.store.get(Proposal, {
            where: {
                type: ProposalType.ReferendumV2,
                executeAtBlockNumber: header.height,
                status: ProposalStatus.Executed,
                proposer: proposer,
            }
        })
        if(referendumV2 && referendumV2.trackNumber && [11, 30, 31, 32, 33, 34].includes(referendumV2.trackNumber) && referendumV2.index) {
            group = await getOrCreateProposalGroup(ctx, index, ProposalType.TreasuryProposal, referendumV2.index, referendumV2.type)
            if(group) {
                referendumV2.group = group
                await ctx.store.save(referendumV2)
            }

        }
    }

    const proposal = new Proposal({
        id,
        type,
        index,
        proposer,
        deposit,
        reward,
        status,
        payee,
        createdAtBlock: header.height,
        group: group,
        createdAt: new Date(header.timestamp),
        updatedAt: new Date(header.timestamp),
    })

    await ctx.store.insert(proposal)

    await ctx.store.insert(
        new StatusHistory({
            id: randomUUID(),
            block: proposal.createdAtBlock,
            timestamp: proposal.createdAt,
            status: proposal.status,
            extrinsicIndex: data.extrinsicIndex,
            proposal,
        })
    )

    await sendNotification(ctx, proposal, 'newProposalCreated')


    return proposal
}

export async function createPreimage( ctx: ProcessorContext<Store>, header: any, data: PreimageData): Promise<Preimage> {
    const { status, hash, proposer, call, section, method } = data

    // const type = ProposalType.Preimage

    const id = await getPreimageId(ctx.store)

    // const group = await getOrCreateProposalGroup(ctx, hash, ProposalType.Preimage)

    const preimage = new Preimage({
        id,
        hash,
        proposer,
        status,
        proposedCall: call ? createProposedCall(call) : null,
        section: section,
        method: method,
        createdAtBlock: header.height,
        createdAt: new Date(header.timestamp),
        updatedAt: new Date(header.timestamp),
    })

    await ctx.store.insert(preimage)

    const proposal = await ctx.store.get(Proposal, { where: { hash }, order: { createdAt: 'DESC' } })

    if (proposal && !proposal.preimage) {
        proposal.preimage = preimage
        await ctx.store.save(proposal)
    }

    await ctx.store.insert(
        new StatusHistory({
            id: randomUUID(),
            block: header.height,
            timestamp: new Date(header.timestamp),
            status: status,
            extrinsicIndex: data.extrinsicIndex,
            preimage: preimage,
        })
    )

    return preimage
}

export async function createPreimageV2( ctx: ProcessorContext<Store>, header: any, data: PreimageData): Promise<Preimage> {
    const { status, hash, proposer, call, section, method, deposit, length, extrinsicIndex } = data

    const id = await getPreimageId(ctx.store)

    const preimage = new Preimage({
        id,
        hash,
        proposer,
        status,
        proposedCall: call ? createProposedCall(call) : null,
        deposit,
        length,
        section: section,
        method: method,
        extrinsicIndex,
        createdAtBlock: header.height,
        createdAt: new Date(header.timestamp),
        updatedAt: new Date(header.timestamp),
    })

    await ctx.store.insert(preimage)

    await ctx.store.insert(
        new StatusHistory({
            id: randomUUID(),
            block: header.height,
            timestamp: new Date(header.timestamp),
            status: status,
            extrinsicIndex: data.extrinsicIndex,
            preimage,
        })
    )
    return preimage
}

export async function createReferendumV2( ctx: ProcessorContext<Store>, header: any, data: ReferendumDataV2, type: ProposalType): Promise<Proposal> {

    const { status, index, proposer, hash, tally, origin, trackNumber, submissionDeposit, submittedAt, enactmentAfter, enactmentAt, deciding, decisionDeposit } = data

    const id = await getProposalId(ctx.store, type)

    const preimage = await ctx.store.get(Preimage, {
        where: {
            hash: data.hash,
        },
        order: { createdAtBlock: 'DESC' },
    })

    const subDeposit = {who: submissionDeposit.who, amount: submissionDeposit.amount}

    let decDeposit = undefined

    if (decisionDeposit) {
        decDeposit = {who: decisionDeposit.who, amount: decisionDeposit.amount}
    }

    const proposal = new Proposal({
        id,
        index,
        type,
        hash,
        trackNumber,
        preimage: preimage,
        status,
        proposer,
        tally: tally ? createTally(tally) : undefined,
        origin,
        submissionDeposit: subDeposit ? createSubmissionDeposit(subDeposit) : undefined,
        submittedAtBlock: submittedAt,
        enactmentAfterBlock: enactmentAfter,
        enactmentAtBlock: enactmentAt,
        deciding: deciding ? createDeciding(deciding) : undefined,
        decisionDeposit: decDeposit ? createDecisionDeposit(decDeposit) : undefined,
        createdAtBlock: header.height,
        createdAt: new Date(header.timestamp),
        updatedAt: new Date(header.timestamp),
    })

    await ctx.store.insert(proposal)

    await ctx.store.insert(
        new StatusHistory({
            id: randomUUID(),
            block: proposal.createdAtBlock,
            timestamp: proposal.createdAt,
            status: proposal.status,
            extrinsicIndex: data.extrinsicIndex,
            proposal,
        })
    )

    await updateRedis(ctx, proposal)
    await sendNotification(ctx, proposal, 'newProposalCreated')
    
    return proposal
}

function createProposedCall(data: ProposedCallData): ProposedCall {
    return new ProposedCall(toJSON(data))
}

export function createTally(data: TallyData): Tally {
    return new Tally(toJSON(data))
}

export function createDeciding(data: DecidingData): Deciding {
    return new Deciding(toJSON(data))
}

export function createDecisionDeposit(data: DecisionDepositData): DecisionDeposit {
    return new DecisionDeposit(toJSON(data))
}

export function createSubmissionDeposit(data: SubmissionDepositData): SubmissionDeposit {
    return new SubmissionDeposit(toJSON(data))
}

export async function sendNotification(ctx: ProcessorContext<Store>, proposal: Proposal, trigger: String) {
    const { hash, type, index, proposer, curator, status, trackNumber } = proposal
    let statusName = null
    // if difference between proposal update time and current time > 10 mins return
    if(proposal.updatedAt && (new Date().getTime() - proposal.updatedAt.getTime()) > 600000){
        ctx.log.info(`Proposal ${index || hash} updated more than 10 mins ago, skipping notification`)
        return
    }

    if([ProposalStatus.Started, 
        ProposalStatus.Submitted, 
        ProposalStatus.Added, 
        ProposalStatus.Proposed, 
        ProposalStatus.Opened,
    ].includes(status)){
        statusName = 'submitted'
    }
    else if([ProposalStatus.Executed,
        ProposalStatus.Cancelled,
        ProposalStatus.Killed,
        ProposalStatus.Rejected,
        ProposalStatus.Executed,
        ProposalStatus.Closed,
        ProposalStatus.Approved,
        ProposalStatus.Disapproved,
        ProposalStatus.Awarded,
        ProposalStatus.Claimed,
        ProposalStatus.NotPassed,
        ProposalStatus.Passed,
        ProposalStatus.Tabled,
        ProposalStatus.Retracted,
        ProposalStatus.Slashed,
        ProposalStatus.TimedOut,
    ].includes(status)){
        statusName = 'closed'
    }
    else if([ProposalStatus.Deciding,
        ProposalStatus.ConfirmStarted,
        ProposalStatus.ConfirmAborted,
    ].includes(status)){
        statusName = 'voting'
    }

    const notification = {
        trigger: trigger,
        args : {
            network: config.chain.name,
            postType: type,
            postId: type != ProposalType.Tip ? String(index) : hash,
            proposerAddress: proposer || curator,
            statusType: statusName,
            track: String(trackNumber),
            statusName: status,
          }
    }

    if(!process.env.NOTIFICATION_API_KEY){
        ctx.log.error(`Notification Api Key not found`)
        return
    }

    ctx.log.info(`Sending notification with data ${JSON.stringify(notification)}`)

    const response = await fetch(NOTIFICATION_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': process.env.NOTIFICATION_API_KEY || '',
            'x-source': 'polkassembly'
        },
        body: JSON.stringify(notification),
    })

    ctx.log.info(`Notification response ${JSON.stringify(response)}`)

    if (response.status !== 200) {
        ctx.log.error(`Notification failed for proposal ${index || hash} with status ${response.status}`)
        return
    }
}

export async function updateRedis(ctx: ProcessorContext<Store>, proposal: Proposal){
    const { hash, type, index, proposer, curator, status, trackNumber } = proposal

    try{
        if ([ProposalType.ReferendumV2, ProposalType.FellowshipReferendum].includes(type)) {
            const redisData = {
                network: config.chain.name,
                govType: 'OpenGov',
                postId: index,
                track: trackNumber,
                proposalType: type,
            }
            ctx.log.info(`Redis call with data ${JSON.stringify(redisData)}`)

            const response = await fetch(REDIS_CF_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(redisData),
            })

            ctx.log.info(`Notification response ${JSON.stringify(response)}`)

            if (response.status !== 200) {
                ctx.log.error(`Redis call failed for proposal ${index || hash} with status ${response.status}`)
                return
            }
        }
    }
    catch(e){
        ctx.log.error(`Redis call failed for proposal ${index || hash} with error ${e}`)
        return
    }
}