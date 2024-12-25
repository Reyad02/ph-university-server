import mongoose from 'mongoose';
import config from '../../config';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import User from './user.model';
import {
  generateAdminID,
  generatedStudentId,
  generateFacultyID,
} from './user.utils';
import AppError from '../../errors/AppError';
import { TFcaulty } from '../faculty/faculty.interface';
import { Faculty } from '../faculty/faculty.model';
import { TAdmin } from '../admin/admin.interface';
import { Admin } from '../admin/admin.model';

const createStudentInDB = async (password: string, student: TStudent) => {
  const user: Partial<TUser> = {};

  const admissionSemester = await AcademicSemester.findById(
    student.admissionSemester,
  );

  user.password = password || config.default_pass;
  user.role = 'student';
  user.status = 'in-progress';
  user.email = student?.email;

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

const createFacultyIntoDB = async (password: string, payload: TFcaulty) => {
  const user: Partial<TUser> = {};

  user.password = password || config.default_pass;
  user.role = 'faculty';
  user.status = 'in-progress';
  user.email = payload?.email;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    user.id = await generateFacultyID();

    const newUser = await User.create([user], { session });

    if (!newUser.length) {
      throw new AppError(400, 'Failed to create Faculty');
    }

    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    const newFaculty = await Faculty.create([payload], { session });
    if (!newFaculty.length) {
      throw new AppError(400, 'Failed to create Faculty');
    }

    await session.commitTransaction();
    await session.endSession();
    return newFaculty;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error('Failed to create Faculty');
  }
};

const createAdminIntoDB = async (password: string, payload: TAdmin) => {
  const user: Partial<TUser> = {};

  user.password = password || config.default_pass;
  user.role = 'admin';
  user.status = 'in-progress';
  user.email = payload?.email;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    user.id = await generateAdminID();

    const newUser = await User.create([user], { session });

    if (!newUser.length) {
      throw new AppError(400, 'Failed to create admin');
    }

    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    const newAdmin = await Admin.create([payload], { session });
    if (!newAdmin.length) {
      throw new AppError(400, 'Failed to create admin');
    }

    await session.commitTransaction();
    await session.endSession();
    return newAdmin;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error('Failed to create admin');
  }
};

const getMe = async (userId: string, role: string) => {
  // const decoded = verifyToken(token, config.jwt_access_secret as string);
  // const { userId, role } = decoded;

  let result = null;
  if (role === 'student') {
    result = await Student.findOne({ id: userId }).populate('user');
  }
  if (role === 'admin') {
    result = await Admin.findOne({ id: userId }).populate('user');
  }
  if (role === 'faculty') {
    result = await Faculty.findOne({ id: userId }).populate('user');
  }

  return result;
};

export const UserService = {
  createStudentInDB,
  createFacultyIntoDB,
  createAdminIntoDB,
  getMe,
};
