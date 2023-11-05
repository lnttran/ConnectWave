import prisma from "@/lib/singleton/prisma";
import { AccountType, User } from "@prisma/client";
import { AccountUpdateError, AccountUpdateErrors } from "./schema";
import { redirect } from "next/navigation";

interface UserData {
  email: string;
}

export const getUser = async (userData: UserData): Promise<User | null> => {
  return await prisma.user.findUnique({
    where: {
      email: userData.email,
    },
  });
};

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

interface UpdateBalance {
  userId: string;
  email: string;
  balance: number;
}
export async function updateBalance({ userId, email, balance }: UpdateBalance) {
  return await prisma.user.update({
    where: {
      id: userId,
      email: email,
    },
    data: {
      creditBalance: {
        increment: balance,
      },
    },
  });
}

export async function getBalance({ email }: { email: string }) {
  return await prisma.user.findUniqueOrThrow({
    where: {
      email: email,
    },
    select: {
      creditBalance: true,
    },
  });
}
