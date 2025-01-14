import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <header className='bg-gray-900 text-white py-4'>
      <div className='w-[90%] mx-auto flex justify-between items-center'>
        <div className='font-bold text-2xl'>
          <Link href='/'>MUEZZ</Link>
        </div>
        <nav>
          <ul className='flex space-x-12'>
            <li>
              <Link href='/'>Home</Link>
            </li>
            <li>
              <Link href='/about'>About Us</Link>
            </li>
            <li>
              <Link href='/services'>Services</Link>
            </li>
            <li>
              <Link href='/testimonials'>Testimonials</Link>
            </li>
            <li>
              <Link href='/recent-work'>Recent Work</Link>
            </li>
            <li>
              <Link href='/contact'>Get In Touch</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
