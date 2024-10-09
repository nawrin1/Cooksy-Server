import { Router } from "express";
import { AuthRoutes } from "../modules/Auth/Auth.route";
import { RecipeRoutes } from "../modules/Recipe/Recipe.router";

const router=Router()

const moduleRoutes=[
    {
        path:'/auth',
        routes:AuthRoutes
    },{
        path:'/recipes',
        routes:RecipeRoutes
    }
]

moduleRoutes.forEach((route)=>router.use(route.path,route.routes))

export default router;