import { Response } from 'express';
import { entries } from 'lodash';
import {
  ValidationErrorResponseModel,
  DebugInfo,
  getDebugMessage,
  ValidationError,
} from './common';

export const handleValidationError = (
  res: Response,
  value: ValidationError,
  debugInfo: DebugInfo,
) => {
  const collection = entries(value.errors).map(([field, value]) => {
    return {
      field,
      message: value.message,
    };
  });
  return res.status(400).json(<ValidationErrorResponseModel>{
    error: {
      message: 'Validation failure',
      collection,
    },
    debug: getDebugMessage(debugInfo),
  });
};
