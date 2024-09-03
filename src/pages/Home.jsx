import React, { useEffect, useState } from 'react';
import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';
import { Link } from 'react-router-dom';

// Components
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// icons
import GoogleIcon from '../assets/google.png';
import AddInvoice from '../assets/AddInvoice.png'
import ViewInvoice from '../assets/ViewInvoice.png'

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("User: ", user); // Check if the user object is being returned properly
      if (user) {
        const { displayName, email, photoURL } = user;
        setUserData({ displayName, email, photoURL });
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
  
    return () => unsubscribe();
  }, []);
  
  

  const GoogleSignUp = () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        const { displayName, email, photoURL } = result.user;
        setUserData({ displayName, email, photoURL });
        setIsLoggedIn(true);
      })
      .catch((error) => {
        console.log({ error });
      });
  };

  const Logout = () => {
    signOut(auth)
      .then(() => {
        setUserData({});
        setIsLoggedIn(false);
      })
      .catch((error) => {
        console.log({ error });
      });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar userData={userData} isLoggedIn={isLoggedIn} Logout={Logout} />
      <div className="flex-grow flex justify-center items-center">
        {!isLoggedIn && (
          <div className="flex flex-col justify-center items-center p-10 gap-6 lg:gap-8">
            <h1 className='font-bold text-xl md:text-2xl lg:text-3xl'>Sign In</h1>
            <button onClick={GoogleSignUp} type="button" className="flex justify-center items-center text-center border p-2 md:p-3 gap-2 lg:gap-3 rounded">
              <img src={GoogleIcon} alt="googleicon" className='w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10' width={100} height={100}/>
              <p className='md:text-lg lg:text-xl'>Sign in with Google</p>
            </button>
          </div>
        )}
        {isLoggedIn && (
          <div className='p-4 flex flex-col gap-4 lg:gap-10 justify-center items-center text-center'>
            <h1 className='text-sm sm:text-[1rem] md:text-lg lg:text-2xl p-6 px-8 sm:px-32 md:px-44'>Make your email list now, with Sales Email List Software from Devnito LLC.</h1>
            <div className='flex flex-col lg:flex-row gap-10 pb-6 lg:pb-0'>

              <div className='flex flex-col justify-center items-center w-52 lg:w-64 px-4 rounded-lg shadow-[0_3px_10px_rgba(0,0,0,0.4)]'>
                <div className='bg-black w-14 lg:w-16 h-2 lg:h-[0.6rem] rounded-bl-3xl rounded-br-3xl mb-6'></div>
                <div className='border-[0.1rem] border-black rounded-full p-[0.1rem] lg:p-[0.2rem] flex justify-center items-center'>
                  <div className='bg-black p-3 lg:p-4 rounded-full flex justify-center items-center'>
                    <img src={ViewInvoice} alt="" className='w-4 h-4 lg:w-5 lg:h-5' width={100} height={100}/>
                  </div>
                </div>
                <button className='mt-2 mb-10 lg:mb-12'>
                  <h2 className='font-semibold lg:text-xl'>View Invoices</h2>
                </button>
              </div>

              <div className='flex flex-col justify-center items-center w-52 lg:w-64 px-4 rounded-lg shadow-[0_3px_10px_rgba(0,0,0,0.4)]'>
                <div className='bg-black w-14 lg:w-16 h-2 lg:h-[0.6rem] rounded-bl-3xl rounded-br-3xl mb-6'></div>
                <div className='border-[0.1rem] border-black rounded-full p-[0.1rem] lg:p-[0.2rem] flex justify-center items-center'>
                  <div className='bg-black p-3 lg:p-4 rounded-full flex justify-center items-center'>
                    <img src={AddInvoice} alt="" className='w-4 h-4 lg:w-5 lg:h-5' width={100} height={100}/>
                  </div>
                </div>
                <button className='mt-2 mb-10 lg:mb-12'>
                  <Link to="/addinvoices">
                    <h2 className='font-semibold lg:text-xl'>Add Invoices</h2>
                  </Link>
                </button>
              </div>

            </div>
            {/* <button onClick={Logout} type="button" className="border px-2 bg-blue-200">
              Log out
            </button> */}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
