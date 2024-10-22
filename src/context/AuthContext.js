import React, { createContext, useState, useEffect, useContext } from "react";
import {
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);

  const GoogleSignUp = () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        const { displayName, email, photoURL, uid } = result.user;
        setUserData({ displayName, email, photoURL, uid });
        setIsLoggedIn(true);
      })
      .catch((error) => {
        console.error("Google Sign-In Error:", error);
      });
  };

  const Logout = () => {
    signOut(auth)
      .then(() => {
        setUserData({});
        setIsLoggedIn(false);
      })
      .catch((error) => {
        console.error("Sign-Out Error:", error);
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("Auth State Changed: ", user);
      if (user) {
        const { displayName, email, photoURL, uid } = user;
        setUserData({ displayName, email, photoURL, uid });
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        setUserData({});
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, userData, GoogleSignUp, Logout }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
