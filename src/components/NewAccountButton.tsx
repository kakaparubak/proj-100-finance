"use client";
import { createAccountAction } from "@/actions/accounts";
import { useRouter } from "next/navigation";
import { SetStateAction, useState, useTransition } from "react";
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

interface NewAccountButtonProps {
  user: User | null,
  setLocalAccounts: (value: SetStateAction<{
    name: string;
    id: string;
    amount: number;
    strAmount: string;
    ownerId: string;
    createdAt: Date;
    updatedAt: Date;
}[]>) => void
}

function NewAccountButton({ user, setLocalAccounts }: NewAccountButtonProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleClickNewAccountButton = async (formData: FormData) => {
    if (!user) {
      router.push("/login");
      return;
    }

    startTransition(async () => {
      const accountName = formData.get("name") as string;
      const accountBalance = formData.get("balance") as string;
      const accountId = uuidv4();

      const {errorMessage, currentAccount} = await createAccountAction(
        accountId,
        accountName,
        accountBalance,
      );

      if (errorMessage) {
        toast.error("Failed creating account, please try again", {
          description: errorMessage,
        });
        return;
      }

      setLocalAccounts(currentAccount);

      toast.success(`Account "${accountName}" successfully created`);
      setIsDialogOpen(false);
    });
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="accent" className="font-sans">
          New Account
        </Button>
      </DialogTrigger>
      <DialogContent className="font-sans sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-mono text-2xl font-bold">Create new account</DialogTitle>
          <DialogDescription>
            Create a new account for your transactions.
          </DialogDescription>
        </DialogHeader>
        <form action={handleClickNewAccountButton}>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name">Account Name</Label>
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
              <Label htmlFor="balance">Account Balance</Label>
              <Input
                id="balance"
                name="balance"
                type="number"
                required
                placeholder="$100"
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

export default NewAccountButton;
