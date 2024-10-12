import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/SendResponse";
import { RecipeServices } from "./Recipe.service";

const createRecipe = catchAsync(async (req, res) => {
    if (!req.files) {
      throw new AppError(400, 'Please upload an image');
    }
  
    const item = await RecipeServices.createRecipeIntoDB(
      req.body,
      req.files as any
    );
  
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Recipe posted successfully',
      data: item,
    });
  });



  const getAllRecipe= catchAsync(async (req, res) => {
    const item = await RecipeServices.getAllRecipeFromDB(req.query);
  
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Recipes retrieved successfully',
      data: item,
    });
  });
  

  const getRecipe = catchAsync(async (req, res) => {
    // console.log("inside single")
    const recipeId = req.params.id;
    console.log(recipeId,"from single")
    const item = await RecipeServices.getRecipeFromDB(recipeId);
    console.log(item)
  
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Single Recipe retrieved successfully',
      data: item,
    });
  });
  const voteRecipe = catchAsync(async (req, res) => {
    // console.log("inside single")
    const recipeInfo = req.body
    const item = await RecipeServices.voteRecipeFromDB(recipeInfo);
    // console.log(item)
  
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Vote done successfully',
      data: item,
    });
  });
  const commentRecipe = catchAsync(async (req, res) => {
  
    const commentInfo = req.body
    const item = await RecipeServices.commentRecipeFromDB(commentInfo);
    // console.log(item)
  
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Comment done successfully',
      data: item,
    });
  });
  const commentDelete = catchAsync(async (req, res) => {
  
    const {commentId} = req.body
    // console.log(req.body)
    const item = await RecipeServices.commentDeleteFromDB(commentId);
    // console.log(item)
  
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Comment deleted successfully',
      data: item,
    });
  });
  const commentEdit = catchAsync(async (req, res) => {
  
    const commentInfo = req.body
    console.log(req.body)
    const item = await RecipeServices.commentEditFromDB(commentInfo);
    // console.log(item)
  
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Comment edit successfully',
      data: item,
    });
  });
  const rate = catchAsync(async (req, res) => {
  
    const rateInfo = req.body
    console.log(req.body)
    const item = await RecipeServices. rateRecipeFromDB(rateInfo);
    // console.log(item)
  
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Rated successfully',
      data: item,
    });
  });

  export const RecipeControllers = {
   
    createRecipe,
    getAllRecipe,
    getRecipe,
    voteRecipe,
    commentRecipe,
    commentDelete,
    commentEdit,
    rate
  };
  
  