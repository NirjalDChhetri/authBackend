import { Column, Entity, ManyToMany } from 'typeorm'
import { CommonField } from './commonEntity';
import { Book } from './book.entity';


@Entity({
    name: 'bookcategory'
})

export class BookCategory extends CommonField {
    @Column({
        name: 'title',
        unique: true
    })
    title: string

    @ManyToMany(() => Book, (book) => book.categories)
    books: Book[]
}