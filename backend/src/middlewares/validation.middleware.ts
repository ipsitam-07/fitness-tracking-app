import { ZodObject, ZodError } from 'zod';
import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/error';

export const validate =
  (schema: ZodObject) => (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      next();
    } catch (err) {
      if (err instanceof ZodError) {
        next(new AppError('Validation failed', 400));
      }
    }
  };
