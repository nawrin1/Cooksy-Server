/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { ZodError, ZodIssue } from 'zod';
import { TErrorSources } from '../interface/error';
import config from '../config';
import handleZodError from '../errors/handleZodError';
import handleValidationError from '../errors/handleValidationError';
import handleCastError from '../errors/handleCastError';

import AppError from '../errors/AppError';
import handleDuplicateError from '../errors/handleDplicateError';

const globalErrorHandler:ErrorRequestHandler = (
  err,
  req,
  res,
  next,
) => {
  //setting default values
  console.log(err)
  let statusCode = err.statusCode||500;
  let message = err.message || 'Something went wrong!';

  let errorSources: TErrorSources = [
    {
      path: '',
      message: 'Something went wrong',
    },
  ];


 if(err instanceof ZodError){
  console.log("zod")
  
  const simplifiedError=handleZodError(err)
  statusCode = simplifiedError?.statusCode;
  message = simplifiedError?.message;
  errorSources = simplifiedError?.errorSources;

 }else if (err?.name === 'ValidationError') {
  console.log("validation")
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
} else if (err.constructor.name === 'AppError') {
  console.log("app")
  statusCode = err?.statusCode;
  message = err.message;
  errorSources = [
    {
      path: '',
      message: err?.message,
    },
  ];
} else if (err instanceof Error) {
  console.log("err")
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
    // error: err,
  });
};

export default globalErrorHandler;

