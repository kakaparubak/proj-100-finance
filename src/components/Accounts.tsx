"use client";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import DeleteAccountButton from "./DeleteAccountButton";
import { Account } from "@prisma/client";
import { useEffect, useState } from "react";
import NewAccountButton from "./NewAccountButton";
import { User } from "@supabase/supabase-js";

interface AccountsProp {
  accounts: Account[];
  user: User | null;
}

function Accounts({ accounts, user }: AccountsProp) {
  const [localAccounts, setLocalAccounts] = useState(accounts);

  useEffect(() => {
    setLocalAccounts(accounts);
  }, [accounts]);

  const handleDeleteNoteLocally = (accountId: string) => {
    setLocalAccounts((prevAccounts) =>
      prevAccounts.filter((account) => account.id !== accountId),
    );
  };

  return (
    <Card className="bg-background-lighter rounded-xl">
      <CardHeader className="flex w-full items-center justify-between gap-2">
        <CardTitle className="font-mono text-2xl pl-2">Accounts</CardTitle>
        <CardAction className="">
          <NewAccountButton user={user} setLocalAccounts={setLocalAccounts} />
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {localAccounts.map((current) => {
          return (
            <div
              key={current.id}
              className="bg-muted flex items-center justify-between rounded-lg px-3 py-2"
            >
              <div>
                <h3 className="text-foreground font-sans text-lg">
                  {current.name}
                </h3>
                <p className="text-muted-foreground font-sans">
                  Rp. {current.amount}
                </p>
              </div>
              <DeleteAccountButton
                accountId={current.id}
                deleteNoteLocally={handleDeleteNoteLocally}
              />
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}

export default Accounts;
