import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface StaggerChildrenProps {
  children: ReactNode;
  staggerDelay?: number;
  className?: string;
}

export const StaggerChildren = ({
  children,
  staggerDelay = 0.2,
  className = '',
}: StaggerChildrenProps) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial='hidden'
      animate='visible'
      className={className}
    >
      {children}
    </motion.div>
  );
};
