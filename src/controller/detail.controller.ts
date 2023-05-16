import { Request, Response, NextFunction } from 'express'
import { CreateUserDetailsDTO } from '../dtos/user.dot'
import { UserService } from '../services/user.service'
import detailService from '../services/detail.service'
import mediaService from '../services/media.service'
import userController from './user.controller'


class UserDetailsController {
    constructor (private userService = new UserService) {}

    async createUserDetails ( req: Request, res: Response) {
        const data = req.body as CreateUserDetailsDTO
        const user = await this.userService.getUser(req.user?.id)
        const media = await mediaService.uploadFile(data.profilePicture)
        await detailService.createDetails(user, media, data)
    }
}

export default new UserDetailsController();