
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Calendar, User } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const AppNavbar = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const isMobile = useIsMobile();

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav 
      className={`fixed bottom-0 left-0 right-0 z-50 py-2 px-4 md:px-6 transition-all duration-200 bg-background
        md:top-0 md:bottom-auto ${isScrolled ? 'md:shadow-md' : ''} ${isMobile ? 'shadow-[0_-2px_10px_rgba(0,0,0,0.1)]' : ''}`}
    >
      <div className="flex justify-between items-center max-w-screen-lg mx-auto">
        <Link to="/" className="hidden md:flex items-center space-x-2">
          <span className="font-bold text-xl tracking-tighter">CalTrack</span>
        </Link>

        <div className="flex justify-around items-center w-full md:w-auto md:space-x-6">
          <Link 
            to="/" 
            className={`flex flex-col items-center p-2 md:flex-row md:p-0 ${
              isActive('/') 
                ? 'text-black font-medium' 
                : 'text-gray-500 hover:text-black'
            }`}
          >
            <Home className="h-5 w-5 mb-1 md:mr-2 md:mb-0" />
            <span className="text-xs md:text-sm">Inicio</span>
          </Link>
          
          <Link 
            to="/diary" 
            className={`flex flex-col items-center p-2 md:flex-row md:p-0 ${
              isActive('/diary') 
                ? 'text-black font-medium' 
                : 'text-gray-500 hover:text-black'
            }`}
          >
            <Calendar className="h-5 w-5 mb-1 md:mr-2 md:mb-0" />
            <span className="text-xs md:text-sm">Diario</span>
          </Link>
          
          <Link 
            to="/profile" 
            className={`flex flex-col items-center p-2 md:flex-row md:p-0 ${
              isActive('/profile') 
                ? 'text-black font-medium' 
                : 'text-gray-500 hover:text-black'
            }`}
          >
            <User className="h-5 w-5 mb-1 md:mr-2 md:mb-0" />
            <span className="text-xs md:text-sm">Perfil</span>
          </Link>
        </div>
        
        <div className="hidden md:block">
          <span className="text-xs bg-black text-white px-3 py-1 rounded-full">
            Beta
          </span>
        </div>
      </div>
    </nav>
  );
};

export default AppNavbar;
