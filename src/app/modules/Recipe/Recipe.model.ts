import { Schema, model } from "mongoose";
import { IComment, IRecipe } from "./Recipe.interface";


const commentSchema = new Schema<IComment>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',               
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
});
const recipeSchema = new Schema<IRecipe>(
    {
      title: {
        type: String,
        required: true,
        
      },
      description: {             
        type: String,
        required: true,
        
      },
      user: {
        type: String,
        ref: 'User',
        required: true,
        
      },
      images: {
        type: [String],
        required:true
      },

      rating:{
        type:String,
        required:true
      },
      

      time: {
        type: String,
       
      },
      tags: {
        type: [String],
       
      },
      vote:{
        type:Number
      },
      comments: [commentSchema], 
    },
    {
      timestamps: true,
    },
  );




  
  export const Recipe = model<IRecipe>('Recipe', recipeSchema);

