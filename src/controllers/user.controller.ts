import { Request, Response } from 'express';
import { createUserSchema } from '../dto/create-user.dto';
import { updateUserSchema } from 'src/dto/update-user.dto';
import { userIdParamSchema } from 'src/dto/user-params.dto';
import {
  createUserService,
  updateUserService,
  getUserByIdService,
} from '../services/user.service';

export const createUser = async (req: Request, res: Response) => {
  const body = createUserSchema.parse(req.body);
  const user = await createUserService(body);

  res.status(201).json(user);
};

export const updateUser = async (req: Request, res: Response) => {
  // 1. URL 검증
  const { id } = userIdParamSchema.parse(req.params);

  // 2. Body 검증
  const body = updateUserSchema.parse(req.body);

  // 3. 서비스 호출
  const updatedUser = await updateUserService(id, body);

  res.json(updatedUser);
};

export const getUserById = async (req: Request, res: Response) => {
  const { id } = userIdParamSchema.parse(req.params);
  const user = await getUserByIdService(id);

  res.json(user);
};
