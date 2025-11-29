import express from 'express';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { isSuperAdmin } from '../middleware/roleAuth.middleware.js';
import { acceptCollege, getActiveColleges, getInactiveColleges, getRejectedColleges, rejectCollege } from '../controllers/college.controller.js';

const router = express.Router();

router.get('/active', authMiddleware, isSuperAdmin, getActiveColleges);
router.get('/inactive', authMiddleware, isSuperAdmin, getInactiveColleges);
router.get('/rejected', authMiddleware, isSuperAdmin, getRejectedColleges);
router.patch('/accept/:collegeId', authMiddleware, isSuperAdmin, acceptCollege);
router.patch('/reject/:collegeId', authMiddleware, isSuperAdmin, rejectCollege);

export default router;