import { AppDataSource } from "../config/database.config";
import Token from "../entity/token.entity";
import { User } from "../entity/user.entity";

export class TokenService {
    constructor(private tokenRepository = AppDataSource.getRepository(Token)){}
    create ( userToken: string, expireAt: Date, user: User ) {
    const token = new Token()
    token.token = userToken
    if ( user instanceof User) {
        token.user = user
    }
    token.expiresAt = expireAt
    return this.tokenRepository.save(token)
    }
}
