/* eslint-disable react/no-unescaped-entities */
"use client";
import SignIn from "@/components/auth/SignIn";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";

const Page = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const { data: session } = useSession();

  if (session) {
    router.push("/");
  }

  return (
    <>
      <p className="text-3xl font-bold">Connexion</p>
      <p className="text-xl">
        Vous devez être connecté pour accéder à cette page
      </p>
      <div className="mt-2 flex flex-col gap-2">
        <SignIn />
        <div className="flex items-center justify-center gap-1 ">
          <p>Vous n'avez pas de compte ?</p>
          <Button
            className={theme === "dark" ? "text-slate-50" : "text-slate-950"}
            variant={"link"}
            onClick={() => router.push("/auth/inscription")}
          >
            <p className="font-bold">S'inscrire</p>
          </Button>
        </div>
      </div>
    </>
  );
};

export default Page;
