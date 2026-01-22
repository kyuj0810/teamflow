import { Router } from 'express';
import {
  createUser,
  updateUser,
  getUserById,
  getUsers,
  deleteUser,
  restoreUser,
  getUserProfile,
} from '../controllers/user.controller';
import { authMiddleware } from 'src/middlewares/auth.middleware';

const router = Router();

router.post('/', createUser);
router.put('/:id', updateUser);
router.get('/:id', getUserById);
router.get('/', getUsers);
router.delete('/:id', deleteUser);
router.patch('/:id/restore', restoreUser);
router.get('/me', authMiddleware, getUserProfile);

export default router;
