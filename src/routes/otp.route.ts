import { Router } from 'express'
import Validator from '../middlewares/validator.middleware'
import { OtpDTO } from '../dtos/otp.dto'
import { catchAsync } from '../utils/catchAsync'
import otpController from '../controller/otp.controller'



const router = Router()

router.post('/verify', Validator.validate(OtpDTO), catchAsync(otpController.verifyOtp))

export default router;