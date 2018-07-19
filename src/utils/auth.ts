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
  const rulesByURL = rules.filter(rule => rule.url === validBaseURL);

  if (rulesByURL.length > 0) {
    const rulesMethods = rulesByURL.reduce<string[]>((acc, rule) => {
      const { methods } = rule;
      return [...acc, ...(methods && methods.length > 0 ? methods : [])];
    }, []);

    if (rulesMethods.length > 0) {
      const result = rulesMethods.some(method => req.method === method);
      debugger;
      return result;
    }

    return true;
  }
  return false;
};
