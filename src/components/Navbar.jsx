import React from 'react';
import logo from '../assets/logo.png';

const Navbar = ({ userData, isLoggedIn }) => {
  return (
    <>
      <nav className="flex justify-between items-center p-4 border-b border-black">
        <div className="flex items-center gap-1">
          <img src={logo} alt="Logo" className="w-6 h-6" />
          {/* Display full title on large screens and up, and short title on smaller screens */}
          <h1 className="text-sm font-bold hidden lg:block">Invoice Management System</h1>
          <h1 className="text-md font-bold lg:hidden">Invoices</h1>
        </div>
        <div className="flex items-center">
          {isLoggedIn ? (
            <div className=" flex items-center justify-center bg-black rounded-md p-2 px-3 space-x-2">
              <div className="flex flex-col justify-center">
                <h2 className="font-semibold text-white text-[0.7rem]">{userData.displayName}</h2>
                <p className="text-gray-300 text-[0.5rem]">{userData.email}</p>
              </div>
              <div className='flex justify-center items-center'>
                <img src={userData.photoURL || ""} alt="Profile" className="rounded-full w-8 h-8" />
              </div>
            </div>
          ) : (
            <div className="text-center">
              <h2 className="font-semibold text-xs">Guest</h2>
              <p className="text-red-600 text-[0.7rem]">Please sign in</p>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
