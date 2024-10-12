import { Router } from "express";
import { AuthRoutes } from "../modules/Auth/Auth.route";
import { RecipeRoutes } from "../modules/Recipe/Recipe.router";
import { UserRoutes } from "../modules/User/User.route";
import { PaymentRoutes } from "../modules/Payment/Payment.routes";

const router=Router()

const moduleRoutes=[
    {
        path:'/auth',
        routes:AuthRoutes
    },{
        path:'/recipes',
        routes:RecipeRoutes
    }
    ,{
        path:'/user',
        routes:UserRoutes
    },{
        path:'/',
        routes:PaymentRoutes
    }
]

moduleRoutes.forEach((route)=>router.use(route.path,route.routes))

export default router;