import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany } from "typeorm";
import { CommonField } from "./commonEntity";
import { User } from "./user.entity";
import { BookCategory } from "./bookCategory.entity";
import { Media } from "./media.entity";


@Entity({
    name: 'book'
})

 export class Book extends CommonField {
    @Column({
        name: 'book_name'
    })
    name: string

    @Column({
        name: 'author_name'
    })
    author: string

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

    @ManyToMany(() => BookCategory, (category)=>category.books, {
        cascade: true,
    })
    @JoinTable({
        name: 'book_categories'
    })
    categories: BookCategory[]

    @OneToMany(() => Media, (media) => media.books)
    images: Media[]

}