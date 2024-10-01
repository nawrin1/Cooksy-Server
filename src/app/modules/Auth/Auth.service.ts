import config from "../../config"
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
            throw new Error("Password Doesn't matched")
        }
    }else{
        throw new Error("User dont exist")

    }
   
    
}
const RegisterUserService=async(payload:TRegisterUser)=>{
    const user = await User.isUserExistsByEmail(payload.email);

  if (user) {
    throw new Error('User already Created!');
  }
 
  const isBlocked= user?.isBlocked ;

  if (isBlocked) {
    throw new Error( 'This user is blocked !');
   
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