import {ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface, } from "class-validator";
import { PASSWORD_REGEX } from "../constants/regex";
import Message from "./messages";

@ValidatorConstraint({ name: "isStrongPassword", async: true })
export class IsStrongPassword implements ValidatorConstraintInterface {
  async validate(text: string, arg: ValidationArguments) {
    return PASSWORD_REGEX.test(text);
  }
  defaultMessage(args: ValidationArguments) {
    return Message.passwordStrength;
  }
}
