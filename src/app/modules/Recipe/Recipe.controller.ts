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


  export const RecipeControllers = {
   
    createRecipe
  };
  
  