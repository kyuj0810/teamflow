import { Request, Response } from 'express';
import { success } from '../utils/response';
import { HTTP_STATUS } from 'src/constants/http-status';
import { createUserSchema } from '../dto/create-user.dto';
import { updateUserSchema } from 'src/dto/update-user.dto';
import { getUserQuerySchema } from 'src/dto/get-users.query';
import { userIdParamSchema } from 'src/dto/user-params.dto';
import {
  createUserService,
  updateUserService,
  getUserByIdService,
  getUserService,
  deleteUserService,
  restoreUserService,
} from '../services/user.service';

export const createUser = async (req: Request, res: Response) => {
  const body = createUserSchema.parse(req.body);
  const user = await createUserService(body);

  return success(res, user, HTTP_STATUS.CREATED);
};

export const updateUser = async (req: Request, res: Response) => {
  // 1. URL 검증
  const { id } = userIdParamSchema.parse(req.params);

  // 2. Body 검증
  const body = updateUserSchema.parse(req.body);

  // 3. 서비스 호출
  const updatedUser = await updateUserService(id, body);

  return success(res, updatedUser, HTTP_STATUS.OK);
};

export const getUserById = async (req: Request, res: Response) => {
  const { id } = userIdParamSchema.parse(req.params);
  const user = await getUserByIdService(id);

  return success(res, user, HTTP_STATUS.OK);
};

export const getUsers = async (req: Request, res: Response) => {
  const { page, limit } = getUserQuerySchema.parse(req.query);
  const result = await getUserService(page, limit);

  return success(res, result, HTTP_STATUS.OK);
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = userIdParamSchema.parse(req.params);
  const result = await deleteUserService({ id });

  return success(res, result, HTTP_STATUS.NO_CONTENT);
};

export const restoreUser = async (req: Request, res: Response) => {
  const { id } = userIdParamSchema.parse(req.params);

  const user = await restoreUserService({ id });

  return success(res, user, HTTP_STATUS.NO_CONTENT);
};

export const getUserProfile = async (req: Request, res: Response) => {
  const userId = req.user?.id;

  const user = await getUserByIdService(userId!);

  return success(res, user, HTTP_STATUS.OK);
};
