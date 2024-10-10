import { Recipe } from "./Recipe.model";

const createRecipeIntoDB = async (payload: any, images: any) => {

    const { file } = images;

    console.log(images)
    payload.images = file.map((image:any) => image.path);

    console.log(payload)
    const tag=payload.tags.split(",")
    const newData={...payload,tags:tag}
    // console.log(newData)

  
    const result = await Recipe.create(newData);
  
    // await addDocumentToIndex(result, 'items');
    return result;
  };


  const getAllRecipeFromDB = async (query: Record<string, unknown>) => {
   
  
    const result= 
      Recipe.find().populate('user')
    
  
 
  
    return result;
  };

  const getRecipeFromDB = async (recipeId: string) => {
    const result = await Recipe.findById(recipeId)
      .populate('user')
      
    return result;
  };
  
  const voteRecipeFromDB = async (recipeInfo: {recipe:string,vote:number}) => {
    console.log(recipeInfo)
    try {
      // Use $inc to increment the vote count by recipeInfo.vote
      const updatedRecipe = await Recipe.findByIdAndUpdate(
        recipeInfo.recipe,
        { $inc: { vote: recipeInfo.vote } },
        
      );
  
      if (!updatedRecipe) {
        throw new Error('Recipe not found');
      }
  
      return updatedRecipe;
    } catch (error) {
      console.error('Error updating votes:', error);
      throw error;
    }
  };
  
  

  export const RecipeServices = {
    createRecipeIntoDB,
    getAllRecipeFromDB,
    getRecipeFromDB,
    voteRecipeFromDB
  
  };
  