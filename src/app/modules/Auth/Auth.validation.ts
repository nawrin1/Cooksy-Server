import { z } from "zod";

const loginValidation=z.object({
    body:z.object({
        email:z.string({required_error:"Email is required",invalid_type_error:"Email must be a string"}),
        password:z.string({required_error:"Password is required"})
    })
})
const registerValidation=z.object({
    body:z.object({
        email:z.string({required_error:"Email is required",invalid_type_error:"Email must be a string"}),
        password:z.string({required_error:"Password is required"}),
        name:z.string({required_error:"Name is required",invalid_type_error:"Name must be a string"}),
        bio:z.string({required_error:"Bio is required"}),
        image:z.string({required_error:"Image is required"})

    })
})




export const AuthValidation={
    loginValidation,
    registerValidation
}