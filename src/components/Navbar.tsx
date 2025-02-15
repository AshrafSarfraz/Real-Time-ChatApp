import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { auth, db } from '../firebase/config';
import { doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import toast from 'react-hot-toast';

interface UserData {
  uid: string;
  fullName: string;
  email: string;
  photoURL?: string;
}

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
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            const userData: UserData = {
              uid: user.uid,
              ...userDoc.data() as Omit<UserData, 'uid'>
            };
            localStorage.setItem('currentUser', JSON.stringify(userData));
            setCurrentUser(userData);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          toast.error('Error loading user data');
        }
      } else {
        localStorage.removeItem('currentUser');
        setCurrentUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('currentUser');
      setCurrentUser(null);
      toast.success('Logged out successfully');
      navigate('/login');
    } catch (error) {
      toast.error('Failed to logout');
    }
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  // Desktop Navbar
  const DesktopNav = () => (
    <nav className="w-full bg-orange-600 fixed top-0 z-40 shadow-lg">
      <div className="max-w-[2000px] mx-auto px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="flex-shrink-0">
            <Link 
              to="/" 
              className="text-2xl font-bold text-white hover:text-orange-100 transition-colors duration-300"
            >
              Company Name
            </Link>
          </div>

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
                  ${location.pathname === item.href ? 'border-b-2 border-white' : ''}
                `}
              >
                {item.name}
              </Link>
            ))}
            
            <div className="flex items-center space-x-4 ml-8">
              {currentUser ? (
                <>
                  <div className="flex items-center space-x-3">
                    {currentUser.photoURL ? (
                      <img 
                        src={currentUser.photoURL} 
                        alt="Profile"
                        className="w-10 h-10 rounded-full border-2 border-white"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-white text-orange-600 flex items-center justify-center font-bold">
                        {currentUser.fullName?.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <span className="text-white">{currentUser.fullName}</span>
                    <button
                      onClick={handleLogout}
                      className="px-4 py-2 bg-white text-orange-600 rounded-md hover:bg-orange-50 transition-colors duration-300"
                    >
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <button
                  onClick={handleLoginClick}
                  className="px-4 py-2 bg-white text-orange-600 rounded-md hover:bg-orange-50 transition-colors duration-300"
                >
                  Login/Sign Up
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );

  // Mobile Nav
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
                  className={`
                    block px-4 py-3 rounded-md text-base font-medium transition-all duration-200 ease-in-out w-full text-left
                    ${location.pathname === item.href ? 'bg-orange-700 text-white' : 'text-orange-100 hover:bg-orange-500'}
                  `}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
              
              {currentUser ? (
                <div className="pt-4 space-y-2">
                  <div className="flex items-center space-x-3 px-4 py-3">
                    {currentUser.photoURL ? (
                      <img 
                        src={currentUser.photoURL} 
                        alt="Profile"
                        className="w-8 h-8 rounded-full border-2 border-white"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-white text-orange-600 flex items-center justify-center font-bold">
                        {currentUser.fullName?.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <span className="text-white">{currentUser.fullName}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="block w-full px-4 py-3 bg-white text-orange-600 rounded-md text-base font-medium hover:bg-orange-50 transition-all duration-200"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleLoginClick}
                  className="block w-full px-4 py-3 bg-white text-orange-600 rounded-md text-base font-medium hover:bg-orange-50 transition-all duration-200"
                >
                  Login/Sign Up
                </button>
              )}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );

  return (
    <>
      {isMobile ? <MobileNav /> : <DesktopNav />}
    </>
  );
};

export default Navbar; 