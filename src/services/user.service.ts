import { AppDataSource } from "../config/database.config";
import Message from "../customs/messages";
import { LoginDTO } from "../dtos/login.dto";
import { SignupDTO } from "../dtos/user.dot";
import { User } from "../entity/user.entity";
import BcryptUtils from "../utils/bcrypt.util";
import { JwtUtil } from "../utils/jwt.util";
import HttpException from "../utils/HttpException";

export class UserService {
  constructor(private userRepository = AppDataSource.getRepository(User)) {}

  async getAll() {
    const user = await this.userRepository.find();
    return user;
  }

  async create(data: SignupDTO): Promise<User> {
    try {
      let user = new User();
      (user.username = data.username),
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
    console.log(data);

    const { email, password } = data;
    let user = await this.userRepository.findOne({
      where: {
        email,
      },
      select:["email","password"]
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
}
