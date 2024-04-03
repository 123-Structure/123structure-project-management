"use client";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

const PageTransitionVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};

interface IPageTransition {
  children: ReactNode;
  className?: string;
}

const PageTransition = (props: IPageTransition) => {
  const pathName = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className={props.className}
        style={{
          padding: !pathName.includes("auth") ? "16px" : "overflow-hidden",
        }}
        variants={PageTransitionVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {props.children}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransition;
