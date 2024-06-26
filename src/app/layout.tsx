import PageTransition from "@/components/PageTransition";
import AuthProvider from "@/components/auth/AuthProvider";
import SessionProviderWrapper from "@/components/auth/SessionProviderWrapper";
import Menu from "@/components/menu/Menu";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import ThemeToggle from "@/components/theme/ThemeToggle";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import type { Session } from "next-auth";
import { Inter } from "next/font/google";
import { ReactNode } from "react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "123 Structure",
  description: "Un outils pour la gestion de dossier et l'accès à diver outils",
};

export default function RootLayout({
  children,
  session,
}: {
  children: ReactNode;
  session: Session;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          "bg-background font-sans antialiased flex flex-col min-h-screen",
          inter.className
        )}
      >
        <SessionProviderWrapper session={session}>
          <ThemeProvider
            attribute="class"
            // defaultTheme="system"
            // enableSystem
            // disableTransitionOnChange
          >
            <div className="fixed bottom-8 right-8 z-50">
              <ThemeToggle />
            </div>
            <Menu />
            <main className="grow">
              <AuthProvider>
                <PageTransition>{children}</PageTransition>
              </AuthProvider>
            </main>
            <Toaster expand={true} richColors />
          </ThemeProvider>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
