import { motion } from 'framer-motion';
import Image from 'next/image';
import React from 'react';

import { StaggerChildren } from '@/components/Animtions/StaggerChildren';
import { StaggerItem } from '@/components/Animtions/StaggerItem';

interface ServicesProps {
  title: string;
  subtitle?: string;
  description: string;
  imageSrc: string;
  buttonText: string;
  buttonLink?: string;
}

const Services: React.FC<ServicesProps> = ({
  title,
  subtitle,
  description,
  imageSrc,
  buttonText,
  buttonLink = '#',
}) => {
  const decorativeImageVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
    hover: {
      scale: 1.1,
      rotate: 5,
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

  const serviceImageVariants = {
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
      scale: 1.02,
      transition: { duration: 0.3 },
    },
  };

  const contentVariants = {
    initial: { opacity: 0, x: -50 },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section className='bg-black overflow-hidden relative mx-auto min-h-screen'>
      <div
        className='absolute inset-0 bg-[#1a0b2e]'
        style={{
          background:
            'radial-gradient(circle at bottom right, #1a0b2e 0%, #000000 40%)',
        }}
      />

      <div className='hidden md:block'>
        <motion.div
          variants={decorativeImageVariants}
          initial='initial'
          whileInView='animate'
          whileHover='hover'
          viewport={{ once: true }}
        >
          <Image
            src='/svg/services/object.svg'
            alt='decorative lines'
            width={120}
            height={150}
            className='absolute top-16 left-0'
          />
        </motion.div>

        <motion.div
          variants={decorativeImageVariants}
          initial='initial'
          whileInView='animate'
          whileHover='hover'
          viewport={{ once: true }}
        >
          <Image
            src='/svg/logo.svg'
            alt='decorative lines'
            width={50}
            height={50}
            className='absolute top-16 right-16'
          />
        </motion.div>

        <motion.div
          variants={decorativeImageVariants}
          initial='initial'
          whileInView='animate'
          whileHover='hover'
          viewport={{ once: true }}
        >
          <Image
            src='/svg/services/object.svg'
            alt='decorative lines'
            width={120}
            height={150}
            className='absolute bottom-12 right-[-30px]'
          />
        </motion.div>
      </div>

      <StaggerChildren className='relative z-10 mx-auto px-4'>
        <div className='w-[90%] mx-auto flex justify-center gap-8 items-center flex-col md:flex-row h-[100vh]'>
          <motion.div
            className='content md:w-1/2'
            variants={contentVariants}
            initial='initial'
            whileInView='animate'
            viewport={{ once: true }}
          >
            <StaggerItem>
              <motion.h2 className='text-4xl md:text-6xl font-bold text-[#DAFB10] mb-8 font-mono'>
                {title}
              </motion.h2>
            </StaggerItem>

            {subtitle && (
              <StaggerItem>
                <motion.h3 className='hidden md:block text-3xl md:text-4xl text-white'>
                  {subtitle}
                </motion.h3>
              </StaggerItem>
            )}

            <StaggerItem className='block md:hidden my-4'>
              <motion.div
                variants={serviceImageVariants}
                initial='initial'
                whileInView='animate'
                whileHover='hover'
              >
                <Image
                  src={imageSrc}
                  alt='Service Illustration'
                  width={500}
                  height={500}
                  className='w-full'
                />
              </motion.div>
            </StaggerItem>

            <StaggerItem>
              <motion.p className='text-gray-400 font-mono py-8 leading-relaxed mb-12 text-lg'>
                {description}
              </motion.p>
            </StaggerItem>

            <StaggerItem>
              <motion.a
                href={buttonLink}
                className='bg-[#C1FF00] hover:bg-[#d4ff4d] text-black px-8 py-3 rounded-full font-medium inline-block'
                variants={buttonVariants}
                initial='initial'
                whileHover='hover'
                whileTap='tap'
              >
                {buttonText}
              </motion.a>
            </StaggerItem>
          </motion.div>

          <StaggerItem className='w-full md:w-1/2 hidden md:flex justify-center items-center'>
            <motion.div
              variants={serviceImageVariants}
              initial='initial'
              whileInView='animate'
              whileHover='hover'
              viewport={{ once: true }}
            >
              <Image
                src={imageSrc}
                alt='Service Illustration'
                width={500}
                height={500}
                className='w-full md:w-auto'
              />
            </motion.div>
          </StaggerItem>
        </div>
      </StaggerChildren>
    </section>
  );
};

export default Services;
