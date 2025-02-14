import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Modal from './Modal';
import Login from '../pages/admin/Login';
import Signup from '../pages/admin/Signup';
import type { LoginProps, SignupProps } from '../types/auth';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Contact Us', href: '/contact' },
  { name: 'Career', href: '/career' },
];

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Monitor route changes
  useEffect(() => {
    if (location.pathname === '/') {
      setIsLoginOpen(false);
      setIsSignupOpen(false);
    }
  }, [location.pathname]);

  const isCurrentPath = (path: string) => {
    return location.pathname === path;
  };

  const handleLoginClick = () => {
    setIsLoginOpen(true);
    setIsSignupOpen(false);
    navigate('/login');
  };

  const handleSignupClick = () => {
    setIsSignupOpen(true);
    setIsLoginOpen(false);
    navigate('/signup');
  };

  const handleCloseLogin = () => {
    setIsLoginOpen(false);
    navigate('/');
  };

  const handleCloseSignup = () => {
    setIsLoginOpen(true);
    navigate('/login');
  };

  const handleLoginSuccess = () => {
    setIsLoginOpen(false); // Close the login modal
    navigate('/'); // Navigate to home
  };

  // Desktop Navbar
  const DesktopNav = () => (
    <nav className="w-full bg-orange-600 fixed top-0 z-40 shadow-lg">
      <div className="max-w-[2000px] mx-auto px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Company Name */}
          <div className="flex-shrink-0">
            <Link 
              to="/" 
              className="text-2xl font-bold text-white hover:text-orange-100 transition-colors duration-300"
            >
              Company Name
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`
                  px-4 py-2 
                  text-white 
                  text-lg 
                  font-medium 
                  hover:text-orange-200
                  transition-colors 
                  duration-300
                  ${isCurrentPath(item.href) ? 'border-b-2 border-white' : ''}
                `}
              >
                {item.name}
              </Link>
            ))}
            {/* Auth Links */}
            <div className="flex items-center space-x-4 ml-8">
              {/* <button
                onClick={handleLoginClick}
                className="px-4 py-2 text-white hover:text-orange-200 transition-colors duration-300"
              >
                Login
              </button> */}
              <button
                onClick={handleSignupClick}
                className="px-4 py-2 bg-white text-orange-600 rounded-md hover:bg-orange-50 transition-colors duration-300"
              >
                Login/Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );

  // Mobile Navbar
  const MobileNav = () => (
    <Disclosure as="nav" className="bg-orange-600 fixed w-full top-0 z-40">
      {({ open, close }) => (
        <>
          <div className="px-4">
            <div className="flex h-20 justify-between items-center">
              <Link 
                to="/" 
                className="text-xl font-bold text-white hover:text-orange-100 transition-colors duration-200"
              >
                Company Name
              </Link>
              <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-orange-100 hover:bg-orange-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                {open ? (
                  <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                )}
              </Disclosure.Button>
            </div>
          </div>

          <Disclosure.Panel>
            <div className="space-y-2 px-4 pb-4 pt-2 bg-orange-600">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as={Link}
                  to={item.href}
                  className={`${
                    isCurrentPath(item.href)
                      ? 'bg-orange-700 text-white'
                      : 'text-orange-100 hover:bg-orange-500'
                  } block px-4 py-3 rounded-md text-base font-medium transition-all duration-200 ease-in-out w-full text-left`}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
              {/* Auth Links for Mobile */}
              <div className="pt-4 space-y-2">
                <button
                  onClick={() => {
                    handleLoginClick();
                    close();
                  }}
                  className="block w-full px-4 py-3 text-orange-100 hover:bg-orange-500 rounded-md text-base font-medium transition-all duration-200"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    handleSignupClick();
                    close();
                  }}
                  className="block w-full px-4 py-3 bg-white text-orange-600 rounded-md text-base font-medium hover:bg-orange-50 transition-all duration-200"
                >
                  Sign Up
                </button>
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );

  return (
    <>
      {isMobile ? <MobileNav /> : <DesktopNav />}
      
      <Modal 
        isOpen={isLoginOpen} 
        onClose={handleCloseLogin}
      >
        <Login 
          onClose={handleLoginSuccess}
        />
      </Modal>

      <Modal 
        isOpen={isSignupOpen} 
        onClose={handleCloseSignup}
      >
        <Signup 
          onClose={handleCloseSignup}
        />
      </Modal>
    </>
  );
};

export default Navbar; 