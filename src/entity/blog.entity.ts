import { Column, Entity } from "typeorm";
import { CommonField } from "./commonEntity";


@Entity({
    name: 'blog'
})

class Blog extends CommonField {
    @Column({
        name: 'title'
    })
    title: string

    @Column()
    description: string
}