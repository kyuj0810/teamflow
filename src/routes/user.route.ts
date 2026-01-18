import { Router } from 'express';
import {
  createUser,
  updateUser,
  getUserById,
  getUsers,
} from '../controllers/user.controller';

const router = Router();

router.post('/', createUser);
router.put('/:id', updateUser);
router.get('/:id', getUserById);
router.get('/', getUsers);

export default router;
