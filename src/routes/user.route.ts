import { Router } from 'express';
import {
  createUser,
  updateUser,
  getUserById,
  getUsers,
  deleteUser,
  restoreUser,
} from '../controllers/user.controller';

const router = Router();

router.post('/', createUser);
router.put('/:id', updateUser);
router.get('/:id', getUserById);
router.get('/', getUsers);
router.delete('/:id', deleteUser);
router.patch('/:id/restore', restoreUser);

export default router;
