import { Types } from 'mongoose';

export type TUsername = {
  firstName: string;
  middleName: string;
  lastName: string;
};

export type TGender = 'male' | 'female' | 'other';

export type TBloodGroup =
  | 'A+'
  | 'A-'
  | 'AB+'
  | 'AB-'
  | 'B+'
  | 'B-'
  | 'O+'
  | 'O-';

export type TAdmin = {
  id: string;
  user: Types.ObjectId;
  designation: string;
  name: TUsername;
  gender: TGender;
  dateOfBirth?: Date;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: TBloodGroup;
  presentAddress: string;
  permanentAddress: string;
  profileImg?: string;
  isDeleted: boolean;
};
