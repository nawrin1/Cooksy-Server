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
      tag: {
        type: String,
       
      },
    },
    {
      timestamps: true,
    },
  );




  
  export const Recipe = model<IRecipe>('Recipe', recipeSchema);

