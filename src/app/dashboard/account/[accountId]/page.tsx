import { getUser } from "@/auth/server";
import { Card } from "@/components/ui/card";
import { LuSquarePlus, LuTrash2 } from "react-icons/lu";
import { prisma } from "@/db/prisma";
import React from "react";
import DeleteAccountButton from "@/components/DeleteAccountButton";
import NewTransactionButton from "@/components/NewTransactionButton";

async function DynamicAccountPage({
  params,
}: {
  params: Promise<{ accountId: string }>;
}) {
  const { accountId } = await params;
  const user = await getUser();
  const account = await prisma.account.findUnique({
    where: {
      id: accountId,
      ownerId: user?.id,
    },
  });

  const transactions = await prisma.transaction.findMany({
    where: {
      ownerId: user?.id,
      accountId: account?.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  let errorMsg = "";
  if (!user) {
    errorMsg = "Please login or create an account to access an account.";
  } else if (!account) {
    errorMsg = "This account does not exist. Please try again.";
  }

  return (
    <div className="h-[calc(100dvh-60px)] w-dvw font-sans">
      {errorMsg && <h1>{errorMsg}</h1>}
      <div className="grid h-full w-full grid-cols-4 grid-rows-4 gap-3 p-6">
        <Card className="col-span-1 row-span-1 flex flex-row items-center justify-between p-8">
          <div>
            <h3 className="text-muted-foreground font-mono text-2xl font-bold">
              {account?.name}
            </h3>
            <p className="text-foreground font-sans text-3xl font-bold">
              Rp{account?.strAmount}
            </p>
          </div>
          <div className="relative flex items-center gap-3">
            <NewTransactionButton user={user} accountId={accountId}>
              <LuSquarePlus className="text-accent-green-foreground text-3xl" />
            </NewTransactionButton>
            <DeleteAccountButton accountId={accountId}>
              <LuTrash2 className="relative -top-[1px] text-3xl text-red-400" />
            </DeleteAccountButton>
          </div>
        </Card>
        <Card className="flex flex-col items-center justify-between p-3">
          <p className="text-muted-foreground font-mono">Latest Transaction</p>
          <p
            className={`${transactions[0]?.isIncome ? "text-green-400" : "text-red-400"} text-3xl font-bold`}
          >
            Rp{transactions[0]?.strAmount}
          </p>
          <div className="flex items-center justify-center gap-2">
            <p className="m-0 p-0 font-mono text-lg/[1] font-medium">
              {transactions[0]?.name}
            </p>
            <p className="text-muted-foreground text-md/[1] m-0 p-0">
              {transactions[0]?.createdAt
                ? `${transactions[0]?.createdAt.toLocaleDateString("en-US", {})}`
                : ""}
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default DynamicAccountPage;
