import jwt, { SignOptions } from 'jsonwebtoken';

export const signJwt = (
  payload: Object,
  jwtSecret: string,
  options: SignOptions
) => {
  return jwt.sign(payload, jwtSecret, {
    ...(options && options),
  });
};

export const verifyJwt = <T>(token: string, jwtSecret: string): T | null => {
  try {
    const decoded = jwt.verify(token, jwtSecret) as T;

    return decoded;
  } catch (error) {
    return null;
  }
};
