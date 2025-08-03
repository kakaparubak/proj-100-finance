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
import { Button } from "./ui/button";
import Link from "next/link";

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
        <CardTitle className="pl-2 font-mono text-2xl">Accounts</CardTitle>
        <CardAction className="">
          <NewAccountButton user={user} setLocalAccounts={setLocalAccounts} />
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {localAccounts.map((current) => {
          return (
              <Link
                key={current.id}
                href={`/dashboard/account/${current.id}`}
              >
                <div className="bg-muted/70 flex items-center justify-between rounded-lg px-3 py-2 w-full hover:bg-muted">
                  <div className="w-full">
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
              </Link>
          );
        })}
      </CardContent>
    </Card>
  );
}

export default Accounts;
