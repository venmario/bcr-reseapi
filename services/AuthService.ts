import jwt from "jsonwebtoken";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import bcrypt from "bcryptjs";
import { AuthRepository } from "../repositories/AuthRepo";

export class AuthService {
  repository: AuthRepository;

  constructor() {
    this.repository = new AuthRepository();
  }

  async findUserByEmail(email: string) {
    return await this.repository.findUserByEmail(email);
  }

  async login(email: string, password: string) {
    const user = await this.repository.findUserByEmail(email);

    if (!user) {
      throw new Error("User not found!");
    }

    if (!password) {
      throw new Error("Empty Password");
    }

    const authenticatedUser = await this.checkPassword(user.password, password);

    if (!authenticatedUser) {
      throw new Error("User not found!");
    }

    const payload = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role
    };

    const token = this.createToken(payload);

    return token;
  }

  checkPassword = async (
    encryptedPassword: string,
    plainPassword: string
  ): Promise<boolean> => {
    return await bcrypt.compare(plainPassword, encryptedPassword);
  };

  createToken = (payload: string | object): string => {
    const secretKey = process.env.PRIVATE_KEY!;

    // const filePathDev = join(__dirname, "..", "..", "ssh-key", "id_rsa");
    // const secretKey = readFileSync(filePathDev, "utf-8");

    const jam: number = 1;
    const expired: number = 1800 * jam;
    return jwt.sign(payload, secretKey, {
      expiresIn: expired,
      algorithm: "RS256"
    });
  };
}
