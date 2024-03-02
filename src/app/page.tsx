"use client";
import { MotionButton } from "@/components/ui/button";
import { Variants, motion } from "framer-motion";
import { toast } from "sonner";

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
        onClick={() =>
          toast("Event has been created", {
            description: "Sunday, December 03, 2023 at 9:00 AM",
            action: {
              label: "Undo",
              onClick: () => console.log("Undo"),
            },
          })
        }
        variants={BoilerplateButtonVariants}
        initial="hidden"
        animate="visible"
      >
        Show Toast
      </MotionButton>
    </motion.main>
  );
}
