/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { ZodError, ZodIssue } from 'zod';
import config from '../config';
import handleZodError from '../errors/handleZodError';
import handleValidationError from '../errors/handleValidationError';
import handleCastError from '../errors/handleCastError';
import handleDuplicateError from '../errors/handleDplicateError';
import AppError from '../errors/AppError';
import { TErrorSources } from '../interface/error';


const globalErrorHandler:ErrorRequestHandler = (
  err,
  req,
  res,
  next
) => {
  //setting default values

  console.log(err)
  let statusCode = err?.statusCode||500;
  let message = err?.message || 'Something went wrong!';

  let errorSources = [
    {
      path: '',
      message: 'Something went wrong',
    },
  ];


 if(err instanceof ZodError){
    
  const simplifiedError=handleZodError(err)
  statusCode = simplifiedError?.statusCode;
  message = simplifiedError?.message;
  errorSources = simplifiedError?.errorSources as TErrorSources;

 }else if (err?.name === 'ValidationError') {
  const simplifiedError = handleValidationError(err);
  statusCode = simplifiedError?.statusCode;
  message = simplifiedError?.message;
  errorSources = simplifiedError?.errorSources;
 }else if (err?.name === 'CastError') {
  const simplifiedError = handleCastError(err);
  statusCode = simplifiedError?.statusCode;
  message = simplifiedError?.message;
  errorSources = simplifiedError?.errorSources;
 }else if (err?.code === 11000) {
  const simplifiedError = handleDuplicateError(err);
  statusCode = simplifiedError?.statusCode;
  message = simplifiedError?.message;
  errorSources = simplifiedError?.errorSources;
} else if (err instanceof AppError) {
  statusCode = err?.statusCode;
  message = err.message;
  errorSources = [
    {
      path: '',
      message: err?.message,
    },
  ];
} else if (err instanceof Error) {
  message = err.message;
  errorSources = [
    {
      path: '',
      message: err?.message,
    },
  ];
}




  
  res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    err,
    stack: config.NODE_ENV === 'development' ? err?.stack : null,
    
  });
};

export default globalErrorHandler;
