'use client';

import { parsePhoneNumberFromString } from 'libphonenumber-js';
import Link from 'next/link';
import React, { useState } from 'react';

const Footer: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    mobile: '',
    message: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    mobile: '',
    message: '',
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {
      email: '',
      mobile: '',
      message: '',
    };

    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email.';
    }

    const phoneNumber = parsePhoneNumberFromString(formData.mobile || '', 'US'); // Adjust country code
    if (!phoneNumber || !phoneNumber.isValid()) {
      newErrors.mobile = 'Please enter a valid mobile number.';
    }

    if (!formData.message || formData.message.trim().length === 0) {
      newErrors.message = 'Message cannot be empty.';
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage('');
    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Something went wrong');
      }

      setSuccessMessage('Your message has been sent successfully!');
      setFormData({ email: '', mobile: '', message: '' });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'An unknown error occurred';
      setErrors((prev) => ({ ...prev, message: errorMessage }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer id='contact' className='bg-black pt-20 text-white'>
      <div className='flex justify-center text-center'>
        <div className='max-w-lg w-[80%] mx-auto mb-12'>
          <h2 className='text-3xl leading-none md:text-[45px] font-bold mb-6'>
            Get In Touch
          </h2>
          <p className='text-lg opacity-80'>
            Feel free to reach out to us for any inquiries or assistance!
          </p>

          <form onSubmit={handleSubmit} className='mt-8'>
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
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
                className='bg-white text-black px-4 py-2 sm:py-3 rounded-md w-full'
                placeholder='Enter your email'
              />
              {errors.email && (
                <p className='text-red-500 text-sm'>{errors.email}</p>
              )}
            </div>

            <div className='mb-4'>
              <label
                htmlFor='mobile'
                className='block text-start text-sm font-medium mb-2'
              >
                Mobile
              </label>
              <input
                id='mobile'
                type='text'
                value={formData.mobile}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, mobile: e.target.value }))
                }
                className='bg-white text-black px-4 py-2 sm:py-3 rounded-md w-full'
                placeholder='Enter your mobile number'
              />
              {errors.mobile && (
                <p className='text-red-500 text-sm'>{errors.mobile}</p>
              )}
            </div>

            <div className='mb-4'>
              <label
                htmlFor='message'
                className='block text-start text-sm font-medium mb-2'
              >
                Message
              </label>
              <textarea
                id='message'
                value={formData.message}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, message: e.target.value }))
                }
                className='bg-white text-black px-4 py-2 min-h-32 sm:min-h-48 rounded-md w-full'
                placeholder='Enter your message'
              ></textarea>
              {errors.message && (
                <p className='text-red-500 text-sm'>{errors.message}</p>
              )}
            </div>

            <button
              type='submit'
              className='bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 sm:py-3 w-full rounded-md'
              disabled={loading}
              style={{ boxShadow: '0px 0px 30.3px 0px #1C74D9DE' }}
            >
              {loading ? 'Sending...' : 'Submit'}
            </button>
          </form>

          {successMessage && (
            <p className='text-green-500 text-lg mt-4'>{successMessage}</p>
          )}
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
        <div className='w-[80%] mx-auto grid grid-cols-2 lg:grid-cols-4 mb-32 pt-36 text-center gap-8'>
          {/* Content Section */}
          <div className='content'>
            <h1 className='font-bold text-lg sm:text-2xl mb-4'>CONTENT</h1>
            <div className='flex flex-col'>
              <Link href='#home' className='hover:text-blue-500'>
                Home
              </Link>
              <Link href='#services' className='hover:text-blue-500'>
                Services
              </Link>
              <Link href='#testimonials' className='hover:text-blue-500'>
                Testimonials
              </Link>
            </div>
          </div>

          {/* Information Section */}
          <div className='info'>
            <h1 className='font-bold text-lg sm:text-2xl mb-4'>INFORMATION</h1>
            <div className='flex flex-col'>
              <Link href='#about' className='hover:text-blue-500'>
                About Us
              </Link>
              <Link href='#contact' className='hover:text-blue-500'>
                Contact Us
              </Link>
            </div>
          </div>

          {/* Legal Section */}
          <div className='legal'>
            <h1 className='font-bold text-lg sm:text-2xl mb-4'>LEGAL</h1>
            <div className='flex flex-col'>
              <Link href='#' className='hover:text-blue-500'>
                Privacy
              </Link>
              <Link href='#' className='hover:text-blue-500'>
                Terms
              </Link>
            </div>
          </div>

          {/* Social Section */}
          <div className='privacy'>
            <h1 className='font-bold text-lg sm:text-2xl mb-4'>PRIVACY</h1>
            <div className='flex flex-col'>
              <Link href='#' className='hover:text-blue-500'>
                Social
              </Link>
            </div>
          </div>
        </div>
        <hr className='w-[80%] mx-auto pb-24' />
      </div>
    </footer>
  );
};

export default Footer;
