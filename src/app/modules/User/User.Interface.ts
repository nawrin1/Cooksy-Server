import { Model } from "mongoose";

export type TUser={
    name:string;
    email:string;
    password:string;
    image:string;
    role:string;
    bio:string;
    isBlocked:boolean;
    isPremium:boolean;
    follower:string[];
    following:string[];
}

export interface UserModel extends Model<TUser> {
   
    isUserExistsByEmail(email: string): Promise<TUser>;
    
  }
  