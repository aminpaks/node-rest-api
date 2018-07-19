export const isProduction = () => {
  const { NODE_ENV = 'development' } = process.env;

  return NODE_ENV === 'production';
};

export const isDebugging = () => {
  const { DEBUG = false } = process.env;

  return DEBUG === true;
};
