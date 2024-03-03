"use client";
import { MotionButton } from "@/components/ui/button";
import { Variants, motion } from "framer-motion";
import { toast } from "sonner";
import DossierForm from "../components/DossierForm";
import { createDossier } from "../lib/prisma/Dossier";

const BoilerplateTextVariants: Variants = {
  hidden: {
    x: -50,
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
  },
};

const BoilerplateButtonVariants: Variants = {
  hidden: {
    x: -50,
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      delay: 0.2,
    },
  },
};

export default function Home() {
  return (
    <motion.main
      className="flex h-screen w-screen flex-col items-center justify-center gap-4"
      variants={BoilerplateTextVariants}
      initial="hidden"
      animate="visible"
    >
      <p className="text-2xl font-semibold">🚀 Baptiste LECHAT Boilerplate</p>
      <MotionButton
        variant="outline"
        onClick={async () => {
          const result = await createDossier({
            numDossier: "123",
            nomDossier: "Mon dossier",
            cp: "75000",
            ville: "Paris",
            constructeur: "Constructeur SA",
            dessinePar: "Jean Dupont",
          });
          toast(result.message);
        }}
        variants={BoilerplateButtonVariants}
        initial="hidden"
        animate="visible"
      >
        Create User
      </MotionButton>
      <div className="w-1/2">
        <DossierForm />
      </div>
    </motion.main>
  );
}
