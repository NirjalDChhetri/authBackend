import { Request, Response, NextFunction } from "express";
import { ChangePasswordDTO, ForgetPasswordDTO, ResetPasswordDTO } from "../dtos/login.dto";
import { User } from "../entity/user.entity";
import { UserService } from "../services/user.service";
import Message from '../customs/messages'
import otpService from "../services/otp.service";
import emailUtil from "../utils/email.util";

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
      let otp = await otpService.create(user)
      emailUtil.sendOtp(otp.code, user.email, user.id, otp.expiresIn, true)
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
      data:{
          user,
      },
      message: Message['updatePassword']
    })
  }

}

export default new UserController();
