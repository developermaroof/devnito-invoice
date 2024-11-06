import React from "react";
import "./App.css";
import { AuthProvider } from "./context/AuthContext";
import { InvoiceProvider } from "./context/InvoiceContext";
import { ClientProvider } from "./context/ClientContext";
import AuthenticatedApp from "./components/AuthenticatedApp";

function App() {
  return (
    <AuthProvider>
      <InvoiceProvider>
        <ClientProvider>
          <div className="min-h-screen bg-gray-50">
            <AuthenticatedApp />
          </div>
        </ClientProvider>
      </InvoiceProvider>
    </AuthProvider>
  );
}

export default App;
