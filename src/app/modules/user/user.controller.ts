import { Request, RequestHandler, Response } from 'express';
import { UserService } from './user.service';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import httpStatus from 'http-status';

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

const createFaculty: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { password, faculty } = req.body;
    const result = await UserService.createFacultyIntoDB(password, faculty);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Faculty created successfully',
      data: result,
    });
  },
);

const createAdmin: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { password, admin } = req.body;
    const result = await UserService.createAdminIntoDB(password, admin);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Admin created successfully',
      data: result,
    });
  },
);

const getMe: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { userId, role } = req.user;
    const result = await UserService.getMe(userId, role);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'User retrieved successfully',
      data: result,
    });
  },
);

const changeStatus = catchAsync(async (req, res) => {
  const id = req.params.id;

  const result = await UserService.changeStatus(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Status is updated successfully',
    data: result,
  });
});

export const UserController = {
  createStudent,
  createFaculty,
  createAdmin,
  getMe,
  changeStatus
};
