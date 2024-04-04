import express, { NextFunction, Request, Response } from 'express';
import { userController } from './user.controller';
import { authMiddleware } from '../../middlewares/auth';
const router = express.Router();

router.post(
    '/register',
  
    userController.createUser
)
router.get(
    '/profile',
  authMiddleware,
    userController.getUser
)
router.put(
    '/profile',
  authMiddleware,
    userController.updateUser
)

export const userRoutes = router;