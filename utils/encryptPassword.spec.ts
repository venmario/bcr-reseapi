import { describe, expect, it } from "vitest";
import { encryptedPassword } from "./encryptPassword";
import bcrypt from "bcryptjs";

describe("Test password encryption", () => {
  it("should be hash the password", async () => {
    const salt: number = 9;
    const passwordSuperAdmin: string = "superadmin";
    const encryptedPwd = await encryptedPassword(passwordSuperAdmin, salt);
    expect(await bcrypt.compare(passwordSuperAdmin, encryptedPwd)).toBe(true);
  });
});
