import { Request, Response } from 'express';
import { StudentServices } from './student.service';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';

const getAllStudents = catchAsync(async (req: Request, res: Response) => {
  const result = await StudentServices.getAllStudentFromDB();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Successfully get all students',
    data: result,
  });
});

const getSingleStudent = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await StudentServices.getSingleStudentFromDB(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Successfully get the student',
    data: result,
  });
});

const deleteStudent = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await StudentServices.deleteStudentFromDB(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Successfully delete the students',
    data: result,
  });
});

export const StudentController = {
  getAllStudents,
  getSingleStudent,
  deleteStudent,
};
