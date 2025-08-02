"use client"
import { deleteAccountAction } from "@/actions/accounts";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Loader2, Trash2 } from "lucide-react";

interface DeleteAccountButtonProps {
  accountId: string,
  deleteNoteLocally: (accountId: string) => void
}

function DeleteAccountButton({accountId, deleteNoteLocally}: DeleteAccountButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDeleteAccountButtonClick = () => {
    startTransition(async () => {
      const {errorMessage} = await deleteAccountAction(accountId);

      if (errorMessage) {
        toast.error("Error deleting account", {
          description: errorMessage
        })
        return;
      }

      deleteNoteLocally(accountId);

      toast.success("Account deleted");
      setIsDialogOpen(false);
    })
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant={"destructive"}><Trash2 /></Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure you want to delete this account?</DialogTitle>
          <DialogDescription>Once deleted, this account will not be able to be brought back</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild><Button variant={"outline"}>Cancel</Button></DialogClose>
          <Button onClick={handleDeleteAccountButtonClick} variant={"destructive"}>{isPending? <Loader2 className="animate-spin" /> : "Delete"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteAccountButton