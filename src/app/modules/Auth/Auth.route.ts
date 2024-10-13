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
    '/reset-password',

    AuthControllers.resetPassword,
  );
router.patch(
    '/edit-profile',

    AuthControllers.editProfile,
  );
router.patch(
    '/forget-password-new',
    auth(USER_ROLE.User),
    validateRequest(AuthValidation.forgetPasswordNewValidationSchema),
    AuthControllers.forgetPasswordNew,
  );
router.patch(
    '/follow',
    auth(USER_ROLE.User),
    
    AuthControllers.follow,
  );
router.patch(
    '/unfollow',
    auth(USER_ROLE.User),
    
    AuthControllers.unfollow,
  );

export const AuthRoutes=router;