import { AppDataSource } from "../config/database.config";
import { Contact } from "../entity/contact.entity";

export interface IContact {
  name: string;
  email: string;
  phoneNumber: string;
  message: string;
}

export class ContactService {
  constructor(private contactRepository = AppDataSource.getRepository(Contact)) {}
  
    async create(contact: IContact): Promise<Contact> {
    const newcontact = await this.contactRepository.save(contact);
    return newcontact;
  }
}
