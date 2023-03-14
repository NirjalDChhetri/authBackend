import { Entity, Column, JoinColumn, ManyToOne } from "typeorm";
import { CommonField } from "./commonEntity";
import { User } from "./user.entity";


@Entity()

class Token extends CommonField {

    @ManyToOne(() => User, (user) => user.token, { nullable: true})
    @JoinColumn({ name: 'user_id'})
    user : User
   
    @Column({
        type: 'text'
    })
    token: string

}
 export default Token