import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { readFileSync } from "node:fs";
import { join } from "node:path";

export default async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({
      message: "Token not found!",
    });
  }
  try {
    const token = authorization.split(" ")[1];
    // const secret = process.env.SECRET!;
    const secret = readFileSync(
      join(__dirname, "..", "..", "ssh-key", "id_rsa.pub"),
      "utf-8"
    );

    const tokenPayload = jwt.verify(token, secret);
    req.user = tokenPayload as IUser;
    next();
  } catch (error) {
    return res.status(401).json({
      message: error,
    });
  }
}
