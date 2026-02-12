import rateLimit from 'express-rate-limit';

const noRateLimit = (_req: any, _res: any, next: any) => next();

// Auth limiter
export const authRateLimiter =
  process.env.NODE_ENV === 'test'
    ? noRateLimit
    : rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 10,
        standardHeaders: true,
        legacyHeaders: false,
        message: {
          success: false,
          message: 'Too many authentication attempts. Please try again later.',
        },
      });

// Protected API limiter
export const apiRateLimiter =
  process.env.NODE_ENV === 'test'
    ? noRateLimit
    : rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 100,
        standardHeaders: true,
        legacyHeaders: false,
        message: {
          success: false,
          message: 'Too many requests. Please slow down.',
        },
      });
