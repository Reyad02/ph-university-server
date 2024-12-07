import { ErrorRequestHandler } from 'express';
import { TErrorSource } from '../interface/error';
import { ZodError } from 'zod';
import handleZodError from '../errors/handleZodError';
import config from '../config';
import handleValidationError from '../errors/handleValidationError';
import AppError from '../errors/AppError';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode: number = 500;
  let message: string = 'Something Went Wrong';

  let errorSource: TErrorSource = [
    {
      path: '',
      message: 'Something Went Wrong',
    },
  ];

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError.status;
    errorSource = simplifiedError.errorObj;
    message = simplifiedError.errorMsgs;
  } else if (err?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(err);
    statusCode = simplifiedError.status;
    errorSource = simplifiedError.errorObj;
    message = simplifiedError.errorMsgs;
  } else if (err instanceof AppError) {
    statusCode = err?.statusCode;
    errorSource = [
      {
        path: '',
        message: err?.message,
      },
    ];
    message = err.message;
  } else if (err instanceof Error) {
    message = err?.message;
    errorSource = [
      {
        path: '',
        message: err?.message,
      },
    ];
  }

  res.status(statusCode).json({
    success: false,
    message: message || err.message,
    // error: err,
    errorSource,
    stack: config.node_env === 'development' ? err?.stack : '',
  });
};

export default globalErrorHandler;
