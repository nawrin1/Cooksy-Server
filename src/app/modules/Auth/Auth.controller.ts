import { NextFunction, Request, Response } from "express"
import { AuthServices } from "./Auth.service"
import httpStatus from 'http-status';
import sendResponse from "../../utils/SendResponse";
import config from "../../config";

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

export const AuthControllers={
    loginUser,
    RegisterUser
}