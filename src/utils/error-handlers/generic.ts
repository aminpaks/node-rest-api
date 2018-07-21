import { Response } from 'express';
import {
  StandardResponseErrorModel,
  BaseErrorResponseModel,
  BaseError,
  DebugInfo,
  getDebugMessage,
} from './common';

export type RequestErrorParam = BaseErrorResponseModel & BaseError;

export const handleError = (
  res: Response,
  {
    status = 500,
    message = 'Internal server error',
    localizedMessage,
  }: Partial<RequestErrorParam>,
  debugInfo: DebugInfo,
) =>
  res.status(status).json({
    status,
    error: {
      message,
      localizedMessage,
    },
    debug: getDebugMessage(debugInfo),
  } as StandardResponseErrorModel);
