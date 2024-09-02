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
              <img src={GoogleIcon} alt="" className='w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10' width={100} height={100}/>
              <p className='md:text-lg lg:text-xl'>Sign in with Google</p>
            </button>
          </div>
        )}
        {isLoggedIn && (
          <div>
            <button onClick={Logout} type="button" className="bg-red-500 text-white py-2 px-4 rounded">
              Log out
            </button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
