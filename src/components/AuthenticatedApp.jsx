import React from "react";
import { useAuthContext } from "../context/AuthContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Error from "../pages/Error";
import AddInvoice from "../pages/AddInvoice";
import AddClient from "../pages/AddClient";
import Home from "../components/Home";
import ProtectedRoute from "./ProtectedRoute";
import GoogleSignIn from "../pages/GoogleSignIn";
import ContractsList from "./ContractsList";
import Form from "./Form";


function AuthenticatedApp() {
  const { isLoggedIn } = useAuthContext();


  // <RouterProvider router={router} />
  return isLoggedIn ? (
    <div className="min-h-screen bg-gray-100">
      <BrowserRouter>
        <Dashboard />
        <Routes>
          <Route path="/" element={ 
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          <Route path="/addcontract" element={
            <ProtectedRoute>
              <AddInvoice />
            </ProtectedRoute>
            } />
          <Route path="/invoicelist" element={ 
            <ProtectedRoute>
              <ContractsList />
            </ProtectedRoute>
          } />
          <Route path="/addclient" element={ 
            <ProtectedRoute>
              <AddClient />
            </ProtectedRoute>
          } />
          <Route path="/form" element={ 
            <ProtectedRoute>
              <Form />
            </ProtectedRoute>
          } />
          <Route path="*" element={ <Error />} />
        </Routes>
      </BrowserRouter>
    </div>
  ) : (
    <GoogleSignIn />
  );
}

export default AuthenticatedApp;
