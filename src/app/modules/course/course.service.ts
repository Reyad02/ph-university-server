import httpStatus from 'http-status';
import QueryBuilders from '../../builder/QueryBilders';
import AppError from '../../errors/AppError';
import { CourseSearchableFields } from './course.constant';
import { TCourse } from './course.interface';
import { Course } from './course.model';
import mongoose from 'mongoose';

const createCourseIntoDB = async (payload: TCourse) => {
  const result = await Course.create(payload);
  return result;
};

const getAllCoursesFromDB = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilders(Course.find(), query)
    .search(CourseSearchableFields)
    .filter()
    .sort()
    .pagination()
    .fields();
  const result = await courseQuery.modelQuery;
  return result;
};

const getSingleCourseFromDB = async (id: string) => {
  const result = await Course.findById(id).populate('preRequisite.course');
  return result;
};

const updateCourseIntoDB = async (id: string, payload: Partial<TCourse>) => {
  const { preRequisite, ...remainingData } = payload;
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const updateBasicData = await Course.findByIdAndUpdate(id, remainingData, {
      new: true,
      runValidators: true,
      session,
    });

    if (!updateBasicData) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update the Course');
    }

    if (preRequisite && preRequisite.length > 0) {
      const deletedPreRequisite = preRequisite
        ?.filter((el) => el.course && el.isDeleted)
        .map((el) => el.course);

      const deletedPreRequisiteCourse = await Course.findByIdAndUpdate(
        id,
        {
          $pull: { preRequisite: { course: { $in: deletedPreRequisite } } },
        },
        { new: true, runValidators: true, session },
      );

      if (!deletedPreRequisiteCourse) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          'Failed to update the Course',
        );
      }

      const insertPreRequisite = preRequisite?.filter(
        (el) => el.course && !el.isDeleted,
      );

      const insertPreRequisiteCourse = await Course.findByIdAndUpdate(
        id,
        {
          $addToSet: { preRequisite: { $each: insertPreRequisite } },
        },
        { new: true, runValidators: true, session },
      );

      if (!insertPreRequisiteCourse) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          'Failed to update the Course',
        );
      }
    }
    await session.commitTransaction();
    await session.endSession();

    const result = await Course.findById(id).populate('preRequisite.course');
    return result;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update the Course');
  }
};

const deleteSingleCourseFromDB = async (id: string) => {
  const result = await Course.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  return result;
};

export const CourseServices = {
  createCourseIntoDB,
  getAllCoursesFromDB,
  getSingleCourseFromDB,
  updateCourseIntoDB,
  deleteSingleCourseFromDB,
};
