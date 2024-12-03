import { Router } from 'express';
import { StudentController } from './student.controller';

const router = Router();
router.get('/:id', StudentController.getSingleStudent);
router.get('/', StudentController.getAllStudents);
router.delete('/:id', StudentController.deleteStudent);

export const StudentRouter = router;
