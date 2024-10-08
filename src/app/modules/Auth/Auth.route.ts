import express from 'express';
import { AuthControllers } from './Auth.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AuthValidation } from './Auth.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../../constant';
const router=express.Router()

router.post("/login",validateRequest(AuthValidation.loginValidation),AuthControllers.loginUser)
router.post("/register",validateRequest(AuthValidation.registerValidation),AuthControllers.RegisterUser)
router.post(
    '/forget-password',
    validateRequest(AuthValidation.forgetPasswordValidationSchema),
    AuthControllers.forgetPassword,
  );
router.patch(
    '/forget-password-new',
    auth(USER_ROLE.User),
    validateRequest(AuthValidation.forgetPasswordNewValidationSchema),
    AuthControllers.forgetPasswordNew,
  );

export const AuthRoutes=router;