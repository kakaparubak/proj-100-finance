"use server";

import { getUser } from "@/auth/server";
import { prisma } from "@/db/prisma";
import { handleError } from "@/lib/utils";

interface createTransactionActionProps {
  accountId: string | null;
  transactionId: string;
  transactionName: string;
  transactionAmount: string;
  transactionIsIncome: boolean;
}

export const createTransactionAction = async ({
  accountId,
  transactionId,
  transactionName,
  transactionAmount,
  transactionIsIncome
}: createTransactionActionProps) => {
  try {
    const user = await getUser();
    if (!user) throw new Error("You must be logged in to create an account");
    if (!accountId)
      throw new Error("You must have a valid account to create a transaction");

    await prisma.transaction.create({
      data: {
        id: transactionId,
        amount: Number(transactionAmount),
        strAmount: new Intl.NumberFormat().format(Number(transactionAmount)),
        isIncome: transactionIsIncome,
        name: transactionName,
        accountId: accountId,
        ownerId: user?.id,
      },
    });

    const currentTransactions = await prisma.transaction.findMany({
      where: {
        ownerId: user?.id,
        accountId: accountId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return { errorMessage: null, currentAccount: currentTransactions };
  } catch (error) {
    const { errorMessage } = handleError(error);
    return { errorMessage, currentTransactions: [] };
  }
};
