import mongoose from 'mongoose';
import { Student } from './student.model';
import AppError from '../../errors/AppError';
import User from '../user/user.model';
import { TStudent } from './student.interface';
import { searchableFields } from './student.constant';
import QueryBuilders from '../../builder/QueryBilders';

const getAllStudentFromDB = async (query: Record<string, unknown>) => {
  // const filterObj = { ...query };
  // let searchTerm = '';
  // if (query?.searchTerm) {
  //   searchTerm = query?.searchTerm as string;
  // }

  // // const searchQuery = searchableFields.map((field) => ({
  // //   [field]: searchTerm,
  // // }));

  // const searchQuery = Student.find({
  //   $or: searchableFields.map((field) => ({
  //     [field]: { $regex: searchTerm, $options: 'i' },
  //   })),
  // });

  // const excludeFields = ['searchTerm', 'sort', 'page', 'fields'];
  // excludeFields.map((item) => delete filterObj[item]);

  // const filterQuery = searchQuery
  //   .find(filterObj)
  //   .populate({
  //     path: 'academicDepartment',
  //     populate: { path: 'academicFaculty' },
  //   })
  //   .populate('admissionSemester');

  // let sortedQuery = '-createdAt';
  // if (query.sort) {
  //   sortedQuery = query?.sort as string;
  // }
  // const sortQuery = filterQuery.sort(sortedQuery);

  // let page = 1;
  // const limit = 2;
  // let skip = 0; /// (page-1)*limit

  // // if (query?.limit) {
  // //   limit = Number(query.limit);
  // // }

  // if (query?.page) {
  //   page = Number(query.page);
  //   skip = (page - 1) * limit;
  // }

  // const pageQuery = sortQuery.skip(skip).limit(limit);

  // let fields = '-__v';
  // if (query?.fields) {
  //   fields = (query.fields as string).split(',').join(' ');
  // }

  // const fieldsQuery = await pageQuery.select(fields);

  // return fieldsQuery;

  const studentQuery = new QueryBuilders(
    Student.find()
      .populate({
        path: 'academicDepartment',
        populate: { path: 'academicFaculty' },
      })
      .populate('admissionSemester'),
    query,
  )
    .search(searchableFields)
    .filter()
    .sort()
    .pagination()
    .fields();

  const result = await studentQuery.modelQuery;

  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findOne({ id })
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: { path: 'academicFaculty' },
    });
  return result;
};

const deleteStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedStudent) {
      throw new AppError(400, 'Failed to delete student');
    }

    const deletedUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedUser) {
      throw new AppError(400, 'Failed to delete user');
    }

    await session.commitTransaction();
    await session.endSession();

    return deletedStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error('Failed to delete student');
  }
};

const updateStudentIntoDB = async (id: string, payload: Partial<TStudent>) => {
  const { name, guardian, localGuardian, ...remainingStudentData } = payload;
  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }
  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatedData[`guardian.${key}`] = value;
    }
  }

  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdatedData[`localGuardian.${key}`] = value;
    }
  }

  const result = await Student.findOneAndUpdate({ id }, modifiedUpdatedData, {
    new: true,
  });
  return result;
};
export const StudentServices = {
  getAllStudentFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
  updateStudentIntoDB,
};
