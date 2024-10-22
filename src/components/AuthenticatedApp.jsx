import React from "react";
import { useAuthContext } from "../context/AuthContext";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Error from "../pages/Error";
import InvoiceList from "../pages/InvoiceList";
import AddInvoice from "../pages/AddInvoice";
import AddClient from "../pages/AddClient";
import ProtectedRoute from "./ProtectedRoute";
import GoogleSignIn from "../pages/GoogleSignIn";

function AuthenticatedApp() {
  const { isLoggedIn } = useAuthContext();

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      ),
    },
    {
      path: "/invoicelist",
      element: (
        <ProtectedRoute>
          <InvoiceList />
        </ProtectedRoute>
      ),
    },
    {
      path: "/addinvoices",
      element: (
        <ProtectedRoute>
          <AddInvoice />
        </ProtectedRoute>
      ),
    },
    {
      path: "/addclient",
      element: (
        <ProtectedRoute>
          <AddClient />
        </ProtectedRoute>
      ),
    },
    {
      path: "*",
      element: <Error />,
    },
  ]);

  return isLoggedIn ? <RouterProvider router={router} /> : <GoogleSignIn />;
}

export default AuthenticatedApp;
