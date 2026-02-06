import { Response, NextFunction } from 'express-serve-static-core';
import { IAuthRequest } from '../interfaces';
import { AppError } from '../utils/error';
import { UniqueConstraintError } from 'sequelize';

export function errorHandler(err: Error, _req: IAuthRequest, res: Response, _next: NextFunction) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  if (err instanceof UniqueConstraintError) {
    return res.status(409).json({
      success: false,
      message: 'User already exists',
    });
  }
  res.status(500).json({ success: false, message: 'Internal Server Error' });
}
