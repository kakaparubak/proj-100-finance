"use client";
import React, { useTransition } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { userLoginAction, userSignupAction } from "@/actions/users";

interface AuthFormProps {
  type: "login" | "signup";
}

function AuthForm({ type }: AuthFormProps) {
  const isLogin = type === "login";
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;
      const displayname = formData.get("display-name") as string;

      let errorMessage;
      let title;
      let description;

      if (isLogin) {
        errorMessage = (await userLoginAction(email, password)).errorMessage;
        title = "Logged In";
        description = "You have been successfully logged in";
      } else {
        errorMessage = (await userSignupAction(displayname, email, password)).errorMessage;
        title = "Account Created";
        description =
          "Your account has been successfully created, check your email for a verification link";
      }

      if (errorMessage) {
        toast.error(errorMessage, {
          description: "Please try again",
        });
        return;
      }

      toast.success(title, {
        description,
      });

      if (isLogin) {
        router.replace("/dashboard");
      } else {
        router.push("/");
      }
    });
  };

  return (
    <div className="flex h-[calc(100vh-60px)] items-center justify-center px-4 font-sans">
      <Card className="bg-card shadow-accent/60 flex h-auto w-full max-w-lg flex-col justify-center py-8 shadow-[0_0_30px_rgba(0,0,0,0.1)]">
        <CardHeader>
          <CardTitle className="font-mono text-3xl font-bold">
            {isLogin ? "Welcome Back!" : "Happy to see you!"}
          </CardTitle>
          <CardDescription>
            {isLogin
              ? "Please log in to access your dashboard"
              : "Please sign up to create an account"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={handleSubmit}>
            <div className="flex flex-col gap-4">
            {!isLogin && (
              <div className="grid gap-2">
                <Label htmlFor="display-name">Display Name</Label>
                <Input
                  id="display-name"
                  type="text"
                  placeholder="Username"
                  disabled={isPending}
                  name="display-name"
                  required
                  className="font-mono"
                />
              </div>)}
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@email.com"
                  disabled={isPending}
                  name="email"
                  required
                  className="font-mono"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="********"
                  className="font-mono"
                  disabled={isPending}
                  required
                />
              </div>
            </div>
            <Button type="submit" variant="accent" className="mt-8 w-full">
              {isPending ? (
                <Loader2 className="animate-spin" />
              ) : isLogin ? (
                "Login"
              ) : (
                "Sign Up"
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-muted-foreground relative -top-3 flex justify-center text-sm">
          <p>
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <Link
              href={isLogin ? "/signup" : "/login"}
              className="cursor-pointer text-white underline-offset-3 hover:underline"
            >
              {isLogin ? "Sign Up" : "Login"}
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

export default AuthForm;
