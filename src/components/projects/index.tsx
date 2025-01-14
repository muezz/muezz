import Image from 'next/image';
import React from 'react';
const RecentProjectsSection: React.FC = () => {
  return (
    <section className='bg-black hidden lg:block relative text-white py-24'>
      <div className='hidden md:block'>
        <Image
          src='/svg/services/object.svg'
          alt='decorative lines'
          width={120}
          height={150}
          className='absolute top-3 left-0'
        />
        <Image
          src='/svg/logo.svg'
          alt='decorative lines'
          width={50}
          height={50}
          className='absolute top-0 right-16'
        />
      </div>
      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-6 grid-rows-12 gap-4'>
          <div className='col-span-3 row-span-10 col-start-1 row-start-2 bg-white shadow-lg rounded-3xl'>
            <div className='flex flex-col items-start justify-between h-full p-12 rounded-lg w-full'>
              <h3 className='text-7xl font-black text-black w-[80%]'>
                Recent Projects
              </h3>
              <p className='mt-4 text-5xl font-extrabold text-blue-600'>
                MUEZZ
              </p>
              <div className='mt-8 flex items-center space-x-2 font-mono text-black text-2xl hover:text-gray-600 font-medium cursor-pointer'>
                <span>Explore More</span>
                <span className='transform transition-transform  group-hover:translate-x-1'>
                  →
                </span>
              </div>
            </div>
          </div>
          <div className='row-span-10 col-start-4 row-start-3 bg-white rounded-3xl shadow-lg'>
            <div className='flex flex-col w-full justify-between items-center px-4 py-6 h-full rounded-lg'>
              <div className='w-full rounded-lg overflow-hidden'>
                <Image
                  src='/images/project1.png'
                  alt='Browse & Choose'
                  className='w-full h-full object-cover'
                  width={100}
                  height={100}
                />
              </div>
              <p className='text-2xl font-bold text-black'>Step 1</p>
              <p className='text-center text-black font-medium text-3xl'>
                Browse & Choose
              </p>
            </div>
          </div>
          <div className='row-span-10 col-start-5 row-start-1 bg-white rounded-3xl shadow-lg'>
            <div className='flex flex-col justify-between items-center h-full px-4 py-6 rounded-lg w-full'>
              <div className='w-full rounded-lg overflow-hidden'>
                <Image
                  src='/images/project1.png'
                  alt='Browse & Choose'
                  width={100}
                  height={100}
                  className='w-full h-full object-cover'
                />
              </div>
              <p className='text-2xl font-bold text-black'>Step 2</p>
              <p className='text-center text-black font-medium text-3xl'>
                Do Your Research
              </p>
            </div>
          </div>
          <div className='row-span-10 col-start-6 row-start-3 bg-white rounded-3xl shadow-lg'>
            <div className='flex flex-col justify-between h-full items-center px-4 py-6 rounded-lg w-full space-y-4'>
              <div className='w-full rounded-lg overflow-hidden'>
                <Image
                  src='/images/project1.png'
                  alt='Browse & Choose'
                  width={100}
                  height={100}
                  className='w-full h-full object-cover'
                />
              </div>
              <p className='text-2xl font-bold text-black'>Step 3</p>
              <p className='text-center text-black font-medium text-3xl'>
                Let's Connect
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className='inline-flex relative items-center justify-center w-full mt-20'>
        <hr className='w-full h-2 my-8 bg-gray-200 border-0 rounded dark:bg-[#CEFC00]' />
        <div className='absolute bg-white left-0 dark:bg-black py-2 pl-4 pr-24 border-8 border-[#CEFC00] rounded-full'>
          <h6>www.muezz.com</h6>
        </div>
      </div>
    </section>
  );
};

export default RecentProjectsSection;
