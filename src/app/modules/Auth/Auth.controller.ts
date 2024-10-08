import { NextFunction, Request, Response } from "express"
import { AuthServices } from "./Auth.service"
import httpStatus from 'http-status';
import sendResponse from "../../utils/SendResponse";
import config from "../../config";
import catchAsync from "../../utils/catchAsync";

const loginUser=async(req:Request,res:Response,next:NextFunction)=>{
    // console.log("in login controller")
try{
  const result=await AuthServices.loginService(req.body)
  const {  accessToken } = result;


  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is logged in succesfully!',
    data: {
      accessToken,
     
    },
  });
}catch(err){
  next(err)
}
}
const RegisterUser=async(req:Request,res:Response,next:NextFunction)=>{
    console.log("in register controller")
    try{
    const result=await AuthServices.RegisterUserService(req.body)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User is created succesfully!',
        data: result,
      });
    }catch(err){
      next(err)
    }
}



const forgetPassword = catchAsync(async (req, res,next) => {
try{
  const useremail= req.body.email;
  const result = await AuthServices.forgetPassword(useremail);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Reset link is generated succesfully!',
    data: result,
  });
}catch(err){
  next(err)
}
});
const forgetPasswordNew = catchAsync(async (req, res,next) => {
try{
  const userData= req.body;
  const result = await AuthServices.forgetPasswordNewDB(userData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password Updated Successfully!',
    data: result,
  });
}catch(err){
  next(err)
}
});

export const AuthControllers={
    loginUser,
    RegisterUser,
    forgetPassword,
    forgetPasswordNew
}