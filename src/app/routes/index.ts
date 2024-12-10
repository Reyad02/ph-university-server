import { Router } from 'express';
import { UserRouter } from '../modules/user/user.route';
import { StudentRouter } from '../modules/student/student.route';
import { AcademicRouter } from '../modules/academicSemester/academicSemester.route';
import { AcademicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.route';
import { AcademicDepartmentRoutes } from '../modules/academicDepartment/academicDepartment.route';
import { FacultyRoutes } from '../modules/faculty/faculty.route';
import { AdminRoutes } from '../modules/admin/admin.route';

const router = Router();

const moduleRoutes = [
  { path: '/users', route: UserRouter },
  { path: '/students', route: StudentRouter },
  { path: '/faculties', route: FacultyRoutes },
  { path: '/admins', route: AdminRoutes },
  { path: '/academic-semester', route: AcademicRouter },
  { path: '/academic-faculties', route: AcademicFacultyRoutes },
  { path: '/academic-departments', route: AcademicDepartmentRoutes },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
