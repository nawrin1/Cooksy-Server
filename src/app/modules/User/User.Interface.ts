import { Model, Types } from "mongoose";

export type TUser={
    _id?:Types.ObjectId;
    name:string;
    email:string;
    password:string;
    image:string;
    role:string;
    bio:string;
    isBlocked:boolean;
    isPremium:boolean;
    follower:Types.ObjectId[];
    following:Types.ObjectId[];
}

export interface UserModel extends Model<TUser> {
   
    isUserExistsByEmail(email: string): Promise<TUser>;
    
  }
  