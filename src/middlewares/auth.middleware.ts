import { Request, Response, NextFunction } from 'express';
import { verifyToken } from 'src/utils/jwt';
import { UnauthorizedError } from 'src/errors/unauthorized.error';

export const authMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new UnauthorizedError('인증이 필요합니다.');
  }

  const token = authHeader.replace('Bearer ', '');

  const decoded = verifyToken(token);

  req.user = { id: decoded.userId };

  next();
};
