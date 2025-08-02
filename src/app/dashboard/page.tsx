import { getUser } from "@/auth/server";
import Accounts from "@/components/Accounts";
import { prisma } from "@/db/prisma";
import React from "react";
import { Account } from "@prisma/client";

async function Dashboard() {
  const user = await getUser();

  let accounts: Account[] = [];

  if (user) {
    accounts = await prisma.account.findMany({
      where: {
        ownerId: user?.id,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });
  }

  return (
    <div className="grid h-[calc(100dvh-60px)] w-screen grid-flow-row grid-cols-3 grid-rows-1 gap-4 p-8">
      <Accounts accounts={accounts} user={user} />
      <div className="bg-background-lighter rounded-xl p-6">
        <h2 className="px-2 font-mono text-xl font-medium">Transactions</h2>
      </div>
      <div className="bg-background-lighter rounded-xl p-6">
        <h2 className="px-2 font-mono text-xl font-medium">Goals</h2>
      </div>
    </div>
  );
}

export default Dashboard;
