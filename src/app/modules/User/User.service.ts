import { User } from "./User.model";

const followDB = async (followInfo:any) => {
    // console.log(followInfo)
    
      
   
    const { currentUser, followedUser } = followInfo
    
    // console.log(currentUser, followedUser);

  try {
    
    const user = await User.findOne({
      _id: currentUser,
      following: followedUser,
    });
     
    
 
    return user ? true : false;
  } catch (error) {
    console.error("Error checking follow status:", error);
    throw new Error("Could not check follow status.");
  }

  };

  export const UserServices = {
   followDB
  
  };
  