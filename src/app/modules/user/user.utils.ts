import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import User from './user.model';

const findLastStudentId = async () => {
  const lastStudent = await User.findOne(
    {
      role: 'student',
    },
    {
      id: 1,
    },
  )
    .sort({ createdAt: -1 })
    .lean();

  return lastStudent?.id ? lastStudent.id : undefined;
};

export const generatedStudentId = async (payload: TAcademicSemester) => {
  let currentId = (0).toString();
  const lastStudentId = await findLastStudentId();
  const lastStudentYear = lastStudentId?.substring(0, 4);
  const lastStudentSemesterCode = lastStudentId?.substring(4, 6);
  const lastStudentSemesterRoll = lastStudentId?.substring(6);
  if (
    lastStudentId &&
    lastStudentYear === payload.year &&
    lastStudentSemesterCode === payload.code
  ) {
    currentId = lastStudentSemesterRoll as string;
  }
  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
  incrementId = `${payload.year}${payload.code}${incrementId}`;
  return incrementId;
};

export const findLastFacultyId = async () => {
  const lastFaculty = await User.findOne(
    {
      role: 'faculty',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({ createdAt: -1 })
    .lean();

  return lastFaculty?.id ? lastFaculty.id : undefined;
};

export const generateFacultyID = async () => {
  let currentID = (0).toString();
  const lastFaculty = await findLastFacultyId();
  if (lastFaculty) {
    currentID = lastFaculty.substring(2);
  }
  let incrementId = (Number(currentID) + 1).toString().padStart(4, '0');

  incrementId = `F-${incrementId}`;
  return incrementId;
};
