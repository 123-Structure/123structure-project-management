"use client";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Variants, motion } from "framer-motion";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import DossierForm from "../components/DossierForm";
import { LogOut } from "lucide-react";

const MainVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
};

export default function Home() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const handleSignOut = () => {
    signOut({ redirect: false });
    router.push("/auth/connexion");
    toast.success("Authentification", {
      description: `${session?.user.name} déconnecté avec succès.`,
    });
  };

  if (status === "loading") {
    return (
      <motion.main
        className="flex h-screen w-screen flex-col items-center justify-center gap-4"
        variants={MainVariants}
        initial="hidden"
        animate="visible"
      >
        <div>Chargement...</div>
      </motion.main>
    );
  }

  if (!session) {
    router.push("auth/connexion");
  }

  return (
    <motion.main
      className="flex h-screen w-screen flex-col items-center justify-center gap-4"
      variants={MainVariants}
      initial="hidden"
      animate="visible"
    >
      <p className="text-2xl font-semibold">
        Bienvenue, {session?.user.name} !
      </p>
      <p className="text-2xl font-semibold">
        Votre adresse e-mail est : {session?.user.email}
      </p>
      <Button onClick={handleSignOut}>
        <LogOut className="mr-2 size-4" />
        Déconnexion
      </Button>
      <p className="text-2xl font-semibold">🏡 123 Structure</p>
      <ScrollArea className="size-1/2 rounded-md border px-4">
        <DossierForm />
      </ScrollArea>
    </motion.main>
  );
}
