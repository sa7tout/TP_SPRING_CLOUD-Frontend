import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  
  return (
    <nav className="fixed w-full top-4 z-50">
      <div className="max-w-3xl mx-auto backdrop-blur-lg bg-white/90 rounded-2xl shadow-lg border border-gray-200/50">
        <div className="flex items-center justify-between h-16 px-8">
          <Link 
            to="/" 
            className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-indigo-600"
          >
Managment de voitures          </Link>
          
          <div className="flex items-center gap-8">
            {[
              { path: '/', label: 'Home' },
              { path: '/clients', label: 'Clients' },
              { path: '/voitures', label: 'Cars' }
            ].map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className={`relative py-1 ${
                  location.pathname === path ? 'text-violet-600' : 'text-gray-600'
                } hover:text-violet-600 transition-colors`}
              >
                {label}
                <span className={`absolute bottom-0 left-0 w-full h-0.5 transform origin-left transition-transform duration-300 ${
                  location.pathname === path 
                    ? 'bg-violet-600 scale-x-100' 
                    : 'bg-violet-400 scale-x-0 group-hover:scale-x-100'
                }`} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;