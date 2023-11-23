import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";

interface IUser {
  id: number;
  username: string;
  email: string;
  role: string;
}

export interface ValRequest extends Request {
  authUser: IUser;
}
export default async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const valRequest = req as ValRequest;
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({
      message: "Token not found!",
    });
  }
  try {
    const token = authorization.split(" ")[1];
    const secret = process.env.SECRET!;
    const tokenPayload = jwt.verify(token, secret);
    valRequest.authUser = tokenPayload as IUser;
    next();
  } catch (error) {
    return res.status(401).json({
      message: error,
    });
  }
}
