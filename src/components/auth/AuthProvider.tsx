"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex h-screen w-full items-center justify-center overflow-hidden">
        <div>Chargement...</div>
      </div>
    );
  }

  if (!session) {
    router.push("/auth/connexion");
  }

  return <>{children}</>;
};

export default AuthProvider;
