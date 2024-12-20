import { motion, MotionValue, useTransform } from 'framer-motion';
import Image from 'next/image';
import React from 'react';

import { StaggerChildren } from '@/components/Animtions/StaggerChildren';
import { StaggerItem } from '@/components/Animtions/StaggerItem';

const Hero = ({
  scrollYProgress,
}: {
  scrollYProgress: MotionValue<number>;
}) => {
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const rotate = useTransform(scrollYProgress, [0, 0.5], [0, -5]);

  return (
    <motion.div
      style={{ scale, rotate }}
      className='h-screen w-full grid place-content-center bg-[#0A0720] relative'
    >
      <div className='absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_10%,#000_70%,transparent_100%)]'></div>
      <div
        className='absolute inset-0'
        style={{
          background:
            'radial-gradient(70% 50% at 50% 25%, rgba(28, 116, 217, 0.15) 0%, transparent 70%)',
        }}
      />
      <div
        className='absolute inset-0'
        style={{
          background:
            'radial-gradient(70% 50% at 50% 75%, rgba(28, 116, 217, 0.15) 0%, transparent 70%)',
        }}
      />

      <StaggerChildren className='relative z-10 h-full w-[90%] md:w-[75%] mx-auto flex items-center'>
        <div className='flex justify-between flex-col md:flex-row gap-8 md:gap-0 items-center w-full'>
          <div className='flex-1'>
            <StaggerItem>
              <h1
                className='text-2xl md:text-6xl font-bold text-white leading-snug tracking-wide'
                style={{ textShadow: '0px 10px 15px #000000C7' }}
              >
                WORLD OF CREATIVE SOLUTIONS
              </h1>
            </StaggerItem>
            <StaggerItem>
              <p
                className='text-2xl md:text-3xl text-white/90 mt-6 font-mono leading-relaxed'
                style={{ textShadow: '0px 10px 15px #000000C7' }}
              >
                Lets make the digital world more exciting!
              </p>
            </StaggerItem>
          </div>
          <StaggerItem>
            <div className='flex-0'>
              <Image
                src='/svg/hero.svg'
                alt='Muezz Logo'
                width={300}
                height={300}
                className='w-full h-full object-cover'
              />
            </div>
          </StaggerItem>
        </div>
      </StaggerChildren>
    </motion.div>
  );
};

export default Hero;
