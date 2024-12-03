import mongoose from 'mongoose';
import config from '../../config';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import User from './user.model';
import { generatedStudentId } from './user.utils';
import AppError from '../../errors/AppError';

const createStudentInDB = async (password: string, student: TStudent) => {
  const user: Partial<TUser> = {};

  const admissionSemester = await AcademicSemester.findById(
    student.admissionSemester,
  );

  user.password = password || config.default_pass;
  user.role = 'student';
  user.status = 'in-progress';

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    user.id = await generatedStudentId(admissionSemester);

    const newUser = await User.create([user], { session });

    if (!newUser.length) {
      throw new AppError(400, 'Failed to create user');
    }

    student.id = newUser[0].id;
    student.user = newUser[0]._id;

    const newStudent = await Student.create([student], { session });
    if (!newStudent.length) {
      throw new AppError(400, 'Failed to create student');
    }

    await session.commitTransaction();
    await session.endSession();
    return newStudent;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error('Failed to create student');
  }
};

export const UserService = {
  createStudentInDB,
};
