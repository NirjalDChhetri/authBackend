import { Request, Response, NextFunction } from "express";
import { ChangePasswordDTO, ForgetPasswordDTO } from "../dtos/login.dto";
import { User } from "../entity/user.entity";
import { UserService } from "../services/user.service";
import Message from "../customs/messages";
import emailUtil from "../utils/email.util";
import OTPService from "../services/otp.service";
import { CreateUserDetailsDTO } from "../dtos/user.dot";

class UserController {
  constructor(
    private userService = new UserService(),
    private otpService = new OTPService()
  ) {}

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
      const user = await this.userService.signup(data);
      let otp = await this.otpService.create(user);
      emailUtil.sendOtp(otp.code, user.email, user.id, otp.expiresIn, true);
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
    const usertoken = await this.userService.login(data);
    res.status(200).json({
      status: true,
      data: {
        usertoken,
      },
      message: "Login successfully",
    });
    return usertoken;
  }

  async changePassword(req: Request, res: Response, next: NextFunction) {
    const data = req.body as ChangePasswordDTO;
    const user = req.user as User;
    await this.userService.changePassword(data, user);
    res.status(200).json({
      success: true,
      data: {
        user,
      },
      message: Message["updatePassword"],
    });
  }

  async forgetPassword( req: Request, res: Response ) {
    const data = req.body as ForgetPasswordDTO
    await this.userService.forgetPassword(data)
  }
}

export default new UserController();
