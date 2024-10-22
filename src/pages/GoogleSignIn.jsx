import React from 'react';
import { useAuthContext } from '../context/AuthContext';
import Logo from '../assets/logo.png';
import GoogleIcon from '../assets/google.png';

const GoogleSignIn = () => {
  const { GoogleSignUp } = useAuthContext();

  return (
    <div className="flex flex-col justify-center min-h-screen mx-auto max-w-[370px]">
      <div>
        <div className="">
          <img className="mx-auto h-10 w-10" src={Logo} alt="Your Company" />
          <h2 className="mt-5 text-center text-2xl font-bold tracking-tight text-gray-900">
            Sign in with your Google Account
          </h2>
        </div>
        <div className="mt-10 w-full">
          <button
            onClick={GoogleSignUp}
            type="button"
            className="flex mx-auto w-full gap-2 items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <img src={GoogleIcon} alt="googleicon" className="w-6 h-6" />
            <p>Sign in</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default GoogleSignIn;
