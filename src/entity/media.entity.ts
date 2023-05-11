import { AfterLoad, Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { CommonField } from "./commonEntity";
import { MediaType } from "../constants/enum";
import { UserDetails } from "./user.detail.entity";

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

  path: string;
  @AfterLoad()
  async loadImagePath() {
    this.path = `/${this.type}/${this.name}`;
  }
}
