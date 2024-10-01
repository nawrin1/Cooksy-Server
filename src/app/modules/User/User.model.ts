import { Schema, model } from "mongoose";
import { TUser, UserModel } from "./User.Interface";


const userSchema = new Schema<TUser,UserModel>(
    {
      name: {
        type: String,
        required: true,
        
      },
      email: {             
        type: String,
        required: true,
        unique:true,
      },
      password: {
        type: String,
        required: true,
        
      },
      image: {
        type: String,
        required:true
      },
      role: {
        type: String,
        enum:['Admin','User']
        
      },
      bio:{
        type:String,
        required:true
      },
      
      follower:{
        type:[String],
      },
      following:{
        type:[String]
      },
      isBlocked: {
        type: Boolean,
        default: false,
      },
      isPremium: {
        type: Boolean,
        default: false,
      },
    },
    {
      timestamps: true,
    },
  );



  userSchema.statics.isUserExistsByEmail = async function (id: string) {
    return await User.findOne({ id })
  };



  
  export const User = model<TUser,UserModel>('User', userSchema);

