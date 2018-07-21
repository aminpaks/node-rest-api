import { Request } from 'express';

export interface BypassRequestRule {
  url: string;
  methods?: string[];
}

export const isRequestAllowedBy = (
  req: Request,
  rules: BypassRequestRule[],
) => {
  if (rules.length <= 0) {
    return false;
  }

  const { baseUrl, url } = req;
  const validBaseURL = baseUrl || url;
  const rulesByURL = rules.filter(
    rule => rule.url === validBaseURL || rule.url === '*',
  );
  const allMethods = ['get', 'post', 'patch', 'put', 'delete', 'options'];

  if (rulesByURL.length > 0) {
    const rulesMethods = rulesByURL.reduce<string[]>((acc, rule) => {
      const { methods = allMethods } = rule;
      return [...acc, ...(methods && methods.length > 0 ? methods : [])];
    }, []);

    if (rulesMethods.length > 0) {
      return rulesMethods.some(method => req.method.toLowerCase() === method);
    }

    return true;
  }
  return false;
};
