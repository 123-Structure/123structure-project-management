"use client";
import prisma from "@/lib/prisma/prisma";
import { Variants, motion } from "framer-motion";
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
  return (
    <motion.main
      className="flex h-screen w-screen flex-col items-center justify-center gap-4"
      variants={MainVariants}
      initial="hidden"
      animate="visible"
    >
      <p className="text-2xl font-semibold">🏡 123 Structure</p>
      <div className="w-1/2">
        <DossierForm />
      </div>
    </motion.main>
  );
}
