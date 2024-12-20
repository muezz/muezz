import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer id='contact' className='bg-black pt-20 text-white'>
      <div className='flex justify-center text-center'>
        <div className='max-w-lg w-[80%] mx-auto mb-12'>
          <h2 className='text-3xl leading-none md:text-[45px] font-bold mb-6'>
            Get In Touch
          </h2>
          <p className='text-lg opacity-80'>
            Assumenda non repellendus distinctio nihil dicta sapiente, quibusdam
            maiores, illum at, aliquid blanditiis eligendi qui.
          </p>
          <div className='mt-8'>
            <div className='mb-4'>
              <label
                htmlFor='email'
                className='block text-start text-sm font-medium mb-2'
              >
                Email
              </label>
              <input
                id='email'
                type='email'
                className='bg-white text-black px-4 py-2 sm:py-3 rounded-md w-full'
                placeholder='Enter your email'
              />
            </div>
            <div className='mb-4'>
              <label
                htmlFor='mobile'
                className='block text-sm text-start font-medium mb-2'
              >
                Mobile
              </label>
              <input
                id='mobile'
                type='text'
                className='bg-white text-black px-4 py-2 sm:py-3 rounded-md w-full'
                placeholder='Enter your mobile number'
              />
            </div>
            <div className='mb-4'>
              <label
                htmlFor='message'
                className='block text-sm text-start font-medium mb-2'
              >
                Message
              </label>
              <textarea
                id='message'
                className='bg-white text-black px-4 py-2 min-h-32 sm:min-h-48 rounded-md w-full'
                placeholder='Enter your message'
              ></textarea>
            </div>
            <button
              className='bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 sm:py-3 w-full rounded-md'
              style={{ boxShadow: '0px 0px 30.3px 0px #1C74D9DE' }}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
      <div
        className='link bg-transparent'
        style={{
          backgroundImage:
            'radial-gradient(ellipse at center 70%, #804CE450 20%, transparent 70%)',
          backdropFilter: 'blur(150px)',
          padding: '10px 20px',
        }}
      >
        <div className='w-[80%] mx-auto grid grid-cols-2 lg:grid-cols-4 mb-32 pt-36 gap-8'>
          {/* Content Section */}
          <div className='content'>
            <h1 className='font-bold text-lg sm:text-2xl mb-4'>CONTENT</h1>
            <div className='flex flex-col'>
              <a href='#' className='hover:text-blue-500'>
                New Assets
              </a>
              <a href='#' className='hover:text-blue-500'>
                Most Popular
              </a>
              <a href='#' className='hover:text-blue-500'>
                Blog
              </a>
            </div>
          </div>

          {/* Information Section */}
          <div className='info'>
            <h1 className='font-bold text-lg sm:text-2xl mb-4'>INFORMATION</h1>
            <div className='flex flex-col'>
              <a href='#' className='hover:text-blue-500'>
                About Us
              </a>
              <a href='#' className='hover:text-blue-500'>
                Contact Us
              </a>
              <a href='#' className='hover:text-blue-500'>
                Pricing
              </a>
            </div>
          </div>

          {/* Legal Section */}
          <div className='legal'>
            <h1 className='font-bold text-lg sm:text-2xl mb-4'>LEGAL</h1>
            <div className='flex flex-col'>
              <a href='#' className='hover:text-blue-500'>
                Privacy
              </a>
              <a href='#' className='hover:text-blue-500'>
                Terms
              </a>
            </div>
          </div>

          {/* Social Section */}
          <div className='privacy'>
            <h1 className='font-bold text-lg sm:text-2xl mb-4'>PRIVACY</h1>
            <div className='flex flex-col'>
              <a href='#' className='hover:text-blue-500'>
                Social
              </a>
            </div>
          </div>
        </div>
        <hr className='w-[80%] mx-auto pb-24' />
      </div>
    </footer>
  );
};

export default Footer;
