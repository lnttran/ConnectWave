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
