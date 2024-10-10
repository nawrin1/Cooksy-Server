import { Schema, model } from "mongoose";



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
      }
    },
    {
      timestamps: true,
    },
  );




  
  export const Recipe = model<IRecipe>('Recipe', recipeSchema);

