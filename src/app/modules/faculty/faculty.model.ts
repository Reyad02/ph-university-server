import { model, Schema } from 'mongoose';
import { TFcaulty, TUsername } from './faculty.interface';
import { BloodGroup, Gender } from './faculty.constant';

const userNameSchema = new Schema<TUsername>({
  firstName: {
    type: String,
    required: [true, 'FirstName is required'],
    trim: true,
  },
  middleName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'FirstName is required'],
    trim: true,
  },
});

const facultySchema = new Schema<TFcaulty>(
  {
    id: {
      type: String,
      required: [true, 'id is required'],
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'id is required'],
      unique: true,
      ref: 'User',
    },
    designation: {
      type: String,
      required: [true, 'Designation is required'],
    },
    name: {
      type: userNameSchema,
      required: [true, 'Name is required'],
    },
    gender: {
      type: String,
      enum: {
        values: Gender,
        message: '{VALUE} IS NOT A VALID GENDER',
      },
      required: true,
    },
    dateOfBirth: { type: Date },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    contactNo: { type: String, required: [true, 'Contact number is required'] },
    emergencyContactNo: {
      type: String,
      required: [true, 'Emergency contact number is required'],
    },
    bloodGroup: {
      type: String,
      enum: {
        values: BloodGroup,
        message: '{VALUE} is not valid blood group',
      },
    },
    presentAddress: {
      type: String,
      required: [true, 'Present address is required'],
    },
    permanentAddress: {
      type: String,
      required: [true, 'Permanent address is required'],
    },
    profileImg: { type: String },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      required: [true, 'Academic department is not set'],
      ref: 'AcademicDepartment',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

facultySchema.virtual(`fullname`).get(function () {
  return (
    this?.name?.firstName +
    ' ' +
    this?.name.middleName +
    ' ' +
    this?.name.lastName
  );
});

facultySchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

facultySchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

export const Faculty = model<TFcaulty>('Faculty', facultySchema);
