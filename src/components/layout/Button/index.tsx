import { motion } from 'framer-motion';
import React from 'react';

interface ButtonProps {
  isActive: boolean;
  toggleMenu: () => void;
}

interface PerspectiveTextProps {
  label: string;
}

const PerspectiveText: React.FC<PerspectiveTextProps> = ({ label }) => {
  return (
    <div className='flex flex-col justify-center items-center h-full w-full [transform-style:preserve-3d] transition-transform duration-[750ms] ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:rotate-x-90'>
      <p className='m-0 transition-all duration-[750ms] ease-[cubic-bezier(0.76,0,0.24,1)] uppercase pointer-events-none group-hover:-translate-y-full group-hover:opacity-0'>
        {label}
      </p>
      <p className='m-0 absolute [transform-origin:bottom_center] -rotate-x-90 translate-y-[9px] opacity-0 transition-all duration-[750ms] ease-[cubic-bezier(0.76,0,0.24,1)] uppercase pointer-events-none group-hover:opacity-100'>
        {label}
      </p>
    </div>
  );
};

export default function Button({ isActive, toggleMenu }: ButtonProps) {
  return (
    <div className='absolute top-0 right-0 w-[100px] h-[40px] cursor-pointer rounded-[25px] overflow-hidden'>
      <motion.div
        className='relative w-full h-full'
        animate={{ top: isActive ? '-100%' : '0%' }}
        transition={{ duration: 0.5, type: 'tween', ease: [0.76, 0, 0.24, 1] }}
      >
        <div className='w-full h-full bg-[#c9fd74] group' onClick={toggleMenu}>
          <PerspectiveText label='Menu' />
        </div>
        <div
          className='w-full h-full bg-black text-[#c9fd74] group'
          onClick={toggleMenu}
        >
          <PerspectiveText label='Close' />
        </div>
      </motion.div>
    </div>
  );
}
