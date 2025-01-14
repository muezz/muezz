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

  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    closeMenu?: () => void
  ) => {
    e.preventDefault();

    if (closeMenu) {
      closeMenu();
    }

    setTimeout(
      () => {
        const target = document.querySelector(href);
        if (target) {
          const elementPosition =
            target.getBoundingClientRect().top + window.scrollY;
          const startPosition = window.scrollY;
          const distance = elementPosition - startPosition;
          const duration = 2000;
          let startTime: number | null = null;

          const easeInOutQuad = (t: number) =>
            t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

          const animation = (currentTime: number) => {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            const scroll = startPosition + distance * easeInOutQuad(progress);

            window.scrollTo(0, scroll);

            if (timeElapsed < duration) {
              requestAnimationFrame(animation);
            }
          };

          requestAnimationFrame(animation);
        }
      },
      closeMenu ? 800 : 0
    );
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
                    <Link
                      href='#home'
                      onClick={(e) => scrollToSection(e, '#home')}
                    >
                      Home
                    </Link>
                  </NavLink>
                </StaggerItem>
                <StaggerItem direction='up'>
                  <NavLink href='#about'>
                    <Link
                      href='#about'
                      scroll={true}
                      onClick={(e) => scrollToSection(e, '#about')}
                    >
                      About Us
                    </Link>
                  </NavLink>
                </StaggerItem>
                <StaggerItem direction='up'>
                  <NavLink href='#services'>
                    <Link
                      href='#services'
                      onClick={(e) => scrollToSection(e, '#services')}
                    >
                      Services
                    </Link>
                  </NavLink>
                </StaggerItem>
                <StaggerItem direction='up'>
                  <NavLink href='#testimonials'>
                    <Link
                      href='#testimonials'
                      onClick={(e) => scrollToSection(e, '#testimonials')}
                    >
                      Testimonials
                    </Link>
                  </NavLink>
                </StaggerItem>
                <StaggerItem direction='up'>
                  <NavLink href='#projects'>
                    <Link
                      href='#projects'
                      onClick={(e) => scrollToSection(e, '#projects')}
                    >
                      Recent Work
                    </Link>
                  </NavLink>
                </StaggerItem>
                <StaggerItem direction='up'>
                  <NavLink href='#contact'>
                    <Link
                      href='#contact'
                      onClick={(e) => scrollToSection(e, '#contact')}
                    >
                      Get In Touch
                    </Link>
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
