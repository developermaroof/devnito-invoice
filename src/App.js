import React from "react";
import "./App.css";
import { AuthProvider } from "./context/AuthContext";
import { InvoiceProvider } from "./context/InvoiceContext";
import { ClientProvider } from "./context/ClientProvider";
import AuthenticatedApp from "./components/AuthenticatedApp";

function App() {
  return (
    <AuthProvider>
      <InvoiceProvider>
        <ClientProvider>
          <AuthenticatedApp />
        </ClientProvider>
      </InvoiceProvider>
    </AuthProvider>
  );
}

export default App;
