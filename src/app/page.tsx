"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Variants, motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import DossierForm from "../components/DossierForm";

const PageVariants: Variants = {
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

  if (status === "loading") {
    return (
      <motion.div
        className="flex h-screen w-screen items-center justify-center"
        variants={PageVariants}
        initial="hidden"
        animate="visible"
      >
        <div>Chargement...</div>
      </motion.div>
    );
  }

  if (!session) {
    router.push("auth/connexion");
  }

  return (
    <motion.div
      className="flex size-full gap-4"
      variants={PageVariants}
      initial="hidden"
      animate="visible"
    >
      <ScrollArea className="h-96 w-full rounded-md border p-4">
        <DossierForm />
      </ScrollArea>
    </motion.div>
  );
}
