"use client";;
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

const SessionProviderWrapper = (
    {
      children,
      session,
    }: {
      children: ReactNode;
      session: Session;
    }
) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};


export default SessionProviderWrapper;