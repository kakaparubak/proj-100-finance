"use server";

import { getUser } from "@/auth/server";
import { prisma } from "@/db/prisma";
import { handleError } from "@/lib/utils";

export const createAccountAction = async (accountId: string, accountName: string, accountAmount: string) => {
  try {
    const user = await getUser();
    if (!user) throw new Error("You must be logged in to create an account");

    await prisma.account.create({
      data: {
        id: accountId,
        name: accountName,
        amount: Number(accountAmount),
        strAmount: new Intl.NumberFormat().format(Number(accountAmount)),
        ownerId: user?.id
      }
    });

    const currentAccount = await prisma.account.findMany({
      where: {
        ownerId: user?.id
      },
      orderBy: {
        updatedAt: "desc"
      }
    })

    return { errorMessage: null, currentAccount: currentAccount };
  } catch (error) {
    const {errorMessage} = handleError(error);
    return { errorMessage, currentAccount: [] }
  }
};

export const deleteAccountAction = async (accountId: string) => {
  try {
    const user = await getUser();
    if (!user) throw new Error("You must be logged in to delete an account");

    await prisma.account.delete({
      where: {
        id: accountId,
        ownerId: user?.id
      }
    });

    return { errorMessage: null };
  } catch (error) {
    return handleError(error);
  }
};