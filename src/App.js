// src/App.js
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

import Home from "./pages/Home";
import Error from "./pages/Error";
import EmailList from "./pages/EmailList";
import FormWithPreview from "./pages/FormWithPreview";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute"; // We'll create this next

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/emaillist",
      element: (
        <ProtectedRoute>
          <EmailList />
        </ProtectedRoute>
      ),
    },
    {
      path: "/addinvoices",
      element: (
        <ProtectedRoute>
          <FormWithPreview />
        </ProtectedRoute>
      ),
    },
    {
      path: "*",
      element: <Error />,
    },
  ]);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
