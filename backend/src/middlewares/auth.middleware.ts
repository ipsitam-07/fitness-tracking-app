import { Response } from 'express';
import { IAuthRequest } from '../interfaces';
import { verifyToken } from '../utils/jwt';
import { AppError } from '../utils/error';
import { NextFunction } from 'express';

export function authenticationReq(req: IAuthRequest, _res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new AppError('Unauthorized', 401);
  }

  const accessToken = authHeader.split(' ')[1];

  try {
    const payload = verifyToken(accessToken as string);
    req.user = {
      id: payload.userId,
    };
    next();
  } catch {
    throw new AppError('Invalid or expired token', 401);
  }
}
