import { Column, Entity } from "typeorm";
import { CommonField } from "./commonEntity";


@Entity({
    name: 'book'
})

 export class Book extends CommonField {
    @Column({
        name: 'bookname'
    })
    bookname: string

    @Column({
        name: 'description'
    })
    description: string

    @Column({
        name: 'status',
        default: false
    })
    status: boolean

    @Column({
        name: 'genre',
        type: 'simple-json',
        nullable: true
    })
    genre: object
}