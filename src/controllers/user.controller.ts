import { Request, Response } from 'express';
import { createUserSchema } from '../dto/create-user.dto';
import { createUserService, updateUserService } from '../services/user.service';
import { updateUserSchema } from 'src/dto/update-user.dto';

export const createUser = async (req: Request, res: Response) => {
  const body = createUserSchema.parse(req.body);
  const user = await createUserService(body);

  res.status(201).json(user);
};

export const updateUser = async (req: Request, res: Response) => {
  const id = req.params.id;

  const body = updateUserSchema.parse(req.body);

  const updatedUser = await updateUserService(id, body);

  res.json(updatedUser);
};
