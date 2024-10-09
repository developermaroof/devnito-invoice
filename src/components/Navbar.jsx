import React, { useState } from 'react';
import logo from '../assets/logo.png';
import { useAuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { isLoggedIn, userData, Logout } = useAuthContext();
  const [showLogout, setShowLogout] = useState(false); // State to manage visibility

  const toggleLogout = () => {
    setShowLogout((prev) => !prev); // Toggle the visibility of the Logout button
  };

  return (
    <div>
      <nav className="flex justify-between items-center p-4 lg:px-8 2xl:max-w-screen-2xl 2xl:mx-auto">
        <div className="flex items-center gap-[0.1rem]">
          <img src={logo} alt="Logo" className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10" />
          <Link to="/"> 
            <h1 className="text-2xl font-bold hidden lg:block">Invoice Management System</h1>
          </Link>
          <Link to="/">
            <h1 className="text-md md:text-2xl font-bold lg:hidden">Invoices</h1>
          </Link>
        </div>

        <div className="flex items-center">
          {isLoggedIn ? (
            <div className="flex items-center space-x-4">
              {/* User Info */}
              <div 
                className="relative flex items-center justify-center bg-black rounded-md rounded-br-none p-2 px-3 pr-2 md:px-6 lg:py-4 lg:pl-10 space-x-2 md:gap-2 cursor-pointer" 
                onClick={toggleLogout} // Toggle Logout button on click
              >
                <div className="flex flex-col justify-center">
                  <h2 className="font-semibold text-white text-[0.7rem] md:text-[0.8rem] lg:text-[1rem]">{userData.displayName}</h2>
                  <p className="text-gray-300 text-[0.5rem] md:text-[0.7rem] lg:text-[0.9rem]">{userData.email}</p>
                </div>
                <div className="flex justify-center items-center">
                  <img src={userData.photoURL || ""} alt="Profile" className="rounded-full w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" />
                </div>

                {/* Logout Button (Show on click) */}
                {showLogout && (
                  <Link to="/">
                  <button 
                    onClick={Logout}
                    className="absolute bottom-[-30px] md:bottom-[-36px] left-[87px] md:left-[151px] lg:left-[196px] text-white text-xs md:text-sm lg:text-[1rem] font-semibold bg-black px-4 md:px-6 lg:px-8 py-2 lg:py-3 rounded-b"
                  >
                    Logout
                  </button>
                  </Link>
                )}
                
              </div>
            </div>
          ) : (
            <div className="text-center">
              <h2 className="font-semibold text-xs md:text-[1rem] lg:text-xl">Guest</h2>
              <p className="text-red-600 text-[0.7rem] md:text-[0.8rem] lg:text-[1rem]">Please sign in</p>
            </div>
          )}
        </div>
      </nav>
      <hr className='border-black'/>
    </div>
  );
};

export default Navbar;
