import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "@/styles/globals.css";
import ThemeProvider from "@/components/providers/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";
import UserProvider from "@/components/providers/UserProvider";
import { getUser } from "@/auth/server";
import { prisma } from "@/db/prisma";
import Header from "@/components/Header";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "100finance",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  let userInDB

  try {
    const user = await getUser();
    userInDB = await prisma.user.findUnique({
    where: {
      id: user?.id
    }
  })
  } catch {
    userInDB = null;
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <UserProvider user={userInDB}>
            <Header />
            <div className="pt-[60px]">{children}</div>
            <Toaster richColors />
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
