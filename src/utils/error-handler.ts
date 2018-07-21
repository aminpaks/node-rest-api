import { Response } from 'express';
import { isDebugging } from './debugging';

const getErrorMessage = (value: any) => {
  if (value instanceof Error) {
    return value.stack || value.message;
  }
  return value;
};

export interface RequestError {
  status?: number;
  message?: string;
  localizedMessage?: string;
  errorCode?: number;
}

export const handleError = (
  res: Response,
  {
    status = 500,
    errorCode,
    message = 'Internal server error',
    localizedMessage,
  }: RequestError,
  debugInfo: undefined | string | Object | Error,
) =>
  res.status(status).json({
    error: {
      message,
      errorCode,
      localizedMessage,
      ...(isDebugging() && debugInfo && { debug: getErrorMessage(debugInfo) }),
    },
  });
