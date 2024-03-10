"use client";
import { Variants, motion } from "framer-motion";

const MainVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.main
      className="flex h-screen w-screen"
      variants={MainVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="h-screen w-1/2 bg-primary" />
      <div className="flex h-screen  w-1/2 flex-col items-center justify-center gap-4">
        {children}
      </div>
    </motion.main>
  );
}
