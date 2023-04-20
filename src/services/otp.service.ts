import { AppDataSource } from "../config/database.config";
import { Otp } from "../entity/otp.entity";
import { User } from "../entity/user.entity";

export class OtpService {
  find: any;
  constructor(private otpRepository = AppDataSource.getRepository(Otp)) {}
  async create(user: User) {
    const newOtp = new Otp();
    newOtp.code = this.generateCode();
    newOtp.expiresIn = new Date(Date.now() + 1000 * 60 * 20)
    if (user) {
        newOtp.user = user
    }
    return await this.otpRepository.save(newOtp)
  }

  generateCode() {
    return Math.floor(100000 + Math.random() * 900000);
  }
}

