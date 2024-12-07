import { ZodError, ZodIssue } from 'zod';
import { TGenericErrorReturn } from '../interface/error';

const handleZodError = (err: ZodError): TGenericErrorReturn => {
  const status = 500;
  const errorObj = err?.issues.map((issue: ZodIssue) => ({
    path: issue?.path[issue?.path.length - 1],
    message: issue?.message,
  }));
  const errorMsgs = err?.issues
    .map((issue: ZodIssue) => issue.message)
    .join(', ');

  return {
    status,
    errorObj,
    errorMsgs,
  };
};

export default handleZodError;
