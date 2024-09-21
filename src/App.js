// src/App.js
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

import Home from "./pages/Home";
import Error from "./pages/Error";
import InvoiceList from "./pages/InvoiceList";
import AddInvoice from "./pages/AddInvoice";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute"; // We'll create this next

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
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
