import { Express, NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User, IUser } from "../models/user";
import bcrypt from "bcryptjs";
import "dotenv/config";
export class AuthenticationController {
  app: Express;

  constructor(pApp: Express) {
    this.app = pApp;
  }

  init() {
    this.app.post("/login", this.login);
  }

  login = async (req: Request<{}, {}, IUser, {}>, res: Response) => {
    const { email, password } = req.body;

    const user = await User.query().findOne({
      email: email,
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found!",
      });
    }

    if (!user.password) {
      return res.status(404).json({
        message: "Wrong Password",
      });
    }

    const authenticatedUser = await this.#checkPassword(
      user.password,
      password
    );

    if (!authenticatedUser) {
      return res.status(404).json({
        message: "Wrong Password",
      });
    }

    const payload = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    };
    const token = this.#createToken(payload);
    return res.json({
      token,
    });
  };

  #checkPassword = async (
    encryptedPassword: string,
    plainPassword: string
  ): Promise<boolean> => {
    return await bcrypt.compare(plainPassword, encryptedPassword);
  };

  #createToken = (payload: string | object): string => {
    const secretKey = process.env.SECRET!;
    const jam = 1;
    const expired: number = 3600 * jam;
    return jwt.sign(payload, secretKey, { expiresIn: expired });
  };
}
