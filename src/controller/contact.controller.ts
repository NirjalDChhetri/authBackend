import { Request, Response, NextFunction } from "express";
import { ContactService } from "../services/contact.service";

class ContactController {
  constructor(private contactService = new ContactService()) {}

  createContact(req: Request, res: Response, next: NextFunction) {
    const contact = req.body;
    const userContact = this.contactService.create(contact);
    res.status(200).json({
      status: "success",
      data: {
        contact,
      },
      message: "User successfully created",
    });
    return userContact;
  }
}

export default new ContactController();
