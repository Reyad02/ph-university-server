import { ErrorRequestHandler } from 'express';
import { TErrorSource } from '../interface/error';
import { ZodError } from 'zod';
import handleZodError from '../errors/handleZodError';
import config from '../config';

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
