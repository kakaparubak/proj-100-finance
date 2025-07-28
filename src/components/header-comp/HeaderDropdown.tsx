import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getUser } from "@/auth/server";
import { prisma } from "@/db/prisma";
import { ModeToggleDropdown } from "../ui/mode-toggle";
import { LogOutDropdownItem } from "../LogOutButton";

async function HeaderDropdown() {
  const currentUser = await getUser();
  const userInDB = await prisma.user.findFirst({
    where: {
      id: currentUser?.id,
    },
  });
  const userInitial = userInDB?.name?.slice(0, 1).toLocaleUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer hover:scale-105">
          <AvatarFallback>{userInitial}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="font-sans w-56" align="end" alignOffset={-10} sideOffset={20}>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <ModeToggleDropdown />
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <LogOutDropdownItem />
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default HeaderDropdown;
