"use client";
import { motion, Variants } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

const PageTransitionVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
};

interface IPageTransition {
  children: ReactNode;
  className?: string;
}

const PageTransition = (props: IPageTransition) => {
  const pathName = usePathname();

  return (
    <motion.div
      className={props.className}
      style={{
        padding: !pathName.includes("auth") ? "16px" : "overflow-hidden",
      }}
      variants={PageTransitionVariants}
      initial="hidden"
      animate="visible"
    >
      {props.children}
    </motion.div>
  );
};

export default PageTransition;
