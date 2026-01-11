import { Request, Response } from 'express';
import { createUserSchema } from '../dto/create-user.dto';
import { createUserService } from '../services/user.service';

export const createUser = async (req: Request, res: Response) => {
  const body = createUserSchema.parse(req.body);
  const user = await createUserService(body);

  res.status(201).json(user);
};
