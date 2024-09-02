import React, { useEffect, useState } from 'react';
import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import GoogleIcon from '../assets/google.png';


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
          <div className='p-4 flex flex-col gap-4 justify-center items-center text-center'>
            <h1>Make your email list now, with Sales Email List Software from Devnito LLC.</h1>
            <div className='flex flex-col gap-10'>

              <div className='flex flex-col justify-center items-center w-52 px-4 rounded-lg shadow-[0_3px_10px_rgba(0,0,0,0.4)]'>
                <div className='bg-black w-11 h-2 rounded-bl-3xl rounded-br-3xl mb-6'></div>
                <img src={GoogleIcon} alt="" className='w-6 h-6' width={100} height={100}/>
                <h2 className='mb-10'>View invoices</h2>
              </div>

              <div className='flex flex-col justify-center items-center w-52 px-4 rounded-lg shadow-[0_3px_10px_rgba(0,0,0,0.4)]'>
                <div className='bg-black w-11 h-2 rounded-bl-3xl rounded-br-3xl mb-6'></div>
                <img src={GoogleIcon} alt="" className='w-6 h-6' width={100} height={100}/>
                <h2 className='mb-10'>View invoices</h2>
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
