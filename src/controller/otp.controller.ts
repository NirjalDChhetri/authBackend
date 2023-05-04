import { Request, Response, NextFunction } from 'express'
import OTPService  from '../services/otp.service';

class OtpController {
    async verifyOtp ( req: Request, res: Response, next: NextFunction){
        const verify = await OTPService.find(req.body)
        verify.user.isVerified = true
        verify.status = false
        //await verify.user.save()
        await verify.save()
        res.status(200).json({
            success: true,
            message: " User Verified"
        })
    }
}
 export default new OtpController()