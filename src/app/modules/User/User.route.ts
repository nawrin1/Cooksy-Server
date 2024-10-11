import express from 'express';

import validateRequest from '../../middlewares/validateRequest';
import { UserControllers } from './User.controller';


const router=express.Router()

router.get("/checkFollow",UserControllers.checkFollow)


export const UserRoutes=router;