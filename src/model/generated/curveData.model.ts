import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, Index as Index_, ManyToOne as ManyToOne_} from "typeorm"
import * as marshal from "./marshal"
import {Proposal} from "./proposal.model"

@Entity_()
export class CurveData {
    constructor(props?: Partial<CurveData>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @Column_("int4", {nullable: false})
    block!: number

    @Index_()
    @ManyToOne_(() => Proposal, {nullable: true})
    proposal!: Proposal

    @Index_()
    @Column_("int4", {nullable: false})
    index!: number

    @Column_("text", {nullable: true})
    extrinsicIndex!: string | undefined | null

    @Index_()
    @Column_("timestamp with time zone", {nullable: false})
    timestamp!: Date

    @Index_()
    @Column_("numeric", {transformer: marshal.floatTransformer, nullable: true})
    approvalPercent!: number | undefined | null

    @Index_()
    @Column_("numeric", {transformer: marshal.floatTransformer, nullable: true})
    supportPercent!: number | undefined | null
}
