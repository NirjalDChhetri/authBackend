import { Request, Response, NextFunction } from 'express'
import { CreateUserDetailsDTO } from '../dtos/user.dot'
import { UserService } from '../services/user.service'


class UserDetailsController {
    constructor (private userService = new UserService) {}

    async CreateUserDetails ( req: Request, res: Response) {
        const data = req.body as CreateUserDetailsDTO
        const user = await this.userService.getUser(req.user?.id)
    }
}