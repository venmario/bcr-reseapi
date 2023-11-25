import bcrypt from "bcryptjs";
export async function encryptedPassword(
  password: string,
  salt: number
): Promise<string> {
  return await bcrypt.hash(password, salt);
}
