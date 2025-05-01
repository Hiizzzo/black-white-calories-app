
import React from 'react';
import { Link } from 'react-router-dom';

const AppNavbar = () => {
  return (
    <nav className="w-full py-4 px-6 bg-background">
      <div className="flex justify-between items-center max-w-screen-lg mx-auto">
        <Link to="/" className="flex items-center space-x-2">
          <span className="font-bold text-xl">CalTrack</span>
        </Link>
        <div className="flex space-x-4">
          <Link to="/" className="text-primary hover:text-primary/80">
            Inicio
          </Link>
          <Link to="/diary" className="text-primary hover:text-primary/80">
            Diario
          </Link>
          <Link to="/profile" className="text-primary hover:text-primary/80">
            Perfil
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default AppNavbar;
