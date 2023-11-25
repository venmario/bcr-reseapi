import { Request, Response } from "express";
import { IUser } from "../models/user";
import "dotenv/config";
import { AuthService } from "../services/AuthService";

export class AuthenticationController {
  service: AuthService;
  constructor() {
    this.service = new AuthService();
  }

  login = async (req: Request<{}, {}, IUser, {}>, res: Response) => {
    const { email, password } = req.body;

    try {
      const token = await this.service.login(email, password);
      return res.status(200).json({
        token,
      });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(404).json({
          message: error.message,
        });
      }
    }
  };
}
