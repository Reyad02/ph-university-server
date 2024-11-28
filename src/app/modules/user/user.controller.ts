import { Request, Response } from 'express';
import userValidation from './user.validation';
import { UserService } from './user.service';

const createStudent = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const parsedData = userValidation.parse(data);
    const result = await UserService.createStudentInDB(parsedData);
    res.status(200).json({
      success: true,
      message: 'User created successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(200).json({
      success: false,
      message: 'Getting some error',
      err
    });
  }
};

export const UserController = {
  createStudent,
};
