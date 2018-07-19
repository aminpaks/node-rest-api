import express from 'express';

const defaultPort = 8091;

export const startServer = async (app: express.Express, port = defaultPort) => {
  app.listen(port, () => {
    console.log(`Listening on port "${port}`);
  });

  app.on('error', err => {
    console.log('Express server error:', err);
    process.exit(1);
  });
};
