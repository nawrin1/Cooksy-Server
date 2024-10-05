import express from 'express';
import { AuthControllers } from './Auth.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AuthValidation } from './Auth.validation';
const router=express.Router()

router.post("/login",validateRequest(AuthValidation.loginValidation),AuthControllers.loginUser)
router.post("/register",validateRequest(AuthValidation.registerValidation),AuthControllers.RegisterUser)

export const AuthRoutes=router;