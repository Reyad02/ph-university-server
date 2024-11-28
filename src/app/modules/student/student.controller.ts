import { NextFunction, Request, Response } from 'express';
import { StudentServices } from './student.service';
import sendResponse from '../../utils/sendResponse';

const getAllStudents = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await StudentServices.getAllStudentFromDB();

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Successfully get all students',
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

const getSingleStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const result = await StudentServices.getSingleStudentFromDB(id);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Successfully get the student',
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

const deleteStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const result = await StudentServices.deleteStudentFromDB(id);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Successfully delete the students',
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

export const StudentController = {
  getAllStudents,
  getSingleStudent,
  deleteStudent,
};
