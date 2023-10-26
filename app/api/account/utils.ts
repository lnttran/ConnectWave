import prisma from "@/lib/prisma";
import { AccountType, User } from "@prisma/client";
import { AccountUpdateError, AccountUpdateErrors } from "./error";

interface UpdateUserData {
  email: string;
  username: string;
  role: string;
}

export const updateUser = async (userData: UpdateUserData): Promise<User> => {
  const accountType: AccountType =
    userData.role.toLowerCase() === "hunter"
      ? AccountType.Hunter
      : AccountType.Quester;

  const existingUser = await prisma.user.findUnique({
    where: {
      email: userData.email,
    },
  });

  if (!existingUser) {
    throw new AccountUpdateError(AccountUpdateErrors.AccountNotFound);
  } else if (existingUser.accountType !== "Undecided") {
    throw new AccountUpdateError(AccountUpdateErrors.NonEmptyAccountType);
  }

  const updatedUser = await prisma.user.update({
    where: {
      email: userData.email,
    },
    data: {
      username: userData.username,
      accountType: accountType,
    },
  });
  return updatedUser;
};
