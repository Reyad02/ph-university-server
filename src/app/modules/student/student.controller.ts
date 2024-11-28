import { Request, Response } from 'express';
import { StudentServices } from './student.service';

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentFromDB();
    res.status(200).json({
      success: true,
      message: 'Successfully get all students',
      data: result,
    });
  } catch (err: any) {
    res.status(200).json({
      success: false,
      message: 'Getting some error',
      err,
    });
  }
};

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await StudentServices.getSingleStudentFromDB(id);
    res.status(200).json({
      success: true,
      message: 'Successfully get the students',
      data: result,
    });
  } catch (err: any) {
    res.status(200).json({
      success: false,
      message: 'Getting some error',
      err,
    });
  }
};

const deleteStudent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await StudentServices.deleteStudentFromDB(id);
    res.status(200).json({
      success: true,
      message: 'Successfully delete the students',
      data: result,
    });
  } catch (err: any) {
    res.status(200).json({
      success: false,
      message: 'Getting some error',
      err,
    });
  }
};

export const StudentController = {
  getAllStudents,
  getSingleStudent,
  deleteStudent,
};
