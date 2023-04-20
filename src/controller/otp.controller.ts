import { Request, Response, NextFunction } from 'express'
import { OtpService } from '../services/otp.service';

class OtpController {
    constructor(private otpService = new OtpService()){}

    async verifyOtp ( req: Request, res: Response, next: NextFunction){
        const verify = await this.otpService.find(req.body)
        verify.user.isVerified = true
        verify.status = false
        await verify.user.save()
        await verify.save()
    }
}