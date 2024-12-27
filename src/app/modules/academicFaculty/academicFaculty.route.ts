import express from 'express';
import { AcademicFacultyController } from './academicFaculty.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicFacultyValidation } from './academicFaculty.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
  '/create-academic-faculty',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(
    AcademicFacultyValidation.createAcademicFacultyValidationSchema,
  ),
  AcademicFacultyController.createAcademicFaculty,
);

router.get('/:facultyId',  
  auth(
  USER_ROLE.superAdmin,
  USER_ROLE.admin,
  USER_ROLE.faculty,
  USER_ROLE.student,
), AcademicFacultyController.getSingleAcademicFaculty);

router.get('/', auth(
  USER_ROLE.superAdmin,
  USER_ROLE.admin,
  USER_ROLE.faculty,
  USER_ROLE.student,
), AcademicFacultyController.getAllAcademicFaculties);

router.patch(
  '/:facultyId',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(
    AcademicFacultyValidation.updateAcademicFacultyValidationSchema,
  ),
  AcademicFacultyController.updateAcademicFaculty,
);

export const AcademicFacultyRoutes = router;

// Route --> Controller --> Service
