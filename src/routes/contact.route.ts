import { Router } from "express";
import contactController from "../controller/contact.controller";
import { catchAsync } from "../utils/catchAsync";
import Validator from "../middlewares/validator.middleware";
import { ContactDTO } from "../dtos/contact.dot";

const router = Router()

router.post('/login', Validator.validate(ContactDTO), catchAsync(contactController.createContact.bind(contactController)))