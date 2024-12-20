'use client';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const PortfolioCarousel = () => {
  const [activeButton, setActiveButton] = useState('right');
  const swiperRef = useRef<Swiper | null>(null);

  useEffect(() => {
    swiperRef.current = new Swiper('.portfolio-carousel', {
      modules: [Navigation],
      loop: true,
      slidesPerView: 1,
      spaceBetween: 20,
      breakpoints: {
        768: {
          slidesPerView: 2,
          spaceBetween: 30,
        },
      },
      on: {
        slideChange: (swiper: Swiper) => {
          const isBeginning = swiper.isBeginning;
          const isEnd = swiper.isEnd;

          if (isBeginning) {
            setActiveButton('right');
          } else if (isEnd) {
            setActiveButton('left');
          }
        },
      },
    });

    return () => {
      if (swiperRef.current) {
        swiperRef.current.destroy();
      }
    };
  }, []);

  const handlePrevClick = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };

  const handleNextClick = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  return (
    <div className='w-full bg-black p-8'>
      <h2 className='text-3xl font-bold mb-8' style={{ color: '#c8ff00' }}>
        Recent Work
      </h2>

      <div className='portfolio-carousel swiper-container relative overflow-hidden'>
        <div className='swiper-wrapper'>
          {['Work 1', 'Work 2', 'Work 3', 'Work 4'].map((work, index) => (
            <div key={index} className='swiper-slide'>
              <div className='bg-gray-700 rounded-none aspect-video mb-6'>
                {/* Placeholder for work image/content */}
              </div>
              <h3 className='text-white text-2xl font-bold mb-4'>
                Work name here
              </h3>
              <p className='text-gray-400 font-mono'>
                Labore et dolore magna aliqua. sed do eiusmod tempor incididunt
                ut labore et dolore magna.
              </p>
            </div>
          ))}
        </div>

        <div className='flex gap-4 mt-8'>
          <button
            onClick={handlePrevClick}
            className={`flex items-center justify-center !p-2 rounded-full transition-colors group
              ${
                activeButton === 'left'
                  ? 'bg-[#c8ff00] hover:bg-[#a8df00]'
                  : 'bg-gray-700 hover:bg-gray-600'
              }`}
          >
            <ChevronLeft
              size={24}
              color={activeButton === 'left' ? 'black' : 'white'}
            />
          </button>
          <button
            onClick={handleNextClick}
            className={`flex items-center justify-center !p-2 rounded-full transition-colors group
              ${
                activeButton === 'right'
                  ? 'bg-[#c8ff00] hover:bg-[#a8df00]'
                  : 'bg-gray-700 hover:bg-gray-600'
              }`}
          >
            <ChevronRight
              size={24}
              color={activeButton === 'right' ? 'black' : 'white'}
            />
          </button>
        </div>
      </div>

      <style jsx>{`
        .swiper-wrapper {
          width: 100%;
          height: max-content !important;
          padding-bottom: 2rem !important;
        }
      `}</style>
    </div>
  );
};

export default PortfolioCarousel;
