import React from 'react';
import logo from '../assets/logo.png'

const Navbar = ({ userData, isLoggedIn }) => {
  return (
    <>
      <nav className="flex justify-between items-center py-4 px-8 border-b border-black">
        <div className="flex items-center justify-center">
          <img src={logo} alt="Logo" className="mr-2 w-8 h-8" width={100} height={100}/>
          <h1 className="text-lg font-semibold">Invoice Management System</h1>
        </div>
        <div className="flex items-center justify-center">
          {isLoggedIn ? (
            <div className="flex items-center justify-center p-4  bg-black">
              <div className="mr-4 flex flex-col text-center justify-center">
                <h2 className="font-semibold text-white">{userData.displayName}</h2>
                <p className='text-gray-300'>{userData.email}</p>
              </div>
              <img src={userData.photoURL || ""} alt="Profile" className="rounded-full w-10 h-10" />
             
            </div>
          ) : (
            <div>
              <h2 className="font-semibold">Guest</h2>
              <p>Please sign in</p>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
