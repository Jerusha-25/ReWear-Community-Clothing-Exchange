import { motion } from "framer-motion";

interface BreathingElementProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
}

export function BreathingElement({ children, delay = 0, duration = 3 }: BreathingElementProps) {
  return (
    <motion.div
      animate={{
        scale: [1, 1.02, 1]
      }}
      transition={{
        duration,
        ease: "easeInOut",
        repeat: Infinity,
        delay
      }}
      className="breathing-element"
    >
      {children}
    </motion.div>
  );
}
