import { getUser } from "@/auth/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LuCirclePlus, LuSquarePlus, LuTrash2 } from "react-icons/lu";
import { prisma } from "@/db/prisma";
import React from "react";

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
              Rp{account?.amount}
            </p>
          </div>
          <div className="flex gap-3 items-center relative">
            <LuSquarePlus className="text-accent-green-foreground text-3xl" />
            <LuTrash2 className="text-red-400 text-3xl relative -top-[1px]" />
          </div>
        </Card>
      </div>
    </div>
  );
}

export default DynamicAccountPage;
