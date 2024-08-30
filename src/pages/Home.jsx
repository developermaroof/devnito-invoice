import React, { useEffect, useState } from 'react';
import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';
import Navbar from '../components/Navbar';

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (result) => {
      if (result) {
        const { displayName, email, photoURL } = result;
        setUserData({ displayName, email, photoURL });  // Include photoURL
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
        setUserData({ displayName, email, photoURL });  // Include photoURL
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
    <>
      {/* Pass userData and isLoggedIn as props to the Navbar */}
      <Navbar userData={userData} isLoggedIn={isLoggedIn} Logout={Logout} />
      
      <div className="flex justify-center items-center min-h-screen">
        {!isLoggedIn && (
          <div className="flex justify-center items-center">
            <button onClick={GoogleSignUp} type="button" className="login-with-google-btn">
              Sign in with Google
            </button>
          </div>
        )}

        {isLoggedIn && (
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Welcome, {userData.displayName}</h1>
            <p className="mb-4">{userData.email}</p>
            <button onClick={Logout} type="button" className="bg-red-500 text-white py-2 px-4 rounded">
              Log out
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
