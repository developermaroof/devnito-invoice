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

const Home = () => {
  const { isLoggedIn, GoogleSignUp } = useAuthContext(); // Access userData here

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow flex justify-center items-center">
        {!isLoggedIn && (
          <div className="flex flex-col justify-center items-center p-10 gap-6 lg:gap-8">
            <h1 className='font-bold text-xl md:text-2xl lg:text-3xl'>Sign In</h1>
            <button onClick={GoogleSignUp} type="button" className="flex justify-center items-center text-center border p-2 md:p-3 gap-2 lg:gap-3 rounded">
              <img src={GoogleIcon} alt="googleicon" className='w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10' />
              <p className='md:text-lg lg:text-xl'>Sign in with Google</p>
            </button>
          </div>
        )}
        {isLoggedIn && (
          <div className='p-4 flex flex-col gap-4 lg:gap-10 justify-center items-center text-center'>
            <h1 className='text-sm sm:text-[1rem] md:text-lg lg:text-2xl p-6 px-8 sm:px-32 md:px-44'>
              Make your contract list now, with Sales contracts List Software from Devnito LLC.
            </h1>
            <div className='flex flex-col lg:flex-row gap-10 pb-6 lg:pb-0'>

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

              <div className='flex flex-col justify-center items-center w-52 lg:w-64 px-4 rounded-lg shadow-[0_3px_10px_rgba(0,0,0,0.4)]'>
                <div className='bg-black w-14 lg:w-16 h-2 lg:h-[0.6rem] rounded-bl-3xl rounded-br-3xl mb-6'></div>
                <div className='border-[0.1rem] border-black rounded-full p-[0.1rem] lg:p-[0.2rem] flex justify-center items-center'>
                  <div className='bg-black p-3 lg:p-4 rounded-full flex justify-center items-center'>
                    <img src={AddInvoice} alt="" className='w-4 h-4 lg:w-5 lg:h-5' />
                  </div>
                </div>
                <button className='mt-2 mb-10 lg:mb-12'>
                  <Link to="/addinvoices">
                    <h2 className='font-semibold lg:text-xl'>Add Contracts</h2>
                  </Link>
                </button>
              </div>

            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Home;