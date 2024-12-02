import { Router } from 'express';
import { UserController } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { studentValidationSchemas } from '../student/student.validation';

const router = Router();
router.post(
  '/create-student',
  validateRequest(studentValidationSchemas.createStudentValidationSchema),
  UserController.createStudent,
);

export const UserRouter = router;
