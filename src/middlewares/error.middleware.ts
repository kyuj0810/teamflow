import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

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

  // 알 수 없는 에러
  console.error(err);
  return res.status(500).json({
    message: 'Internal server error',
  });
};
