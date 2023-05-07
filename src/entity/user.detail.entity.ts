import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { CommonField } from "./commonEntity";
import { Gender } from '../constants/enum';
import { Media } from './media.entity';


@Entity({
    name: 'user_details'
})

export class UserDetails extends CommonField {
    @Column({
        name:'firstName'
    })
    firstName: string

    @Column({
        name: 'middleName'
    })
    middleName?: string

    @Column({
    name: 'lastName'
    })
    lastName: string

    @Column({
        name: 'date_of_birth'
    })
    dateOfBirth: Date

    @Column({
        name: 'address'
    })
    address: string

    @Column({
        name: 'contact_number'
    })
    phoneNumber: string

    @Column({
        name: 'gender',
        enum: Gender
    })
    gender: Gender

    @OneToOne(()=> Media)
    @JoinColumn({ name: 'profile_picture'})
    profilePicture: Media

}