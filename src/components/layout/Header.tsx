'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { StaggerChildren } from '@/components/Animtions/StaggerChildren';
import { StaggerItem } from '@/components/Animtions/StaggerItem';
import NavLink from '@/components/links/NavLink';

import Button from './Button';
import Nav from './Nav';

const menu = {
  open: {
    width: '100vw',
    height: '100vh',
    top: '-25px',
    right: '-25px',
    transition: { duration: 0.75, type: 'tween', ease: [0.76, 0, 0.24, 1] },
  },
  closed: {
    width: '100px',
    height: '40px',
    top: '0px',
    right: '0px',
    transition: {
      duration: 0.75,
      delay: 0.35,
      type: 'tween',
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

export default function Header() {
  const [isActive, setIsActive] = useState(false);

  const closeMenu = () => {
    setIsActive(false);
  };

  return (
    <>
      <div className='lg:hidden fixed w-full top-0 left-0 z-50 bg-transparent border-none'>
        <div className='flex justify-between p-6'>
          <div className='font-bold text-2xl text-white'>
            <Link href='/'>MUEZZ</Link>
          </div>
          <div className='relative w-full'>
            <motion.div
              className='absolute top-0 right-0 bg-black bg-opacity-40 backdrop-blur-lg text-white rounded-[25px]'
              variants={menu}
              animate={isActive ? 'open' : 'closed'}
              initial='closed'
            >
              <AnimatePresence>
                {isActive && <Nav closeMenu={closeMenu} />}
              </AnimatePresence>
            </motion.div>
            <Button
              isActive={isActive}
              toggleMenu={() => setIsActive(!isActive)}
            />
          </div>
        </div>
      </div>

      <header className='hidden lg:block absolute w-full text-white py-4 z-50'>
        <StaggerChildren className='w-[90%] mx-auto flex justify-between items-center'>
          <StaggerItem className='font-bold text-2xl' direction='up'>
            <Link href='/'>
              <Image
                src='/svg/splash.svg'
                alt='decorative lines'
                width={100}
                height={100}
              />
            </Link>
          </StaggerItem>
          <StaggerChildren>
            <nav>
              <ul className='flex space-x-12'>
                <StaggerItem direction='up'>
                  <NavLink href='#home'>
                    <Link href='#home'>Home</Link>
                  </NavLink>
                </StaggerItem>
                <StaggerItem direction='up'>
                  <NavLink href='#about'>
                    <Link href='#about' scroll={true}>
                      About Us
                    </Link>
                  </NavLink>
                </StaggerItem>
                <StaggerItem direction='up'>
                  <NavLink href='#services'>
                    <Link href='#services'>Services</Link>
                  </NavLink>
                </StaggerItem>
                <StaggerItem direction='up'>
                  <NavLink href='#testimonials'>
                    <Link href='#testimonials'>Testimonials</Link>
                  </NavLink>
                </StaggerItem>
                <StaggerItem direction='up'>
                  <NavLink href='#projects'>
                    <Link href='#projects'>Recent Work</Link>
                  </NavLink>
                </StaggerItem>
                <StaggerItem direction='up'>
                  <NavLink href='#contact'>
                    <Link href='#contact'>Get In Touch</Link>
                  </NavLink>
                </StaggerItem>
              </ul>
            </nav>
          </StaggerChildren>
        </StaggerChildren>
      </header>
    </>
  );
}
