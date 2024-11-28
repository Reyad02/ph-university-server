import { TUser } from './user.interface';
import User from './user.model';

const createStudentInDB = async (data: TUser) => {
  data.role = 'student';
  data.id = '011203011';
  data.status = 'in-progress';
  const newUser = await User.create(data);
  return newUser;
};

export const UserService = {
  createStudentInDB,
};
