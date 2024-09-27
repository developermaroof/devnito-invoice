import React, { createContext, useState, useContext, useEffect } from "react";
import { db } from "../firebase/firebaseConfig";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

const InvoiceContext = createContext();

export const useInvoice = () => {
  return useContext(InvoiceContext);
};

export const InvoiceProvider = ({ children }) => {
  const [invoices, setInvoices] = useState([]);

  // Fetch invoices from Firestore
  const fetchInvoices = async () => {
    const invoicesCollection = collection(db, "invoices");
    const invoicesSnapshot = await getDocs(invoicesCollection);
    const invoicesList = invoicesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setInvoices(invoicesList);
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
    // Instead of fetching invoices here, notify the component to remove the invoice
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  return (
    <InvoiceContext.Provider
      value={{ invoices, setInvoices, updateInvoice, deleteInvoice }}
    >
      {children}
    </InvoiceContext.Provider>
  );
};
