import { Column, Entity } from 'typeorm'
import { CommonField } from './commonEntity';


@Entity({
    name: 'category'
})

export class BlogCategory extends CommonField {
    @Column({
        name: 'title',
        unique: true
    })
    title: string
}