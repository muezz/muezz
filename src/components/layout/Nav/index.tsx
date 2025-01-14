import { motion } from 'framer-motion';
import React from 'react';

import { perspective, slideIn } from './anim';
import { footerLinks, links } from './data';

interface Link {
  title: string;
  href: string;
}

export default function Navigation({ closeMenu }: { closeMenu: () => void }) {
  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    closeMenu();

    setTimeout(() => {
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
    }, 800);
  };

  return (
    <div className='flex flex-col justify-between h-full px-10 py-24 box-border'>
      <div className='flex flex-col gap-4'>
        {links.map((link: Link, i: number) => {
          const { title, href } = link;
          return (
            <div
              key={`b_${i}`}
              className='perspective-[120px] perspective-origin-bottom'
            >
              <motion.div
                custom={i}
                variants={perspective}
                initial='initial'
                animate='enter'
                exit='exit'
              >
                <a
                  href={href}
                  className='no-underline text-white text-[46px]'
                  onClick={(e) => handleLinkClick(e, href)}
                >
                  {title}
                </a>
              </motion.div>
            </div>
          );
        })}
      </div>
      <motion.div className='flex flex-wrap'>
        {footerLinks.map((link: Link, i: number) => {
          const { title, href } = link;
          return (
            <motion.a
              href={href}
              variants={slideIn}
              custom={i}
              initial='initial'
              animate='enter'
              exit='exit'
              key={`f_${i}`}
              className='w-1/2 mt-[5px]'
              onClick={(e) => handleLinkClick(e, href)}
            >
              {title}
            </motion.a>
          );
        })}
      </motion.div>
    </div>
  );
}
