import { Router } from 'express'
import UserController from '../controller/user.controller'
import { ChangePasswordDTO, ForgetPasswordDTO, LoginDTO } from '../dtos/login.dto';
import { SignupDTO } from '../dtos/user.dot';
import authentication from '../middlewares/authentication.middleware'
import Validator from '../middlewares/validator.middleware';
import { catchAsync } from '../utils/catchAsync';

const router = Router()

router.get('/', UserController.getAll.bind(UserController));

router.post("/signup", Validator.validate(SignupDTO), catchAsync(UserController.signup.bind(UserController)))

router.post('/login', Validator.validate(LoginDTO), catchAsync(UserController.Userlogin.bind(UserController)))

router.post("/change-password", authentication,Validator.validate(ChangePasswordDTO), catchAsync(UserController.changePassword.bind(UserController)))

router.post("/forget-password", Validator.validate(ForgetPasswordDTO), catchAsync(UserController.forgetPassword.bind(UserController)))

export default router;