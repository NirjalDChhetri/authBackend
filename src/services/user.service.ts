import { AppDataSource } from "../config/database.config";
import Message from "../customs/messages";
import {
  ChangePasswordDTO,
  ForgetPasswordDTO,
  LoginDTO,
  ResetPasswordDTO,
} from "../dtos/login.dto";
import { SignupDTO } from "../dtos/user.dot";
import { User } from "../entity/user.entity";
import BcryptUtils from "../utils/bcrypt.util";
import { JwtUtil } from "../utils/jwt.util";
import HttpException from "../utils/HttpException";
import RandomGenerator from "../utils/random.util";
import sendMail from "../utils/email.util";

export class UserService {
  constructor(private userRepository = AppDataSource.getRepository(User)) {}

  async getAll() {
    const user = await this.userRepository.find();
    return user;
  }

  async create(data: SignupDTO): Promise<User> {
    try {
      let user = new User();
      (user.username = data.userName),
        (user.email = data.email),
        (user.password = data.password);
      const userData = await this.userRepository.save(user);
      if (!userData) throw new Error("user not saved");
      return userData;
    } catch (error) {
      console.log(error);
    }
  }

  async login(data: LoginDTO) {
    const { email, password } = data;
    let user = await this.userRepository.findOne({
      where: {
        email,
      },
      select: ["email", "password"],
    });
    if (user != null) {
      const compare = await BcryptUtils.compare(password, user.password);
      if (compare) {
        const token = JwtUtil.sign(
          { id: user.id },
          process.env.ACCESS_TOKEN_SECRET!,
          process.env.ACCESS_TOKEN_EXPIRES_IN!
        );
        return token;
      } else {
        throw HttpException.badRequest(Message["invalidAuth"]);
      }
    } else {
      throw HttpException.badRequest(Message["invalidAuth"]);
    }
  }

  async changePassword(data: ChangePasswordDTO, user: User) {
    const { newPassword, oldPassword } = data;
    console.log(user);

    const findUser = await this.userRepository.findOne({
      select: {
        password: true,
        username: true,
        email: true,
        id: true,
      },
      where: {
        id: user.id,
      },
    });

    if (!findUser) {
      throw HttpException.notFound(Message["invalidPassword"]);
    }
    const isCorrectPassword = await BcryptUtils.compare(
      oldPassword,
      findUser.password
    );
    if (!isCorrectPassword) {
      throw HttpException.badRequest(Message["invalidRequest"]);
    }
    findUser.password = await BcryptUtils.hash(newPassword);
    await this.userRepository.save(findUser);
    return findUser;
  }

  async forgetPassword(data: ForgetPasswordDTO) {
    const { email } = data;
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      throw HttpException.badRequest(Message["invalidEmail"]);
    }
    const token = RandomGenerator.generateRandomNumber();
    const tokenWithExpiration = RandomGenerator.hashWithExpiration(token);
    try {
      const fullUrl = `https//localhost:8000/forget-password?token=${tokenWithExpiration}`;
      sendMail({
        to: email,
        subject: "Reset Password",
        html: `<h1>Reset Password</h1>,
        <p>Click on the link below to reset the Password</p>
        <P>${token}</p>`,
        from: "Nirjald3@gmail.com",
        text: " Reset Password",
      });
      console.log(fullUrl, token);
    } catch (error) {
      throw HttpException.internalServerError("Error Sending mail");
    }
    return {
      hashedToken: tokenWithExpiration,
      email,
    };
  }

  async resetPassword(data: ResetPasswordDTO) {
    const { password, hashedToken } = data;
    const tokenWithExpiration = hashedToken.split(".");
    const tokenHash = tokenWithExpiration[0];
    const expiration = tokenWithExpiration[1];

    const isTokenExpired = RandomGenerator.isTokenExpires(expiration);
    if (isTokenExpired) {
      throw HttpException.badRequest(Message["invalidToken"]);
    }

    const newToken = RandomGenerator.hash(tokenHash);
    if (tokenHash !== newToken) {
      throw HttpException.badRequest(Message["invalidToken"]);
    }

    const user = await this.userRepository.findOne({
      where: {
        email: data.email,
      },
    });
    if (!user) {
      throw HttpException.notFound(Message["invalidEmail"]);
    }
    user.password = await BcryptUtils.hash(password);
    this.userRepository.save(user);
    return user;
  }
}
