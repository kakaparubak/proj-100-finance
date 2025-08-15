"use client";
import Link from "next/link";
import React from "react";
import { ModeToggle } from "../ui/mode-toggle";
import HeaderDropdown from "./HeaderDropdown";

function DashboardHeader() {
  return (
    <header className="bg-card border-accent fixed flex w-screen items-center justify-between border-b-[1px] px-4 py-3 font-sans">
      <h1 className="pl-2 font-mono text-3xl font-bold tracking-tight text-green-400">
        <Link href="/dashboard">
          100<span className="text-foreground">finance</span>
        </Link>
      </h1>
      <div className="flex items-center gap-2">
        <ModeToggle />
        <HeaderDropdown />
      </div>
    </header>
  );
}
  
export default DashboardHeader;
