import config from '../../config';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import User from './user.model';
import { generatedStudentId } from './user.utils';

const createStudentInDB = async (password: string, student: TStudent) => {
  const user: Partial<TUser> = {};

  const admissionSemester = await AcademicSemester.findById(
    student.admissionSemester,
  );

  user.password = password || config.default_pass;
  user.role = 'student';
  user.id = await generatedStudentId(admissionSemester);
  user.status = 'in-progress';

  const newUser = await User.create(user);

  if (Object.keys(newUser).length) {
    student.id = newUser.id;
    student.user = newUser._id;

    const newStudent = await Student.create(student);
    return newStudent;
  }
};

export const UserService = {
  createStudentInDB,
};
