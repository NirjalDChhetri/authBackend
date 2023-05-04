import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, ManyToOne } from "typeorm";
import { CommonField } from "./commonEntity";
import { User } from "./user.entity";



@Entity({
    name: "otp_detail"
})

export class Otp extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({
        name: 'code'
    })
    code: number

    @Column({
        name: 'expireS_in'
    })
    expiresIn: Date

    @Column({
        default: true
    })
    status: boolean

    @CreateDateColumn({
        name: 'created_at'
    })
    createdAt: Date

    @UpdateDateColumn({
        name: 'updated_at'
    })
    updatedAt: Date

    @ManyToOne(() => User, (user) => user.otp, {
    })
    user: User

}