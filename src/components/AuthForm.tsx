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

interface AuthFormProps {
  type: "login" | "signup";
}

function AuthForm({ type }: AuthFormProps) {
  const isLogin = type === "login";
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      // Simulate form submission
      setTimeout(() => {
        toast.success(
          isLogin ? "Logged in successfully!" : "Signed up successfully!",
        );
        console.log(
          "Form submitted:",
          formData.get("email"),
          formData.get("password"),
        );
      }, 3000);
      
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
            <div className="flex flex-col gap-6">
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
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
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
