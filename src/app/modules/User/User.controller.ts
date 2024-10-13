import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/SendResponse";
import { UserServices } from "./User.service";

const checkFollow = catchAsync(async (req, res,next) => {
    try{
      const followData= req.query;
      // console.log(followData,"from user service")
     
      const result = await UserServices.followDB(followData);
      console.log(result,"controller")
    
      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Checking done Successfully!',
        data: result,
      });
    }catch(err){
      next(err)
    }
    });

const getMe = catchAsync(async (req, res,next) => {
    try{
      const {id}= req.params;
      // console.log(id,"from user service")
     
      const result = await UserServices.getMeFromDB(id);
      // console.log(result,"controller")
    
      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'My info retrived Successfully!',
        data: result,
      });
    }catch(err){
      next(err)
    }
    });

    export const UserControllers = {
        checkFollow,
        getMe
   
       
      };
      
      