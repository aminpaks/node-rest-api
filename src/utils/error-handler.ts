import { Response } from 'express';
import { isDebugging } from './debugging';

export const handleError = (
  debug: Error,
  res: Response,
  {
    code = 500,
    message = 'Server error'
  }: { code?: number; message?: string } = {}
) =>
  res.status(code).json({
    error: {
      message,
      ...(isDebugging && { debug })
    }
  });
