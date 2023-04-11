import { Column, Entity } from "typeorm";
import { CommonField } from "./commonEntity";

@Entity({
    name:"contact"
})
 export class Contact extends CommonField{
    @Column({
        name: 'name'
    })
    name: string;

    @Column({
        name: 'email'
    })
    email: string;

    @Column({
        name: 'phone_number'
    })
    phoneNumber: string

    @Column({
        name: 'message'
    })
    message: string
}