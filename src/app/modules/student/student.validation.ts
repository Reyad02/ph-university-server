import { z } from 'zod';

const guardianValidationSchema = z.object({
  fatherName: z.string().nonempty("Father's name is required"),
  fatherOccupation: z.string().nonempty("Father's occupation is required"),
  fatherContactNo: z
    .string()
    .regex(/^\+?\d{10,15}$/, "Father's contact number is invalid")
    .nonempty("Father's contact number is required"),
  motherName: z.string().nonempty("Mother's name is required"),
  motherOccupation: z.string().nonempty("Mother's occupation is required"),
  motherContactNo: z
    .string()
    .regex(/^\+?\d{10,15}$/, "Mother's contact number is invalid")
    .nonempty("Mother's contact number is required"),
});

// UserName schema
const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .nonempty('First name is required')
    .max(20, 'First name length cannot be more than 20'),
    // .refine(
    //   (value) => /^[A-Z][a-zA-Z]*$/.test(value),
    //   'First name must start with an uppercase letter and contain only letters',
    // ),
  middleName: z.string().optional(),
  lastName: z
    .string()
    .nonempty('Last name is required')
    .refine((value) => /^[a-zA-Z]+$/.test(value), 'Last name is invalid'),
});

// Local Guardian schema
const localGuardianValidationSchema = z.object({
  name: z.string().nonempty("Local guardian's name is required"),
  occupation: z.string().nonempty("Local guardian's occupation is required"),
  contactNo: z
    .string()
    .regex(/^\+?\d{10,15}$/, "Local guardian's contact number is invalid")
    .nonempty("Local guardian's contact number is required"),
  address: z.string().nonempty("Local guardian's address is required"),
});

// Student schema
const createStudentValidationSchema = z.object({
  body: z.object({
    // id: z.string().nonempty('Student ID is required'),
    // password: z.string().nonempty('Password is required'),
    student: z.object({
      name: userNameValidationSchema,
      gender: z.enum(['male', 'female'], {
        required_error: 'Gender is required',
        invalid_type_error: "Gender must be either 'male' or 'female'",
      }),
      dateOfBirth: z
        .string()
        .refine((value) => !isNaN(Date.parse(value)), 'Invalid date format'),
      email: z
        .string()
        .email('Invalid email address')
        .nonempty('Email is required'),
      contactNo: z
        .string()
        .regex(/^\+?\d{10,15}$/, 'Contact number is invalid')
        .nonempty('Contact number is required'),
      emergencyContactNo: z
        .string()
        .regex(/^\+?\d{10,15}$/, 'Emergency contact number is invalid')
        .nonempty('Emergency contact number is required'),
      bloodGroup: z.enum(['A+', 'A-', 'AB+', 'AB-', 'B+', 'B-', 'O+', 'O-'], {
        required_error: 'Blood group is required',
        invalid_type_error: 'Invalid blood group',
      }),
      presentAdd: z.string().nonempty('Present address is required'),
      permanentAdd: z.string().nonempty('Permanent address is required'),
      guardian: guardianValidationSchema,
      localGuardian: localGuardianValidationSchema,
      // profileImg: z.string().url().optional(),
      isActive: z
        .enum(['active', 'blocked'], {
          required_error: 'Status is required',
          invalid_type_error: "Status must be either 'active' or 'blocked'",
        })
        .default('active'),
      isDeleted: z.boolean().default(false),
      admissionSemester: z.string(),
      academicDepartment: z.string(),
    }),
  }),
});

const updateUserNameValidationSchema = z.object({
  firstName: z.string().min(1).max(20).optional(),
  middleName: z.string().optional(),
  lastName: z.string().optional(),
});

const updateGuardianValidationSchema = z.object({
  fatherName: z.string().optional(),
  fatherOccupation: z.string().optional(),
  fatherContactNo: z.string().optional(),
  motherName: z.string().optional(),
  motherOccupation: z.string().optional(),
  motherContactNo: z.string().optional(),
});

const updateLocalGuardianValidationSchema = z.object({
  name: z.string().optional(),
  occupation: z.string().optional(),
  contactNo: z.string().optional(),
  address: z.string().optional(),
});

export const updateStudentValidationSchema = z.object({
  body: z.object({
    student: z.object({
      name: updateUserNameValidationSchema,
      gender: z.enum(['male', 'female', 'other']).optional(),
      dateOfBirth: z.string().optional(),
      email: z.string().email().optional(),
      contactNo: z.string().optional(),
      emergencyContactNo: z.string().optional(),
      bloogGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(),
      presentAddress: z.string().optional(),
      permanentAddress: z.string().optional(),
      guardian: updateGuardianValidationSchema.optional(),
      localGuardian: updateLocalGuardianValidationSchema.optional(),
      admissionSemester: z.string().optional(),
      profileImg: z.string().optional(),
      academicDepartment: z.string().optional(),
    }),
  }),
});

export const studentValidationSchemas = {
  createStudentValidationSchema,
  updateStudentValidationSchema,
};
