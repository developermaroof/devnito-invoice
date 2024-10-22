import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

import Home from "./pages/Home";
import Error from "./pages/Error";
import InvoiceList from "./pages/InvoiceList";
import AddInvoice from "./pages/AddInvoice";
import AddClient from "./pages/AddClient";
import { AuthProvider } from "./context/AuthContext";
import { InvoiceProvider } from "./context/InvoiceContext";
import { ClientProvider } from "./context/ClientProvider"; // Import ClientProvider
import ProtectedRoute from "./components/ProtectedRoute";

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

  return (
    <AuthProvider>
      <InvoiceProvider>
        <ClientProvider>
          <RouterProvider router={router} />
        </ClientProvider>
      </InvoiceProvider>
    </AuthProvider>
  );
}

export default App;
