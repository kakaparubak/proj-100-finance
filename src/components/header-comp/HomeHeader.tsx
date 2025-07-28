import Link from "next/link";
import { getUser } from "@/auth/server";
import { Button } from "../ui/button";
import { ModeToggle } from "../ui/mode-toggle";
import { LogOutButton } from "../LogOutButton";

async function HomeHeader() {
  const currentUser = await getUser();

  return (
    <>
      {currentUser ? (
        <header className="bg-card border-accent fixed flex w-screen items-center justify-between border-b-[1px] px-4 py-3 font-sans">
          <h1 className="pl-2 font-mono text-3xl font-bold tracking-tight text-green-400">
            <Link href="/">
              100<span className="text-foreground">finance</span>
            </Link>
          </h1>
          <div className="flex items-center gap-2">
            <LogOutButton />
            <ModeToggle />
          </div>
        </header>
      ) : (
        <header className="bg-card border-accent fixed flex w-screen items-center justify-between border-b-[1px] px-4 py-3 font-sans">
          <h1 className="pl-2 font-mono text-3xl font-bold tracking-tight text-green-400">
            <Link href="/">
              100<span className="text-foreground">finance</span>
            </Link>
          </h1>
          <div className="flex items-center gap-2">
            <Button asChild variant={"outline"}>
              <Link href={"/login"}>Login</Link>
            </Button>
            <Button asChild variant={"accent"}>
              <Link href={"/signup"}>Sign Up</Link>
            </Button>
            <ModeToggle />
          </div>
        </header>
      )}
    </>
  );
}

export default HomeHeader;