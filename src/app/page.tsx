"use client";
import SignUp from "@/components/SignUp";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Variants, motion } from "framer-motion";
import { signIn, signOut, useSession } from "next-auth/react";
import DossierForm from "../components/DossierForm";

const MainVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
};

export default function Home() {
  const { data: session, status } = useSession();

  const handleSignIn = () => {
    signIn();
  };

  if (status === "loading") {
    return <div>Chargement...</div>;
  }

  if (!session) {
    return (
      <div>
        <p className="text-2xl font-semibold">
          Vous devez être connecté pour accéder à cette page.
        </p>
        <Button onClick={handleSignIn}>Se connecter</Button>
        <SignUp />
      </div>
    );
  }

  return (
    <motion.main
      className="flex h-screen w-screen flex-col items-center justify-center gap-4"
      variants={MainVariants}
      initial="hidden"
      animate="visible"
    >
      <p className="text-2xl font-semibold">Bienvenue, {session.user.name} !</p>
      <p className="text-2xl font-semibold">
        Votre adresse e-mail est : {session.user.email}
      </p>
      <Button onClick={() => signOut()}>Déconnexion</Button>
      <p className="text-2xl font-semibold">🏡 123 Structure</p>
      <ScrollArea className="size-1/2 rounded-md border px-4">
        <DossierForm />
      </ScrollArea>
    </motion.main>
  );
}
