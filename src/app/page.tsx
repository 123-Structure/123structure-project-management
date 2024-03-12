"use client";
import PageTransition from "@/components/PageTransition";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const pathName = usePathname();
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <PageTransition className="flex h-screen w-screen items-center justify-center">
        <div>Chargement...</div>
      </PageTransition>
    );
  }

  if (!session) {
    router.push("auth/connexion");
  }

  return (
    <PageTransition>
      <h1>Espace personnel</h1>
    </PageTransition>
  );
}
