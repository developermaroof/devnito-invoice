// src/context/InvoiceContext.js
import React, { createContext, useState, useContext } from "react";
import { db } from "../firebase/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

const InvoiceContext = createContext();

export const InvoiceProvider = ({ children }) => {
  const [invoices, setInvoices] = useState([]);

  const addInvoice = async (invoice) => {
    try {
      const docRef = await addDoc(collection(db, "invoices"), invoice);
      setInvoices((prevInvoices) => [
        ...prevInvoices,
        { id: docRef.id, ...invoice },
      ]);
    } catch (error) {
      console.error("Error adding invoice: ", error);
    }
  };

  const removeInvoice = (index) => {
    setInvoices((prevInvoices) => prevInvoices.filter((_, i) => i !== index));
  };

  return (
    <InvoiceContext.Provider value={{ invoices, addInvoice, removeInvoice }}>
      {children}
    </InvoiceContext.Provider>
  );
};

export const useInvoice = () => useContext(InvoiceContext);
