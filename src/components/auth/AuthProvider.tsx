"use client";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode } from "react";

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const pathName = usePathname();

  const { data: session, status } = useSession();

  const publicRoutes = ["/auth/connexion", "/auth/inscription"];

  if (status === "loading") {
    return (
      <div className="flex h-screen w-full items-center justify-center overflow-hidden">
        <div>Chargement...</div>
      </div>
    );
  }

  if (!session && !publicRoutes.includes(pathName)) {
    router.push("/auth/connexion");
  }

  return <>{children}</>;
};

export default AuthProvider;
