import { TGenericErrorReturn } from '../interface/error';
import mongoose from 'mongoose';

const handleValidationError = (
  err: mongoose.Error.ValidationError,
): TGenericErrorReturn => {
  const status = 500;
  const errorObj = Object.values(err?.errors).map(
    (issue: mongoose.Error.ValidatorError | mongoose.Error.CastError) => ({
      path: issue?.path,
      message: issue?.message,
    }),
  );

  const errorMsgs = Object.values(err?.errors)
    .map(
      (issue: mongoose.Error.ValidatorError | mongoose.Error.CastError) =>
        issue.message,
    )
    .join(', ');

  return {
    status,
    errorObj,
    errorMsgs,
  };
};

export default handleValidationError;
