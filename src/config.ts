export const uriTemplate =
  'mongodb+srv://${USER}:${PASS}@cluster0-test-a1nfz.gcp.mongodb.net/test?retryWrites=true';

export const getURI = ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => uriTemplate.replace('${USER}', username).replace('${PASS}', password);

export const defaultCredential = {
  username: 'new-test-user-92',
  password: 'WXxHJsWbNve1exap',
};
