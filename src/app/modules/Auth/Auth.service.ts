import httpStatus from "http-status"
import config from "../../config"
import AppError from "../../errors/AppError"
import { User } from "../User/User.model"
import { TLoginUser, TRegisterUser } from "./Auth.interface"
import { createToken } from "./Auth.utils"

const loginService=async(payload:TLoginUser)=>{
    const result=await User.findOne({email:payload.email})
    if(result){
        console.log(result)
        if(result.password==payload.password){
            const jwtPayload = {
                email: result.email,
                role: result.role,
              };
            
              const accessToken = createToken(
                jwtPayload,
                config.jwt_access_secret as string,
                config.jwt_access_expires_in as string,
              );
            
              return {
                accessToken,
              }
            
        }
        else{
            throw new AppError(httpStatus.FORBIDDEN,"Password Doesn't matched")
        }
    }else{
        throw new AppError(httpStatus.NOT_FOUND,"User not found")

    }
   
    
}
const RegisterUserService=async(payload:TRegisterUser)=>{
    const user = await User.isUserExistsByEmail(payload.email);

  if (user) {
    throw new AppError(httpStatus.BAD_REQUEST,'User already Created!')
  }
 
  const isBlocked= user?.isBlocked  ;

  if (isBlocked) {
    throw new AppError(httpStatus.BAD_REQUEST,'This user is blocked !');
   
}
const newData={
    ...payload,
    role:"User"
}


const newUser = await User.create(newData);
console.log(newUser)
return newUser

 

}
export const AuthServices={
    loginService,
    RegisterUserService
}