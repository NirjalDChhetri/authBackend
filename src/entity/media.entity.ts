import { AfterLoad, Column, Entity } from "typeorm";
import { CommonField } from "./commonEntity";
import { MediaType } from "../constants/enum";


@Entity({
    name: 'media'
})

export class Media extends CommonField {
    @Column({
        name: 'media'
    })
    name:  string

    @Column({
        name: 'mime_type'
    })
    mimType: string

    @Column({
        name: 'type',
        type: 'enum',
        enum: MediaType
    })
    type: MediaType



    path: string
    @AfterLoad()
    async loadImagePath() {
      this.path = `/${this.type}/${this.name}`
    }

}