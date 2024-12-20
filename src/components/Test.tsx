import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';

const SmoothStackScroll = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Initialize ScrollTrigger for each section
    const sections = gsap.utils.toArray<HTMLElement>('section');
    sections.forEach((section) => {
      ScrollTrigger.create({
        trigger: section as Element,
        start: 'top top',
        pin: true,
        pinSpacing: false,
        toggleClass: 'active',
      });
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className='relative'>
      <section className='h-screen w-full bg-slate-950 flex items-center justify-center'>
        <div className='absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:54px_54px]' />
        <div className='relative z-10'>
          <h1 className='text-4xl md:text-6xl 2xl:text-7xl px-8 font-semibold text-center tracking-tight text-white'>
            I Know What Exactly you're <br /> Looking For! Scroll Please 👇
          </h1>
        </div>
      </section>

      <section className='h-screen font- w-full bg-gray-300 flex items-center justify-center'>
        <div className='absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:54px_54px]' />
        <div className='relative z-10'>
          <h1 className='text-3xl md:text-4xl 2xl:text-7xl px-8 font-semibold text-center tracking-tight text-black'>
            If you don't like this then I'm sorry, <br /> create your own and
            make it open source 💼
          </h1>
        </div>
      </section>

      <section className='h-screen w-full bg-slate-950 flex items-center justify-center'>
        <div className='absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:54px_54px]' />
        <div className='relative z-10'>
          <h1 className='text-3xl md:text-5xl 2xl:text-7xl px-8 font-semibold text-center tracking-tight text-white'>
            Thanks To Scroll.
            <br /> Now Scroll Up Again ☝️
          </h1>
        </div>
      </section>
    </div>
  );
};

export default SmoothStackScroll;
