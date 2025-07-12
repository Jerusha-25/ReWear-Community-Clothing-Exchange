import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}

export function ScrollReveal({ children, delay = 0, direction = 'up' }: ScrollRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const directionVariants = {
    up: { y: 30 },
    down: { y: -30 },
    left: { x: -30 },
    right: { x: 30 }
  };

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        ...directionVariants[direction]
      }}
      animate={isInView ? {
        opacity: 1,
        x: 0,
        y: 0
      } : {
        opacity: 0,
        ...directionVariants[direction]
      }}
      transition={{
        duration: 0.8,
        ease: "easeOut",
        delay: isInView ? delay : 0
      }}
    >
      {children}
    </motion.div>
  );
}
