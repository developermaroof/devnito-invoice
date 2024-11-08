import React from "react";
import { useAuthContext } from "../context/AuthContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Error from "../pages/Error";
import AddContract from "../pages/AddContract";
import AddClient from "../pages/AddClient";
import Home from "../pages/Home";
import ProtectedRoute from "./ProtectedRoute";
import GoogleSignIn from "../pages/GoogleSignIn";
import ContractsList from "../pages/ContractsList";
import ClientsList from "../pages/ClientsList";
import ClientDetails from "../components/ClinetDetails";


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
              <AddContract />
            </ProtectedRoute>
            } />
          <Route path="/contractslist" element={ 
            <ProtectedRoute>
              <ContractsList />
            </ProtectedRoute>
          } />
          <Route path="/addclient" element={ 
            <ProtectedRoute>
              <AddClient />
            </ProtectedRoute>
          } />
          <Route path="/clientslist" element={ 
            <ProtectedRoute>
              <ClientsList />
            </ProtectedRoute>
          } />
          <Route path="/clientdetails/:clientId" element={ 
            <ProtectedRoute>
              <ClientDetails />
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
