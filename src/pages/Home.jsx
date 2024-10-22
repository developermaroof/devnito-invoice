// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

// Components
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Icons
import GoogleIcon from '../assets/google.png';
import AddInvoice from '../assets/AddInvoice.png';
import ViewInvoice from '../assets/ViewInvoice.png';

// Images
import Logo from '../assets/logo.png';

const Home = () => {
  const { isLoggedIn, GoogleSignUp } = useAuthContext(); // Access userData here

  return (
    <>
      {!isLoggedIn && (
        <div className="flex flex-col justify-center min-h-screen mx-auto max-w-[370px]">
          <div>
            <div className="">
              <img className="mx-auto h-10 w-10" src={Logo} alt="Your Company"/>
              <h2 className="mt-5 text-center text-2xl font-bold tracking-tight
              text-gray-900">SignIn with your Google Account</h2>
            </div>
            <div className="mt-10 w-full">
              <button onClick={GoogleSignUp} type="button" 
                className="flex mx-auto w-full gap-2 items-center justify-center rounded-md
                bg-indigo-600 px-3 py-2 text-sm font-semibold leading-6 text-white 
                shadow-sm hover:bg-indigo-500 focus-visible:outline 
                focus-visible:outline-2 focus-visible:outline-offset-2 
                focus-visible:outline-indigo-600">
                <img src={GoogleIcon} alt="googleicon" className='w-6 h-6' />
                <p className=''>Sign in</p>
              </button>
            </div>
            </div>
      </div>
      )}
      {isLoggedIn && (
        <div className='flex flex-col'>
        <Navbar />
        <div className='p-4 flex flex-col gap-4 lg:gap-10 justify-center items-center text-center'>
          <h1 className='text-sm sm:text-[1rem] md:text-lg lg:text-2xl p-6 px-8 sm:px-32 md:px-44'>
            Make your contract list now, with Sales contracts List Software from Devnito LLC.
          </h1>
          {/* Contracts Section */}
          <div className='flex flex-col lg:flex-row gap-10 pb-6 lg:pb-0'>
            {/* View */}
            <div className='flex flex-col justify-center items-center w-52 lg:w-64 px-4 rounded-lg shadow-[0_3px_10px_rgba(0,0,0,0.4)]'>
              <div className='bg-black w-14 lg:w-16 h-2 lg:h-[0.6rem] rounded-bl-3xl rounded-br-3xl mb-6'></div>
              <div className='border-[0.1rem] border-black rounded-full p-[0.1rem] lg:p-[0.2rem] flex justify-center items-center'>
                <div className='bg-black p-3 lg:p-4 rounded-full flex justify-center items-center'>
                  <img src={ViewInvoice} alt="" className='w-4 h-4 lg:w-5 lg:h-5' />
                </div>
              </div>
              <button className='mt-2 mb-10 lg:mb-12'>
                <Link to="/invoicelist">
                  <h2 className='font-semibold lg:text-xl'>View Contracts</h2>
                </Link>
              </button>
            </div>
            {/* Add */}
            <div className='flex flex-col justify-center items-center w-52 lg:w-64 px-4 rounded-lg shadow-[0_3px_10px_rgba(0,0,0,0.4)]'>
              <div className='bg-black w-14 lg:w-16 h-2 lg:h-[0.6rem] rounded-bl-3xl rounded-br-3xl mb-6'></div>
              <div className='border-[0.1rem] border-black rounded-full p-[0.1rem] lg:p-[0.2rem] flex justify-center items-center'>
                <div className='bg-black p-3 lg:p-4 rounded-full flex justify-center items-center'>
                  <img src={AddInvoice} alt="" className='w-4 h-4 lg:w-5 lg:h-5' />
                </div>
              </div>
              <button className='mt-2 mb-10 lg:mb-12'>
                <Link to="/addinvoices">
                  <h2 className='font-semibold lg:text-xl'>Add Contract</h2>
                </Link>
              </button>
            </div>
          </div>
          {/* Contracts Section */}
          
          {/* Clients Section */}
          <div className='flex flex-col lg:flex-row gap-10 pb-6 lg:pb-0'>
          {/* View */}
          <div className='flex flex-col justify-center items-center w-52 lg:w-64 px-4 rounded-lg shadow-[0_3px_10px_rgba(0,0,0,0.4)]'>
            <div className='bg-black w-14 lg:w-16 h-2 lg:h-[0.6rem] rounded-bl-3xl rounded-br-3xl mb-6'></div>
            <div className='border-[0.1rem] border-black rounded-full p-[0.1rem] lg:p-[0.2rem] flex justify-center items-center'>
              <div className='bg-black p-3 lg:p-4 rounded-full flex justify-center items-center'>
                <img src={ViewInvoice} alt="" className='w-4 h-4 lg:w-5 lg:h-5' />
              </div>
            </div>
            <button className='mt-2 mb-10 lg:mb-12'>
              <Link to="/clientlist">
                <h2 className='font-semibold lg:text-xl'>View Clients</h2>
              </Link>
            </button>
          </div>
          {/* Add */}
          <div className='flex flex-col justify-center items-center w-52 lg:w-64 px-4 rounded-lg shadow-[0_3px_10px_rgba(0,0,0,0.4)]'>
            <div className='bg-black w-14 lg:w-16 h-2 lg:h-[0.6rem] rounded-bl-3xl rounded-br-3xl mb-6'></div>
            <div className='border-[0.1rem] border-black rounded-full p-[0.1rem] lg:p-[0.2rem] flex justify-center items-center'>
              <div className='bg-black p-3 lg:p-4 rounded-full flex justify-center items-center'>
                <img src={AddInvoice} alt="" className='w-4 h-4 lg:w-5 lg:h-5' />
              </div>
            </div>
            <button className='mt-2 mb-10 lg:mb-12'>
              <Link to="/addclient">
                <h2 className='font-semibold lg:text-xl'>Add Client</h2>
              </Link>
            </button>
          </div>
          </div>
          {/* Clients Section */}
          {/* Developers Section */}
          <div className='flex flex-col lg:flex-row gap-10 pb-6 lg:pb-0'>
          {/* View */}
          <div className='flex flex-col justify-center items-center w-52 lg:w-64 px-4 rounded-lg shadow-[0_3px_10px_rgba(0,0,0,0.4)]'>
            <div className='bg-black w-14 lg:w-16 h-2 lg:h-[0.6rem] rounded-bl-3xl rounded-br-3xl mb-6'></div>
            <div className='border-[0.1rem] border-black rounded-full p-[0.1rem] lg:p-[0.2rem] flex justify-center items-center'>
              <div className='bg-black p-3 lg:p-4 rounded-full flex justify-center items-center'>
                <img src={ViewInvoice} alt="" className='w-4 h-4 lg:w-5 lg:h-5' />
              </div>
            </div>
            <button className='mt-2 mb-10 lg:mb-12'>
              <Link to="/developerlist">
                <h2 className='font-semibold lg:text-xl'>View Developers</h2>
              </Link>
            </button>
          </div>
          {/* Add */}
          <div className='flex flex-col justify-center items-center w-52 lg:w-64 px-4 rounded-lg shadow-[0_3px_10px_rgba(0,0,0,0.4)]'>
            <div className='bg-black w-14 lg:w-16 h-2 lg:h-[0.6rem] rounded-bl-3xl rounded-br-3xl mb-6'></div>
            <div className='border-[0.1rem] border-black rounded-full p-[0.1rem] lg:p-[0.2rem] flex justify-center items-center'>
              <div className='bg-black p-3 lg:p-4 rounded-full flex justify-center items-center'>
                <img src={AddInvoice} alt="" className='w-4 h-4 lg:w-5 lg:h-5' />
              </div>
            </div>
            <button className='mt-2 mb-10 lg:mb-12'>
              <Link to="/adddeveloper">
                <h2 className='font-semibold lg:text-xl'>Add Developer</h2>
              </Link>
            </button>
          </div>
          </div>
          {/* Developers Section */}
        </div>
        <Footer />
        </div>
      )}
    </>
  );
};

export default Home;