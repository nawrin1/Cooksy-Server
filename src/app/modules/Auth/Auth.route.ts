import express from 'express';
import { AuthControllers } from './Auth.controller';
const router=express.Router()

router.post("/login",AuthControllers.loginUser)
router.post("/register",AuthControllers.RegisterUser)

export const AuthRoutes=router;