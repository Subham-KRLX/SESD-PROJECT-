import { ZodError } from 'zod';
import type { Request, Response, NextFunction } from 'express';

export class ValidationError extends Error {
  constructor(public errors: ZodError) {
    super('Validation failed');
    this.name = 'ValidationError';
  }
}

export function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  console.error('Error:', error);

  if (error instanceof ValidationError) {
    res.status(400).json({
      error: 'Validation failed',
      details: error.errors.flatten().fieldErrors,
    });
    return;
  }

  if (error.message.includes('User with this email already exists')) {
    res.status(409).json({ error: error.message });
    return;
  }

  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? error.message : undefined,
  });
}

export function validateRequest(schema: any) {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error: any) {
      if (error instanceof ZodError) {
        res.status(400).json({
          error: 'Validation failed',
          details: error.flatten().fieldErrors,
        });
        return;
      }
      next(error);
    }
  };
}
