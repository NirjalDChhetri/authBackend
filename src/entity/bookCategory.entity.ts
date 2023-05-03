import { Column, Entity } from 'typeorm'
import { CommonField } from './commonEntity';


@Entity({
    name: 'bookcategory'
})

export class BookCategory extends CommonField {
    @Column({
        name: 'title',
        unique: true
    })
    title: string
}