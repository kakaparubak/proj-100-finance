"use client";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { User } from "@supabase/supabase-js";
import { createTransactionAction } from "@/actions/transaction";

interface NewTransactionButtonProps {
  user: User | null,
  accountId: string | null;
  children: React.ReactNode;
}

function NewTransactionButton({ user, accountId, children }: NewTransactionButtonProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleClickNewTransactionButton = async (formData: FormData) => {
    if (!user) {
      router.push("/login");
      return;
    }

    startTransition(async () => {
      const transactionName = formData.get("name") as string;
      const transactionAmount = formData.get("amount") as string;
      const transactionId = uuidv4();
      const transactionIsIncome = formData.get("isIncome") as string == "Income";

      const {errorMessage, currentTransactions} = await createTransactionAction({
        accountId,
        transactionName,
        transactionAmount,
        transactionId,
        transactionIsIncome,
      }
      );

      if (errorMessage) {
        toast.error("Failed creating transaction, please try again", {
          description: errorMessage,
        });
        return;
      }

      toast.success(`Transaction ${transactionName} successfully created`);
      setIsDialogOpen(false);
    });
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="font-sans sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-mono text-2xl font-bold">Create new transaction</DialogTitle>
          <DialogDescription>
            Create a new transaction for this account
          </DialogDescription>
        </DialogHeader>
        <form action={handleClickNewTransactionButton}>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name">Transaction Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Account name"
                className="font-mono"
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="amount">Account Balance</Label>
              <Input
                id="amount"
                name="amount"
                type="number"
                required
                placeholder="$100"
                className="font-mono"
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="isIncome">Transaction Type</Label>
              <Input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Account name"
                className="font-mono"
              />
            </div>
          </div>
          <div className="mt-4 flex items-center justify-end gap-3">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              type="submit"
              variant={"accent"}
              className="w-22"
              disabled={isPending}
            >
              {isPending ? <Loader2 className="animate-spin" /> : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default NewTransactionButton;
