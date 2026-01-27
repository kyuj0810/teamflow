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

router.get('/me', authMiddleware, getUserProfile);

router.get('/', getUsers);

router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.patch('/:id/restore', restoreUser);

export default router;
