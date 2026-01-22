import { Request, Response } from 'express';
import { loginService } from 'src/services/auth.service';
import { success } from 'src/utils/response';
import { HTTP_STATUS } from 'src/constants/http-status';
import { loginUserSchema } from 'src/dto/login-user.dto';

export const login = async (req: Request, res: Response) => {
  const { email, password } = loginUserSchema.parse(req.body);

  const result = await loginService(email, password);

  return success(res, result, HTTP_STATUS.OK);
};
