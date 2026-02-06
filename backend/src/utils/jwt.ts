import jwt from 'jsonwebtoken';
import authConfig from '../config/auth.config';

export function signToken(payload: { userId: string }) {
  return jwt.sign(payload, authConfig.jwtSkey, {
    expiresIn: authConfig.jwtExp as any,
  });
}

export function verifyToken(token: string) {
  return jwt.verify(token, authConfig.jwtSkey) as { userId: string };
}
