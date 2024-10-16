import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { Recipe } from "./Recipe.model";
import { User } from "../User/User.model";

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
      Recipe.find().populate('user') .populate({
        path: 'comments',
        populate: { path: 'user' }  
      })
    
  
      // console.log(result,"from recipe")
  
    return result;
  };

  const getRecipeFromDB = async (recipeId: string) => {
    console.log(recipeId,"from single recipe")
    const result = await Recipe.findById(recipeId)
      .populate('user')
      .populate({
        path: 'comments',
        populate: { path: 'user' }  
      })

      console.log(result,"from singlr recipe")
    
      
    return result;
  };
  
  const commentDeleteFromDB = async (commentId: string) => {
    try {
      
      const result = await Recipe.findOneAndUpdate(
        { 'comments._id': commentId }, 
        { $pull: { comments: { _id: commentId } } }, 
        { new: true }
      );
  
      if (!result) {
        return { message: "Recipe or comment not found" };
      }
  
      return { message: "Comment deleted successfully", recipe: result };
    } catch (error) {
      console.error("Error deleting comment:", error);
      return { message: "Error deleting comment", error };
    }
  };
  const commentEditFromDB = async (commentInfo:any) => {
    try {
      
      const result = await Recipe.findOneAndUpdate(
        { 'comments._id': commentInfo.commentId }, 
        { $set: { 'comments.$.comment': commentInfo.newComment } },
        { new: true }
      );
  
      if (!result) {
        return { message: "Recipe or comment not found" };
      }
  
      return { message: "Comment deleted successfully", recipe: result };
    } catch (error) {
      console.error("Error deleting comment:", error);
      return { message: "Error deleting comment", error };
    }
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
  


  const commentRecipeFromDB = async (commentData:any) => {
    console.log("comment")
    
    try {
      
    
      const addComment = await Recipe.findByIdAndUpdate(
          commentData.recipe,
          { $addToSet: { comments:  {user:commentData.user,comment:commentData.comment}} },  
          { new: true }
      );
  
    

    
  
      return addComment
  
  } catch (error) {
      
      throw new AppError(httpStatus.BAD_REQUEST,"Comment added failed");
  }
}
  const rateRecipeFromDB = async (rateData:any) => {
    console.log(rateData,"rate")
    
    try {
      
    
      const addRate = await Recipe.findByIdAndUpdate(
          rateData.id,
          { $push: { rating:  rateData.rate} },  
          { new: true }
      );

      return addRate
  
  } catch (error) {
      
      throw new AppError(httpStatus.BAD_REQUEST,"Rate added failed");
  }
}






const getMyRecipeFromDB = async (id:any) => {

  try {
    
    const user = await Recipe.find({
      user: id,
     
    })
      

    return user
  } catch (error) {
    console.error("Error fetching my recipe:", error);
    throw new Error("Could not fetch my recipe.");
  }

  };
const deleteMyRecipeFromDB = async (id:any) => {
  console.log(id,"del recipe")

  try {
    
    const recipe = await Recipe.findOneAndDelete({
      _id: id.id,
     
    })
      

    return recipe
  } catch (error) {
    console.error("Error deleting my recipe:", error);
    throw new Error("Could not delete my recipe.");
  }

  };

  

  export const RecipeServices = {
    createRecipeIntoDB,
    getAllRecipeFromDB,
    getRecipeFromDB,
    voteRecipeFromDB,
    commentRecipeFromDB,
    commentDeleteFromDB,
    commentEditFromDB,
    rateRecipeFromDB,
    getMyRecipeFromDB,
    deleteMyRecipeFromDB
  
  };
  