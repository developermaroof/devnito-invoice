import { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { auth } from "./firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import "./App.css";

import Home from "./pages/Home";
import Error from "./pages/Error";
import EmailList from "./pages/EmailList";
import FormWithPreview from "./pages/FormWithPreview";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false); // Stop loading once the user state is known
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show a loading spinner while checking auth
  }

  return (
    <>
      <RouterProvider router={router(user)} />
    </>
  );
}

// Custom router creation function to ensure user state is passed in
const router = (user) =>
  createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/emaillist",
      element: user ? <EmailList /> : <Error />, // Protect EmailList route based on user auth state
    },
    {
      path: "/addinvoices",
      element: user ? <FormWithPreview /> : <Error />, // Protect EmailList route based on user auth state
    },
    {
      path: "*",
      element: <Error />,
    },
  ]);

export default App;
