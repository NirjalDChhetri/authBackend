import { AfterLoad, Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { CommonField } from "./commonEntity";
import { MediaType } from "../constants/enum";
import { UserDetails } from "./user.detail.entity";
import { Book } from "./book.entity";

@Entity({
  name: "media",
})
export class Media extends CommonField {
  @Column({
    name: "media",
  })
  name: string;

  @Column({
    name: "mime_type",
  })
  mimType: string;

  @Column({
    name: "type",
    type: "enum",
    enum: MediaType,
  })
  type: MediaType;

  @OneToOne(() => UserDetails, (userDetails) => userDetails.profilePicture)
  userDetails: UserDetails;

  @ManyToOne(() => Book, (book) => book.images, { nullable: true, onDelete:'CASCADE'})
  @JoinColumn({ name: 'book_id'})
  books: Book

  path: string;
  @AfterLoad()
  async loadImagePath() {
    this.path = `/${this.type}/${this.name}`;
  }
}
