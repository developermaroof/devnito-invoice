import React, { createContext, useState, useContext, useEffect } from "react";
import { db } from "../firebase/firebaseConfig";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where
} from "firebase/firestore";
import { auth } from '../firebase/firebaseConfig'; // Ensure you're importing auth

const InvoiceContext = createContext();

export const useInvoice = () => {
  return useContext(InvoiceContext);
};

export const InvoiceProvider = ({ children }) => {
  const [invoices, setInvoices] = useState([]);
  const [error, setError] = useState(null); // State for error handling

  // Fetch invoices from Firestore
  const fetchInvoices = async () => {
    const user = auth.currentUser; // Get the current authenticated user
    if (!user) {
      setError('User not authenticated. Please log in.'); // Set error if not authenticated
      return;
    }

    try {
      const invoicesCollection = collection(db, "invoices");
      const q = query(invoicesCollection, where("userId", "==", user.uid)); // Only fetch invoices for the authenticated user
      const invoicesSnapshot = await getDocs(q);
      const invoicesList = invoicesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setInvoices(invoicesList);
    } catch (err) {
      console.error('Error fetching invoices:', err);
      setError('Failed to fetch invoices. Please try again later.'); // Set error if fetching fails
    }
  };

  // Update invoice in Firestore
  const updateInvoice = async (id, updatedData) => {
    const invoiceDoc = doc(db, "invoices", id);
    await updateDoc(invoiceDoc, updatedData);
    fetchInvoices(); // Refresh the invoices after updating
  };

  // Delete invoice from Firestore
  const deleteInvoice = async (id) => {
    const invoiceDoc = doc(db, "invoices", id);
    await deleteDoc(invoiceDoc);
    setInvoices((prevInvoices) => prevInvoices.filter((invoice) => invoice.id !== id)); // Remove deleted invoice from state
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  return (
    <InvoiceContext.Provider
      value={{ invoices, setInvoices, updateInvoice, deleteInvoice, error }} // Pass error to consumers
    >
      {children}
    </InvoiceContext.Provider>
  );
};
