import { Request, Response } from 'express';
import { CreateUserDto } from '../dto/create-user.dto';
import { createUserService } from '../services/user.service';

export const createUser = async (req: Request, res: Response) => {
  const body = req.body as CreateUserDto;

  const user = await createUserService(body);

  res.status(201).json(user);
};
