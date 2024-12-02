import { Request, RequestHandler, Response } from 'express';
import { UserService } from './user.service';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';

const createStudent: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
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
  },
);

export const UserController = {
  createStudent,
};
