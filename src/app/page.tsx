'use client';

import { useScroll } from 'framer-motion';
import Lenis from 'lenis';
import Head from 'next/head';
import * as React from 'react';
import '@/lib/env';

import AboutSection from '@/components/About';
import Hero from '@/components/Hero';
import Footer from '@/components/layout/Footer';
import Projects from '@/components/projects';
import PortfolioCarousel from '@/components/projects/Carousel';
import Services from '@/components/Services';
import TestimonialSection from '@/components/Testimonials';

export default function HomePage() {
  const container = React.useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  React.useEffect(() => {
    const lenis = new Lenis();

    function raf(time: DOMHighResTimeStamp) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  return (
    <main ref={container} className='relative h-[200vh]'>
      <Head>
        <title>MUEZZ</title>
      </Head>
      <section id='home' className='sticky top-0'>
        <Hero scrollYProgress={scrollYProgress} />
      </section>
      <section id='about'>
        <AboutSection scrollYProgress={scrollYProgress} />
      </section>
      <section id='services'>
        <Services
          title='Services'
          subtitle='Mobile Apps'
          description='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
          imageSrc='/images/service1.png'
          buttonText='Learn More'
          buttonLink='/mobile-apps'
        />
        <Services
          title='Services'
          subtitle='Web Development'
          description='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
          imageSrc='/images/service2.png'
          buttonText='Learn More'
          buttonLink='/mobile-apps'
        />
      </section>
      <section id='testimonials' className='relative'>
        <TestimonialSection />
      </section>
      <section id='projects' className='relative'>
        <Projects />
      </section>
      <section className='flex lg:hidden min-h-screen bg-black justify-center items-center'>
        <PortfolioCarousel />
      </section>
      <section>
        <Footer />
      </section>
    </main>
  );
}
