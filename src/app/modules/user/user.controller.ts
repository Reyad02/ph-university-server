import { NextFunction, Request, Response } from 'express';
import { UserService } from './user.service';
import sendResponse from '../../utils/sendResponse';

const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // const data = req.body;
    // const parsedData = userValidation.parse(data);
    const { password, student } = req.body;
    const result = await UserService.createStudentInDB(password, student);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'User created successfully',
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

export const UserController = {
  createStudent,
};
