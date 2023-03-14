import { ClassConstructor, plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { Request, Response, NextFunction } from "express";
import HttpException from "../utils/HttpException";

export default class Validator {
  static validate = <T extends object>(classInstance: ClassConstructor<T>) => {
    return async (req: Request, res: Response, next: NextFunction) => {
      //Convert body to class Inastance
      const convertedObject = plainToClass(classInstance, req.body);

      //Validate the class instance
      let validationMessages: string[] = [];
      const error = await validate(convertedObject, {
        whitelist: true,
        forbidNonWhitelisted: true,
      });

      if (error.length !== 0) {
        // *Sanitize the error
        error.forEach((err) => {
          console.log(err);
          console.log(err.children);
          if (!err.constraints && err.children) {
            if (!err.children[0].constraints) return;
            validationMessages.push(
              err.children[0].constraints[
                Object.keys(err.children[0].constraints)[0]
              ]
            );
          } else {
            if (!err.constraints) return;
            validationMessages.push(
              err.constraints[Object.keys(err.constraints)[0]]
            );
          }
        });
        // Always send first validation message to the frontend
        next(HttpException.forbidden(validationMessages[0]));
      }
      next();
    };
  };
}
