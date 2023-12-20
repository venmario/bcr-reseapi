import { User } from "../models/user";

export class AuthRepository {
  async findUserByEmail(email: string) {
    return await User.query().findOne("email", email);
  }
}
