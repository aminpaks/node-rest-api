export const isDebugging = () => {
  const { DEBUG = false } = process.env;

  return DEBUG === true;
};
