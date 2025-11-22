import jwt from "jsonwebtoken";

export const getToken = (payload: any, secret: string, duration: string) => {
  const token = jwt.sign(payload, secret, {
    expiresIn: duration,
  } as jwt.SignOptions);

  return token;
};
