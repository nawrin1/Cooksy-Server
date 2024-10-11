import { Types } from "mongoose";

export interface IRecipe  {
    title: string;
    description: string;
    rating: string;
    tags: [string];
    time: string;
    user: string;
    vote:number;
    comments:[{
      user:Types.ObjectId,
      comment:string

    }]
      
    images: string[];
  }



  export interface IComment {
    user: Types.ObjectId; 
    comment: string;       
  }