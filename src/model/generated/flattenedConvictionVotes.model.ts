import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, Index as Index_, ManyToOne as ManyToOne_} from "typeorm"
import * as marshal from "./marshal"
import {ConvictionVote} from "./convictionVote.model"
import {Proposal} from "./proposal.model"
import {VoteDecision} from "./_voteDecision"
import {VoteBalance, fromJsonVoteBalance} from "./_voteBalance"
import {VoteType} from "./_voteType"

@Entity_()
export class FlattenedConvictionVotes {
    constructor(props?: Partial<FlattenedConvictionVotes>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @Column_("text", {nullable: true})
    voter!: string | undefined | null

    @Index_()
    @ManyToOne_(() => ConvictionVote, {nullable: true})
    parentVote!: ConvictionVote | undefined | null

    @Column_("bool", {nullable: true})
    isDelegated!: boolean | undefined | null

    @Index_()
    @Column_("text", {nullable: true})
    delegatedTo!: string | undefined | null

    @Index_()
    @Column_("int4", {nullable: false})
    proposalIndex!: number

    @Index_()
    @ManyToOne_(() => Proposal, {nullable: true})
    proposal!: Proposal

    @Column_("int4", {nullable: false})
    createdAtBlock!: number

    @Index_()
    @Column_("int4", {nullable: true})
    removedAtBlock!: number | undefined | null

    @Column_("timestamp with time zone", {nullable: false})
    createdAt!: Date

    @Column_("timestamp with time zone", {nullable: true})
    removedAt!: Date | undefined | null

    @Index_()
    @Column_("varchar", {length: 12, nullable: false})
    decision!: VoteDecision

    @Column_("jsonb", {transformer: {to: obj => obj.toJSON(), from: obj => obj == null ? undefined : fromJsonVoteBalance(obj)}, nullable: false})
    balance!: VoteBalance

    @Column_("int4", {nullable: true})
    lockPeriod!: number | undefined | null

    @Column_("varchar", {length: 17, nullable: false})
    type!: VoteType
}
