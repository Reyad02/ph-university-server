import { Router } from 'express';
import { UserRouter } from '../modules/user/user.route';
import { StudentRouter } from '../modules/student/student.route';

const router = Router();

const moduleRoutes = [
  { path: '/users', route: UserRouter },
  { path: '/students', route: StudentRouter },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
