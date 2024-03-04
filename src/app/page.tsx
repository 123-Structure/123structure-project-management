"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
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
      <ScrollArea className="size-1/2 rounded-md border px-4">
        <DossierForm />
      </ScrollArea>
    </motion.main>
  );
}
