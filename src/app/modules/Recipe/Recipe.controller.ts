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
    console.log("inside single")
    const recipeId = req.params.id;
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

  export const RecipeControllers = {
   
    createRecipe,
    getAllRecipe,
    getRecipe,
    voteRecipe
  };
  
  