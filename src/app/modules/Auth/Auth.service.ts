import httpStatus from "http-status"
import config from "../../config"

import { User } from "../User/User.model"
import { TLoginUser, TRegisterUser } from "./Auth.interface"
import { createToken } from "./Auth.utils"
import AppError from "../../errors/AppError"
import { sendEmail } from "../../utils/sendEmail"


const loginService=async(payload:any)=>{
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

    // console.log("inside service")
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



const forgetPassword = async (useremail: string) => {
  
  const result = await User.isUserExistsByEmail(useremail);

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }
  

  // checking if the user is blocked
  const userStatus = result?.isBlocked;

  if (userStatus) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked !!');
  }

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

  const resetToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    "60m",
  );

  const resetUILink=`${config.reset_pass_ui_link}?email=${result.email}&token=${resetToken}`
  // console.log(resetUILink)

  sendEmail(result.email,resetUILink)

 
};
const forgetPasswordNewDB = async (userData: {email:string,newPassword:string}) => {
  
  const result = await User.isUserExistsByEmail(userData?.email);

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }
  

  // checking if the user is blocked
  const userStatus = result?.isBlocked;

  if (userStatus) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked !!');
  }

  await User.updateOne(
    { email: userData.email }, 
    { $set: { password: userData.newPassword } } 
  );

  return { message: 'Password updated successfully' };


 


  

 
};
const followDB = async (followData:any) => {
  console.log("follow")
  
  try {
    
  
    const updateCurrentUser = await User.findByIdAndUpdate(
        followData.currentUser,
        { $addToSet: { following: followData.followedUser} },  
        { new: true }
    );

  
    const updateFollowedUser = await User.findByIdAndUpdate(
      followData.followedUser,
        { $addToSet: { follower: followData.currentUser } },  
        { new: true }
    );

  

    return {
        following: updateCurrentUser?.following,
        followers: updateFollowedUser?.follower,
    };

} catch (error) {
    
    throw new AppError(httpStatus.BAD_REQUEST,"Follower updated failed");
}


 


  

 
};



const resetPasswordDB = async (resetData: any) => {
  console.log(resetData,"rese pass")
  

  try {
    
    const updatePassword = await User.findByIdAndUpdate(
      resetData.user,
      { $set: { password: resetData.password } }, 
     
    );

 
    return updatePassword
  } catch (error) {
    throw new AppError(httpStatus.BAD_REQUEST, "Password reset failed");
  }
};
const unfollowDB = async (followData: any) => {
  console.log("unfollow");

  try {
    
    const updateCurrentUser = await User.findByIdAndUpdate(
      followData.currentUser,
      { $pull: { following: followData.followedUser } }, 
      { new: true }
    );

 
    const updateFollowedUser = await User.findByIdAndUpdate(
      followData.followedUser,
      { $pull: { follower: followData.currentUser } }, 
      { new: true }
    );

    return {
      following: updateCurrentUser?.following,
      followers: updateFollowedUser?.follower,
    };
  } catch (error) {
    throw new AppError(httpStatus.BAD_REQUEST, "Follower update failed");
  }
};

const editProfileDB = async (profileData: any) => {
  console.log(profileData,"edit profile")
  

  try {
    
    const updateProfile = await User.findByIdAndUpdate(
      profileData.id,
      {
        $set: {
          name: profileData?.name,
          password: profileData?.password,
          bio: profileData?.bio,
          image: profileData?.image,
          email: profileData?.email,
        },
      },
      { new: true } 
    );
    
 
    return updateProfile
  } catch (error) {
    throw new AppError(httpStatus.BAD_REQUEST, "Profile edited failed");
  }
};
 

 

export const AuthServices={
    loginService,
    RegisterUserService,
    forgetPassword,
    forgetPasswordNewDB,
    followDB,
    unfollowDB,
    resetPasswordDB,
    editProfileDB
}