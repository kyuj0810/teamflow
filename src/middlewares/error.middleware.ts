import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { Prisma } from '@prisma/client';
import { AppError } from 'src/errors/app-error';

export const errorMiddleware = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // zod 에러
  if (err instanceof ZodError) {
    return res.status(400).json({
      message: 'Validation failed',
      //   errors: err.issues,
      errors: err.issues.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message,
      })),
    });
  }

  // 커스텀 에러
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message,
    });
  }

  // Prisma 에러
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    // 고유 제약 조건 위반
    if (err.code === 'P2002') {
      return res.status(409).json({
        message: '이미 존재하는 Email 입니다.',
        meta: err.meta,
      });
    }
  }

  // 알 수 없는 에러
  console.error(err);

  return res.status(500).json({
    message: 'Internal server error',
  });
};
