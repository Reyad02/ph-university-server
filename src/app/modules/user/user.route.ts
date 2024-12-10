import { Router } from 'express';
import { UserController } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { studentValidationSchemas } from '../student/student.validation';
import { createFacultyValidationSchema } from '../faculty/faculty.validation';

const router = Router();
router.post(
  '/create-student',
  validateRequest(studentValidationSchemas.createStudentValidationSchema),
  UserController.createStudent,
);
router.post(
  '/create-faculty',
  validateRequest(createFacultyValidationSchema),
  UserController.createFaculty,
);

export const UserRouter = router;
