import { Request, Response } from "express"
import { AuthServices } from "./Auth.service"
import httpStatus from 'http-status';
import sendResponse from "../../utils/SendResponse";
import config from "../../config";

const loginUser=async(req:Request,res:Response)=>{
    console.log("in login controller")
    const result=await AuthServices.loginService(req.body)
    const {  accessToken } = result;

    // res.cookie('refreshToken', refreshToken, {
    //   secure: config.NODE_ENV === 'production',
    //   httpOnly: true,
    //   sameSite: 'none',
    //   maxAge: 1000 * 60 * 60 * 24 * 365,
    // });
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User is logged in succesfully!',
      data: {
        accessToken,
       
      },
    });
}
const RegisterUser=async(req:Request,res:Response)=>{
    console.log("in register controller")
    const result=await AuthServices.RegisterUserService(req.body)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User is created succesfully!',
        data: result,
      });
}

export const AuthControllers={
    loginUser,
    RegisterUser
}