import { Response } from 'express';

/**
 * 성공 응답
 */

export const success = <T>(res: Response, data: T, statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    data,
  });
};

/**
 * 실패 응답
 */

export const error = (res: Response, message: string, statusCode = 400) => {
  return res.status(statusCode).json({
    success: false,
    message,
  });
};
