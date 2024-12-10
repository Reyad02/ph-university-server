import mongoose from 'mongoose';
import QueryBuilders from '../../builder/QueryBilders';
import AppError from '../../errors/AppError';
import User from '../user/user.model';
import { FacultySearchableFields } from './faculty.constant';
import { TFcaulty } from './faculty.interface';
import { Faculty } from './faculty.model';
import status from 'http-status';

const getAllFacultiesFromDB = async (query: Record<string, unknown>) => {
  const facultyQuery = new QueryBuilders(
    Faculty.find().populate('academicDepartment'),
    query,
  )
    .search(FacultySearchableFields)
    .filter()
    .sort()
    .pagination()
    .fields();
  const result = await facultyQuery.modelQuery;
  return result;
};

const getSingleFacultyFromDB = async (id: string) => {
  const result = await Faculty.findById(id).populate('academicDepartment');
  return result;
};

const updateFacultyIntoDB = async (id: string, payload: Partial<TFcaulty>) => {
  const { name, ...remainingData } = payload;

  const modifiedData: Record<string, unknown> = {
    ...remainingData,
  };

  if (name && Object.keys(name).length > 0) {
    for (const [key, value] of Object.entries(name)) {
      modifiedData[`name.${key}`] = value;
    }
  }

  const result = await Faculty.findByIdAndUpdate(id, modifiedData, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteFacultyFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const deleteFaculty = await Faculty.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session },
    );
    if (!deleteFaculty) {
      throw new AppError(status.BAD_REQUEST, 'Failed to delete');
    }

    const userId = deleteFaculty.user;

    const deletedUser = await User.findByIdAndUpdate(
      userId,
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedUser) {
      throw new AppError(status.BAD_REQUEST, 'Failed to delete');
    }

    await session.commitTransaction();
    await session.endSession();
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

export const FacultyServices = {
  getAllFacultiesFromDB,
  getSingleFacultyFromDB,
  updateFacultyIntoDB,
  deleteFacultyFromDB,
};
