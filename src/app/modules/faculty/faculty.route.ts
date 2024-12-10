import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { updateFacultyValidationSchema } from './faculty.validation';
import { FacultyControllers } from './faculty.controller';

const router = express.Router();

router.get('/:id', FacultyControllers.getSingleFaculty);
router.patch(
  '/:id',
  validateRequest(updateFacultyValidationSchema),
  FacultyControllers.updateFaculty,
);
router.delete('/:id', FacultyControllers.deleteFaculty);
router.get('/', FacultyControllers.getFaculties);

export const FacultyRoutes = router;
