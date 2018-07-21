import { isDebugging } from '../debugging';

export type ErrorStatus = 400 | 401 | 403 | 404 | 500;

export type BaseError = {
  message: string;
  localizedMessage: string;
};

export type DebugInfo =
  | {
      causedBy: string;
      details: string;
    }
  | Error
  | string
  | undefined;

export interface BaseErrorResponseModel {
  status: ErrorStatus;
}

export type StandardResponseErrorModel<
  T = BaseError
> = BaseErrorResponseModel & {
  error: T;
  debug: DebugInfo | undefined;
};

export interface FieldValidationError {
  field: string;
  message: string;
}

export type ValidationErrorResponseModel = StandardResponseErrorModel<
  BaseError & { collection: FieldValidationError[] }
>;

export interface FieldValidationError {
  name: 'ValidationError';
  kind: string;
  message: string;
  stack: string;
  path: string;
  reason?: string;
  value?: any;
}

export interface ValidationError {
  name: 'ValidationError';
  message: string;
  stack: string;
  errors: { [key: string]: FieldValidationError };
}

export const getPossibleStackError = (value: any) => {
  if (value instanceof Error) {
    return value.stack || value.message;
  }
  return value;
};

export const getDebugMessage = (value: any): DebugInfo =>
  isDebugging() && Boolean(value) ? getPossibleStackError(value) : undefined;
