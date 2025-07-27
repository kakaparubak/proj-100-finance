"use client";
import React, { useTransition } from 'react'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'
import { userLogoutAction } from '@/actions/users';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

function LogOutButton() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleLogOut = () => {
    startTransition(async () => {
      const errorMessage = (await userLogoutAction()).errorMessage;

      if (errorMessage) {
        toast.error("Failed logging out...", {
          description: errorMessage,
        })
        return;
      }

      toast.success("Succesfully logged out");
      router.replace("/");
    })
  }

  return (
    <Button variant="outline" className='w-24' onClick={handleLogOut}>
      {isPending ? <Loader2 className='animate-spin' /> : "Log Out"}
    </Button>
  )
}

export default LogOutButton