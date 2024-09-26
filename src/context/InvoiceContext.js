// src/context/InvoiceContext.js
import React, { createContext, useState, useContext, useEffect } from "react";
import { db } from "../firebase/firebaseConfig";
import { collection, addDoc, getDocs } from "firebase/firestore";

const InvoiceContext = createContext();

export const InvoiceProvider = ({ children }) => {
  const [invoices, setInvoices] = useState([]);

  // Fetch invoices from Firestore
  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "invoices"));
        const invoicesData = querySnapshot.docs.map((doc) => ({
          id: doc.id, // document ID
          ...doc.data(), // document data
        }));
        setInvoices(invoicesData);
      } catch (error) {
        console.error("Error fetching invoices: ", error);
      }
    };

    fetchInvoices();
  }, []);

  // Add an invoice to Firestore
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

  // Remove an invoice (by index)
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
