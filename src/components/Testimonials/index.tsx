import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

interface TestimonialItem {
  photo: string;
  name: string;
  content: string;
}

const testimonialList: TestimonialItem[] = [
  {
    photo: '/images/client1.png',
    name: 'Sarah Williams',
    content:
      '"Working with this team was an absolute pleasure. They took my vision and transformed it into a beautiful, functional reality. Their attention to detail, creativity, and commitment exceeded my expectations."',
  },
  {
    photo: '/images/client2.png',
    name: 'Michael Johnson',
    content:
      '"Their professionalism and expertise are unmatched. Their innovative approach and clear communication ensured the project was completed perfectly. Highly recommended!"',
  },
  {
    photo: '/images/client1.png',
    name: 'Emily Davis',
    content:
      '"They truly understand the importance of user experience and design. The final product not only looks stunning but also performs flawlessly. I couldn’t have asked for a better team to collaborate with."',
  },
  {
    photo: '/images/client2.png',
    name: 'John Smith',
    content:
      '"I was impressed by their ability to handle challenges and deliver results within a tight deadline. Their work ethic and passion for excellence made all the difference in our project’s success."',
  },
];

interface TestimonialItemProps {
  item: TestimonialItem;
}

const TestimonialItem: React.FC<TestimonialItemProps> = ({ item }) => {
  const { content, photo, name } = item;
  return (
    <div
      className='bg-white dark:bg-transparent border-transparent border-[1px] shadow-xl rounded-xl hover:-translate-y-1 h-full duration-300 p-6'
      style={{
        boxShadow: '0px 4px 4px 0px #FCFF55',
        borderImageSource:
          'linear-gradient(90deg, #484848 1.24%, rgba(27, 27, 27, 0) 100%)',
        borderImageSlice: 1,
        borderRadius: '12px',
      }}
    >
      <div className='mt-4'>
        <p className='leading-[1.8] opacity-80 mb-6'>{content}</p>
        <div className='flex justify-between items-center mb-6'>
          <div className='flex items-center'>
            <div className='mr-2'>
              <Image
                src={photo}
                alt={name}
                className='max-w-full h-auto rounded-full border'
                width={47}
                height={47}
              />
            </div>
            <div>
              <h5 className='text-xl break-all font-medium'>{name}</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TestimonialSection: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const checkMobileView = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobileView();

    window.addEventListener('resize', checkMobileView);

    return () => {
      window.removeEventListener('resize', checkMobileView);
    };
  }, []);

  const itemsPerPage = isMobile ? 1 : 2;

  const handleControl = (type: 'prev' | 'next') => {
    const maxIndex = Math.ceil(testimonialList.length / itemsPerPage) - 1;

    if (type === 'prev') {
      setIndex(index <= 0 ? maxIndex : index - 1);
    } else {
      setIndex(index >= maxIndex ? 0 : index + 1);
    }
  };

  // Get the testimonials for the current page (1-2 cards depending on screen size)
  const getCurrentTestimonials = () => {
    const startIndex = index * itemsPerPage;
    return testimonialList.slice(startIndex, startIndex + itemsPerPage);
  };

  return (
    <section className='pt-14 md:pt-24 bg-white dark:bg-black text-zinc-900 dark:text-white'>
      <div className='container px-4 mx-auto flex flex-col items-start relative'>
        <div className='hidden md:block'>
          <Image
            src='/svg/logo.svg'
            alt='decorative lines'
            width={50}
            height={50}
            className='absolute top-0 right-8'
          />
        </div>
        <div className='flex justify-center items-center w-full text-center mb-2'>
          <div className='max-w-lg'>
            <h2 className='text-3xl leading-none md:text-[45px] font-bold mb-6'>
              Testimonials
            </h2>
            <p className='text-lg opacity-80'>
              Hear from our satisfied clients who have experienced exceptional
              results through our services. These testimonials highlight the
              dedication, creativity, and quality that define our work.
            </p>
          </div>
        </div>

        <div className='flex justify-center items-stretch gap-6 mt-12'>
          {getCurrentTestimonials().map((item, i) => (
            <div
              key={i}
              className={`w-full ${isMobile ? 'max-w-full' : 'md:w-1/2'}`}
            >
              <TestimonialItem item={item} />
            </div>
          ))}
        </div>

        <div className='relative flex justify-center items-center my-12'>
          <button
            className={`text-lg shadow-2xl w-12 h-12 flex justify-center items-center rounded-full mr-4 ${
              index > 0
                ? 'bg-[#A8DF00] hover:opacity-90 text-black'
                : 'bg-gray-700 hover:bg-gray-600 cursor-not-allowed text-white'
            }`}
            onClick={() => handleControl('prev')}
            disabled={index <= 0}
          >
            <ChevronLeft className='w-6 h-6' />
          </button>
          <button
            className={`text-lg shadow-2xl w-12 h-12 flex justify-center items-center rounded-full ${
              index < Math.ceil(testimonialList.length / itemsPerPage) - 1
                ? 'bg-[#A8DF00] hover:opacity-90 text-black'
                : 'bg-gray-700 hover:bg-gray-600 cursor-not-allowed text-white'
            }`}
            onClick={() => handleControl('next')}
            disabled={
              index >= Math.ceil(testimonialList.length / itemsPerPage) - 1
            }
          >
            <ChevronRight className='w-6 h-6' />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
