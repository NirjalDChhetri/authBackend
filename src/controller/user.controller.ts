import { Request, Response, NextFunction } from "express";
import { ChangePasswordDTO, ForgetPasswordDTO, ResetPasswordDTO } from "../dtos/login.dto";
import { User } from "../entity/user.entity";
import { UserService } from "../services/user.service";
import Message from '../customs/messages'

class UserController {
  constructor(private userService = new UserService()) {}

  async getAll(req: Request, res: Response, next: NextFunction) {
    const user = await this.userService.getAll();
    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  }

  async signup(req: Request, res: Response, next: NextFunction) {
    const data = req.body;
    try {
      const user = await this.userService.create(data);
      res.status(200).json({
        status: "success",
        data: {
          user,
        },
        message: "User successfully created",
      });
    } catch (err) {
      console.log(err);
    }
  }

  async Userlogin(req: Request, res: Response, next: NextFunction) {
    const data = req.body;
    const user = await this.userService.login(data);
    res.status(200).json({
      status: true,
      data: {
        user,
      },
      message: "Login successfully",
    });
    return user
  }

  async changePassword(req: Request, res: Response, next:NextFunction){
    const data = req.body as ChangePasswordDTO
    const user = req.user as User
    await this.userService.changePassword(data, user)
    res.status(200).json({
      success: true,
      message: Message['updatePassword']
    })
  }

  async forgetPassword(req: Request, res: Response, next: NextFunction){
    const data = req.body as ForgetPasswordDTO
    const user = await this.userService.forgetPassword(data)
    res.status(200).json({
      success: true,
      where: {
        user,
      },
      message: Message["Password Updated"]
    })
  }

  async resetPassword(req: Request, res: Response, next: NextFunction){
    const data = req.body as ResetPasswordDTO
    const user = await this.userService.resetPassword(data)
    res.status(200).json({
      success: true,
      where:{
        user,
      },
      message: Message['updatePassword']
    })
  }
}

export default new UserController();
