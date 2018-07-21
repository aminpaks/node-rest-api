import { Response } from 'express';
import { isDebugging } from './debugging';

export interface RequestError {
  message: string;
  localizedMessage: string;
}

export interface RequestErrorParam {
  status?: number;
  collection?: RequestError[];
}

const getPossibleStackError = (value: any) => {
  if (value instanceof Error) {
    return value.stack || value.message;
  }
  return value;
};

const getDebugMessage = (value: any) =>
  isDebugging() && Boolean(value)
    ? { debug: getPossibleStackError(value) }
    : {};

export const handleError = (
  res: Response,
  {
    status = 500,
    message = 'Internal server error',
    localizedMessage,
    collection,
  }: RequestErrorParam & Partial<RequestError>,
  debugInfo?: string | Object | Error,
) =>
  res.status(status).json({
    status,
    error: {
      message,
      localizedMessage,
      collection,
    },
    ...getDebugMessage(debugInfo),
  });
