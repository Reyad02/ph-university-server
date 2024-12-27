import { model, Schema } from 'mongoose';
import { TUser, UserModel } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';
import { UserStatus } from './user.constant';

const userschema = new Schema<TUser, UserModel>(
  {
    id: {
      type: String,
      // required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    passwordChangedAt: {
      type: Date,
    },
    role: {
      type: String,
      enum: ['super-admin', 'admin', 'student', 'faculty'],
    },
    status: {
      type: String,
      enum: UserStatus,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

userschema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, Number(config.salt_rounds));
  next();
});

userschema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

userschema.statics.isUserExistsByCustomId = async function (id: string) {
  return await User.findOne({ id }).select('+password');
};

userschema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

userschema.statics.isJWTIssuedBeforePasswordChanged = function (
  passwordChangedTimestamp: Date,
  jwtIssuedTimestamp: number,
) {
  const passwordChangedTime =
    new Date(passwordChangedTimestamp).getTime() / 1000;
  return passwordChangedTime > jwtIssuedTimestamp;
};

const User = model<TUser, UserModel>('User', userschema);
export default User;
