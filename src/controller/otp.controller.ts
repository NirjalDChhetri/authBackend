import { Request, Response, NextFunction } from "express";
import OTPService from "../services/otp.service";
import { AppDataSource } from "../config/database.config";
import { User } from "../entity/user.entity";

class OtpController {
  constructor(
    private OtpService = new OTPService(),
    private userRepository = AppDataSource.getRepository(User)
  ) {}

  async verifyOtp(req: Request, res: Response) {
    const number = req.body;
    const verify = await this.OtpService.find(number);
    verify.user.isVerified = true;
    verify.status = false;
    await this.userRepository.save(verify.user);
    await verify.save();
    res.status(200).json({
      success: true,
      message: " User Verified",
    });
  }
}
export default new OtpController();
