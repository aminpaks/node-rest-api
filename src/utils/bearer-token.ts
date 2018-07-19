export const getBearerToken = (value?: string) => {
  const match = /^bearer\s(.*?)$/i.exec(String(value));
  if (match) {
    return match[1];
  }
  return null;
};
