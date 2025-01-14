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
          description='Designing sleek and intuitive mobile apps for Android and iOS to meet your unique needs with top-notch performance.'
          imageSrc='/images/service1.png'
          buttonText='Learn More'
          buttonLink='/'
        />
        <Services
          title='Services'
          subtitle='Web Development'
          description='Creating fast, responsive websites and web apps using modern technologies like React and Next.js.'
          imageSrc='/images/service2.png'
          buttonText='Learn More'
          buttonLink='/'
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
