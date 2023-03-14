import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface, } from "class-validator";
import { AppDataSource } from "../config/database.config";
import { User } from "../entity/user.entity";
import Message from './messages'


@ValidatorConstraint({ name:'isEmailExist', async:true})

export class IsEmailExist implements ValidatorConstraintInterface{
    async validate(email:string, _arg: ValidationArguments){
        const user = await AppDataSource.getRepository(User).findOne({
            where:{
                email,
            }
        })
        if(!user){
            return true
        }
        return false
    }
    
  defaultMessage(_args: ValidationArguments) {
    // here you can provide default error message if validation failed
    return Message.invalidAuth
}
}

