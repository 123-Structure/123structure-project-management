"use client";
import SignUp from "@/components/auth/SignUp";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const { data: session } = useSession();

  if (session) {
    router.push("/");
  }

  return (
    <>
      <p className="text-3xl font-bold">Inscription</p>
      <p className="text-xl">
        Vous serez ensuite redirigé vers la page de connexion
      </p>
      <div className="mt-2 flex flex-col gap-2">
        <SignUp />
        <div className="flex items-center justify-center gap-1 ">
          <p>Vous avez déjà un compte ?</p>
          <Button
            variant={"link"}
            onClick={() => router.push("/auth/connexion")}
          >
            <p className="font-bold">Se connecter</p>
          </Button>
        </div>
      </div>
    </>
  );
};

export default Page;
