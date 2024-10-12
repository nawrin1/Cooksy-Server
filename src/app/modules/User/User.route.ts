import express from 'express';

import validateRequest from '../../middlewares/validateRequest';
import { UserControllers } from './User.controller';


const router=express.Router()

router.get("/checkFollow",UserControllers.checkFollow)
router.get("/getMe/:id",UserControllers.getMe)


export const UserRoutes=router;