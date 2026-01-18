import { Router } from 'express';
import {
  createUser,
  updateUser,
  getUserById,
} from '../controllers/user.controller';

const router = Router();

router.post('/', createUser);
router.put('/:id', updateUser);
router.get('/:id', getUserById);

export default router;
