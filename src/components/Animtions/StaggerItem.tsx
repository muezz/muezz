import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface StaggerItemProps {
  children: ReactNode;
  duration?: number;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
}

export const StaggerItem = ({
  children,
  duration = 0.8,
  className = '',
  direction = 'down',
}: StaggerItemProps) => {
  const initialPosition = (() => {
    switch (direction) {
      case 'up':
        return { y: -20 };
      case 'down':
        return { y: 20 };
      case 'left':
        return { x: -20 };
      case 'right':
        return { x: 20 };
      default:
        return {};
    }
  })();

  const itemVariants = {
    hidden: { opacity: 0, ...initialPosition },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
};
