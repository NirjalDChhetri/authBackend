import { MoreThan } from "typeorm";
import { AppDataSource } from "../config/database.config";
import { OtpDTO } from "../dtos/otp.dto";
import { Otp } from "../entity/otp.entity";
import { User } from "../entity/user.entity";
import HttpException from "../utils/HttpException";
import messages from "../customs/messages";

class OTPService {
  constructor(private otpRepository = AppDataSource.getRepository(Otp)) {}
  async create(user: User) {
    const newOtp = new Otp();
    newOtp.code = this.generateCode();
    newOtp.expiresIn = new Date(Date.now() + 1000 * 60 * 20);
    if (user) {
      newOtp.user = user;
    }
    return await this.otpRepository.save(newOtp);
  }

  generateCode() {
    return Math.floor(100000 + Math.random() * 900000);
  }

  async find(otp: OtpDTO) {
    const data = await this.otpRepository.findOne({
      where: {
        code: otp.code,
        expiresIn: MoreThan(new Date(Date.now())),
        status: true,
      },
      relations: ["user"],
    });
    if (!data || !data.user) {
      throw HttpException.badRequest(messages["invalidOtp"]);
    }
    return data;
  }
}

export default new OTPService();
