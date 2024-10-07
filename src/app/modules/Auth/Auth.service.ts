import httpStatus from "http-status"
import config from "../../config"

import { User } from "../User/User.model"
import { TLoginUser, TRegisterUser } from "./Auth.interface"
import { createToken } from "./Auth.utils"
import AppError from "../../errors/AppError"

const loginService=async(payload:TLoginUser)=>{
    // const result=await User.findOne({email:payload.email})
    // console.log(result)
    // if(!result){
    //   console.log("entered")
    //   throw new AppError(httpStatus.NOT_FOUND,"User not found")

    // }
    // else{
    //     // console.log(result)
    //     if(result.password==payload.password){
    //         const jwtPayload = {
    //             email: result.email,
    //             role: result.role,
    //             image:result.image,
    //             name:result.name,
    //             _id:result._id,
    //             password:result.password,
    //             bio:result.bio,
    //             follower: result.follower,
    //             following: result.following,
    //             isBlocked: result.isBlocked,
    //             isPremium: result.isPremium,
    //           };
            
    //           const accessToken = createToken(
    //             jwtPayload,
    //             config.jwt_access_secret as string,
    //             config.jwt_access_expires_in as string,
    //           );
            
    //           return {
    //             accessToken
    //           }
            
    //     }
    //     else{
    //         throw new AppError(httpStatus.FORBIDDEN,"Password Doesn't matched")
    //     }
    // }
    const result = await User.isUserExistsByEmail(payload.email);

    if (!result) {
      throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
    }
    
  
    const isDeleted = result?.isBlocked;
  
    if (isDeleted) {
      throw new AppError(httpStatus.FORBIDDEN, 'This user is Blocked !');
    }
  
   

 
  
    if (payload?.password!== result?.password)
      throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');
  
   
  
    const jwtPayload = {
                   email: result.email,
                  role: result.role,
                  image:result.image,
                   name:result.name,
                   _id:result._id,
                  password:result.password,
                  bio:result.bio,
                  follower: result.follower,
                   following: result.following,
                   isBlocked: result.isBlocked,
                   isPremium: result.isPremium,
                 };
  
    const accessToken = createToken(
      jwtPayload,
      config.jwt_access_secret as string,
      config.jwt_access_expires_in as string,
    );
  
 
  
    return {
      accessToken,
      
    };
    
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