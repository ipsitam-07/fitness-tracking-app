import { Response, NextFunction } from 'express-serve-static-core';
import { IAuthRequest } from '../interfaces';
import { AppError } from '../utils/error';

export function errorHandler(err: Error, _req: IAuthRequest, res: Response, _next: NextFunction) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }
  console.error(err);
  res.status(500).json({ success: false, message: 'Internal Server Error' });
}
