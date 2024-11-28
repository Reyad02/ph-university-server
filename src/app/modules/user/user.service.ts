import config from '../../config';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import User from './user.model';

const createStudentInDB = async (password: string, student: TStudent) => {
  const user: Partial<TUser> = {};

  const generateRandomUserId = () => {
    const min = 1000000000; // Minimum 10-digit number
    const max = 9999999999; // Maximum 10-digit number
    return (Math.floor(Math.random() * (max - min + 1)) + min).toString();
  };

  user.password = password || config.default_pass;
  user.role = 'student';
  user.id = generateRandomUserId();
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
