import express from 'express';
import { AdminControllers } from './admin.controller';
import validateRequest from '../../middlewares/validateRequest';
import { updateAdminValidationSchema } from './admin.validation';

const router = express.Router();

router.get('/:id', AdminControllers.getSingleAdmin);
router.patch(
  '/:id',
  validateRequest(updateAdminValidationSchema),
  AdminControllers.updateAdmin,
);
router.delete('/:id', AdminControllers.deleteAdmin);
router.get('/', AdminControllers.getAdmins);

export const AdminRoutes = router;
