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
        const { displayName, email } = result;
        setUserData({ displayName, email });
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
        const { displayName, email } = result.user;
        setUserData({ displayName, email });
        setIsLoggedIn(true);
      })
      .catch((error) => {
        console.log({ error });
      });

    console.log('Google SignedUp');
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
    <div>
        <Navbar/>
    <div className="flex justify-center items-center min-h-screen">
      {!isLoggedIn && (
        <div className="flex justify-center items-center">
          <button onClick={GoogleSignUp} type="button" className="login-with-google-btn">
            Sign in with Google
          </button>
        </div>
      )}

      {isLoggedIn && (
        <div className="">
          <h1>Home</h1>
          <p>{userData.displayName}</p>
          <p>{userData.email}</p>
          <button onClick={Logout} type='button'>Log out</button>
        </div>
      )}
    </div>
    </div>
  );
};

export default Home;
