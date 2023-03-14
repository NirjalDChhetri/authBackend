import { Request, Response, NextFunction } from "express";
import { SignupDTO } from "../dtos/user.dot";
import { UserService } from "../services/user.service";
import { JwtUtil } from "../utils/jwt.util";

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
    console.log(user);
    res.status(200).json({
      status: true,
      data: {
        user,
      },
      message: "Login successfully",
    });
    return user
  }
}

export default new UserController();
