import { z } from "zod";

/**
 * Error schema
 */
export interface AccountUpdateErrorCode {
  code: string;
  message: string;
}

export const AccountUpdateErrors: { [key: string]: AccountUpdateErrorCode } = {
  NonEmptyAccountType: {
    code: "NonEmptyAccountType",
    message: "Non empty account role",
  },
  AccountNotFound: {
    code: "AccountNotFound",
    message: "User account not found",
  },
};

export class AccountUpdateError extends Error {
  code: AccountUpdateErrorCode;

  constructor(code: AccountUpdateErrorCode) {
    super(code.message);
    this.name = "AccountUpdateError";
    this.code = code;
  }
}

/**
 * Account parsing schema
 */
export const accountUpdateSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters",
    })
    .max(50, {
      message: "Username must be at most 50 characters",
    })
    .refine((s) => !s.includes(" "), "Username cannot contain spaces"),
  role: z.string().refine(
    (value) => {
      return value === "hunter" || value === "quester";
    },
    {
      message: "Invalid Role",
    }
  ),
  email: z.string().email(),
});
