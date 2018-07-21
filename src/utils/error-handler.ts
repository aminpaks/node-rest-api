import { Response } from 'express';
import { isDebugging } from './debugging';

const getErrorMessage = (value: any) => {
  if (value instanceof Error) {
    return value.stack || value.message;
  }
  return value;
};

export const handleError = (
  debug: string | Object | Error,
  res: Response,
  {
    status = 500,
    message = 'Server error',
  }: { status?: number; message?: string } = {},
) =>
  res.status(status).json({
    error: {
      message,
      ...(isDebugging() && { debug: getErrorMessage(debug) }),
    },
  });
