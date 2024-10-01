import { Router } from "express";
import { AuthRoutes } from "../modules/Auth/Auth.route";

const router=Router()

const moduleRoutes=[
    {
        path:'/auth',
        routes:AuthRoutes
    }
]

moduleRoutes.forEach((route)=>router.use(route.path,route.routes))

export default router;