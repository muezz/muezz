import { motion, MotionValue, useTransform } from 'framer-motion';
import Image from 'next/image';
import React from 'react';

interface DecorationProps {
  className?: string;
}

const AboutSection = ({
  scrollYProgress,
}: {
  scrollYProgress: MotionValue<number>;
}) => {
  const decorativeImageVariants = {
    initial: {
      opacity: 0,
      scale: 0.8,
      x: 50,
    },
    animate: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
    hover: {
      scale: 1.1,
      rotate: 5,
      transition: { duration: 0.3 },
    },
  };

  const leftDecorativeImageVariants = {
    initial: {
      opacity: 0,
      scale: 0.8,
      x: -50,
    },
    animate: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
    hover: {
      scale: 1.1,
      rotate: -5,
      transition: { duration: 0.3 },
    },
  };

  const contentVariants = {
    initial: {
      opacity: 0,
      x: -50,
    },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  const contentVariantsLeft = {
    initial: { opacity: 0, x: 50 },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
    hover: {
      // scale: 1.02,
      transition: { duration: 0.3 },
    },
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 },
    },
    tap: {
      scale: 0.95,
    },
  };

  const Arrows: React.FC<DecorationProps> = ({ className = '' }) => (
    <motion.div
      variants={decorativeImageVariants}
      initial='initial'
      whileInView='animate'
      whileHover='hover'
      viewport={{ once: true }}
    >
      <Image
        src='/svg/about/smallarrow.svg'
        alt='decorative arrows'
        width={80}
        height={20}
        className={className}
      />
    </motion.div>
  );

  const Dots: React.FC<DecorationProps> = ({ className = '' }) => (
    <motion.div
      variants={decorativeImageVariants}
      initial='initial'
      whileInView='animate'
      whileHover='hover'
      viewport={{ once: true }}
    >
      <Image
        src='/svg/about/dots.svg'
        alt='decorative dots'
        width={60}
        height={120}
        className={className}
      />
    </motion.div>
  );

  const Logo: React.FC<DecorationProps> = ({ className = '' }) => (
    <motion.div
      variants={leftDecorativeImageVariants}
      initial='initial'
      whileInView='animate'
      whileHover='hover'
      viewport={{ once: true }}
    >
      <Image
        src='/svg/logo.svg'
        alt='decorative logo'
        width={50}
        height={50}
        className={className}
      />
    </motion.div>
  );

  const PurpleArrows: React.FC<DecorationProps> = ({ className = '' }) => (
    <motion.div
      variants={leftDecorativeImageVariants}
      initial='initial'
      whileInView='animate'
      whileHover='hover'
      viewport={{ once: true }}
      className={`flex flex-col gap-1.5 ${className}`}
    >
      <Image
        src='/svg/about/leftarrows.svg'
        alt='decorative arrows'
        width={250}
        height={120}
      />
    </motion.div>
  );

  const YellowArrow: React.FC<DecorationProps> = ({ className = '' }) => (
    <motion.div
      variants={decorativeImageVariants}
      initial='initial'
      whileInView='animate'
      whileHover='hover'
      viewport={{ once: true }}
      className={`flex flex-col gap-1.5 ${className}`}
    >
      <Image
        src='/svg/about/yellowarrow.svg'
        alt='decorative yellow arrow'
        width={50}
        height={80}
      />
    </motion.div>
  );

  const scale = useTransform(scrollYProgress, [0.5, 1], [0.8, 1]);
  const rotate = useTransform(scrollYProgress, [0.5, 1], [5, 0]);

  return (
    <motion.div
      style={{ scale, rotate }}
      className=' h-screen bg-black overflow-hidden relative mx-auto'
    >
      <div
        className='absolute inset-0 bg-[#1a0b2e]'
        style={{
          background:
            'radial-gradient(circle at bottom right, #1a0b2e 0%, #000000 40%)',
        }}
      />

      <div className='hidden md:block'>
        <PurpleArrows className='absolute top-12 left-24' />
        <Dots className='absolute top-4 right-48 lg:right-96' />
        <Logo className='absolute top-16 right-16' />
        <Arrows className='absolute right-12 hidden lg:block xl:right-36 top-[40%]' />
        <Dots className='absolute bottom-0 lg:bottom-16 left-36 rotate-90' />
        <YellowArrow className='absolute bottom-12 lg:bottom-28 right-48' />
      </div>

      <div className='md:hidden'>
        <Dots className='absolute top-8 right-4' />
        <Dots className='absolute bottom-12 left-24 rotate-90' />
      </div>

      <div className='relative z-10 flex justify-center items-center h-[100vh] px-4 py-16'>
        <motion.div
          className='w-[85%] lg:w-[70%] mx-auto flex-col items-center justify-center'
          variants={contentVariants}
          initial='initial'
          whileInView='animate'
          viewport={{ once: true }}
        >
          <div className='flex md:justify-center justify-start flex-col md:flex-row items-start md:items-center'>
            <motion.h2
              className='text-4xl md:w-1/2 md:text-6xl font-bold text-white mb-8 font-mono'
              variants={contentVariants}
            >
              About Us
            </motion.h2>
            <motion.p
              className='text-gray-400 md:w-1/2 font-mono leading-relaxed mb-12 text-lg'
              variants={contentVariantsLeft}
            >
              I’m a passionate software engineer who crafts elegant solutions
              for web and mobile platforms. Whether it’s building scalable web
              applications or creating seamless user experiences, I bring ideas
              to life with code and creativity.
            </motion.p>
          </div>
          <div className='justify-self-center'>
            <motion.a
              href='/'
              className='bg-[#C1FF00] hover:bg-[#d4ff4d] text-black px-8 py-3 rounded-full font-medium inline-block'
              variants={buttonVariants}
              initial='initial'
              whileHover='hover'
              whileTap='tap'
            >
              Learn More
            </motion.a>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AboutSection;
