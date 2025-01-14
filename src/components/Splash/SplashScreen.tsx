'use client';

import Image from 'next/image';
import React, { useEffect, useMemo, useState } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import anime from 'animejs';
import {
  type Container,
  type IOptions,
  type RecursivePartial,
  type Engine,
  type IInteractivity,
} from '@tsparticles/engine';
import { loadSlim } from '@tsparticles/slim';

interface SplashScreenProps {
  finishLoading: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ finishLoading }) => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine: Engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const animate = () => {
    const loader = anime.timeline({
      complete: () => finishLoading(),
    });
    loader
      .add({
        targets: '#logo',
        scale: [0.5, 1],
        opacity: [0, 1],
        duration: 1000,
        easing: 'easeOutQuad',
      })
      .add({
        targets: '#logo',
        rotate: 360,
        duration: 1000,
        easing: 'easeInOutQuad',
      });
  };

  useEffect(() => {
    if (init) {
      animate();
    }
  }, [init]);

  const particlesLoaded = async (container?: Container): Promise<void> => {
    console.log('Particles container loaded', container);
  };

  const options: RecursivePartial<IOptions> = useMemo(
    () => ({
      background: {
        color: {
          value: 'transparent',
        },
      },
      particles: {
        number: {
          value: 150,
          density: {
            enable: true,
            value_area: 800,
          },
        },
        color: {
          value: ['#e434ff'],
        },
        shape: {
          type: 'circle',
          stroke: {
            width: 0.2,
            color: '#ffffff',
          },
        },
        opacity: {
          value: { min: 0.4, max: 0.9 },
          random: true,
          animation: {
            enable: true,
            speed: 0.5,
            minimumValue: 0.1,
            sync: false,
          },
        },
        size: {
          value: { min: 5, max: 20 },
          random: true,
          animation: {
            enable: true,
            speed: 2,
            minimumValue: 0.1,
            sync: false,
          },
        },
        move: {
          enable: true,
          speed: 0.5,
          direction: 'none',
          random: true,
          straight: false,
          outMode: 'out',
          bounce: false,
        },
        links: {
          enable: false,
        },
      },
      interactivity: {
        detectsOn: 'canvas',
        events: {
          onHover: {
            enable: true,
            mode: 'grab',
          },
          onClick: {
            enable: true,
            mode: 'push',
          },
        },
        modes: {
          grab: {
            distance: 100,
            links: {
              opacity: 0.3,
            },
          },
          push: {
            quantity: 4,
          },
        },
      } as RecursivePartial<IInteractivity>,
      detectRetina: true,
    }),
    []
  );

  if (!init) return null;

  return (
    <div className='fixed inset-0 bg-black flex items-center justify-center overflow-hidden'>
      <div className='absolute inset-0 z-10'>
        <Particles
          id='tsparticles'
          particlesLoaded={particlesLoaded}
          options={options}
          className='h-full w-full'
        />
      </div>

      <div className='absolute inset-0 z-20 bg-white/1 backdrop-blur-sm pointer-events-none' />

      <div className='relative z-30'>
        <Image
          id='logo'
          src='/svg/splash.svg'
          alt='logo'
          width={400}
          height={400}
          className='opacity-0'
        />
      </div>
    </div>
  );
};

export default SplashScreen;
