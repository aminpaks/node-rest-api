import { RequestHandler } from 'express';

export const corsMiddleware: RequestHandler = (req, res, next) => {
  res
    .header('Access-Control-Allow-Origin', '*')
    .header(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, PATCH, DELETE, OPTIONS',
    )
    .header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    );

  return next();
};
