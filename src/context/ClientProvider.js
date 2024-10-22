// src/context/ClientContext.js
import React, { createContext, useState, useContext, useEffect } from "react";
import { db } from "../firebase/firebaseConfig";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { auth } from "../firebase/firebaseConfig"; // Ensure you're importing auth

const ClientContext = createContext();

export const useClient = () => {
  return useContext(ClientContext);
};

export const ClientProvider = ({ children }) => {
  const [clients, setClients] = useState([]);
  const [error, setError] = useState(null); // State for error handling

  // Fetch clients from Firestore
  const fetchClients = async () => {
    const user = auth.currentUser; // Get the current authenticated user
    if (!user) {
      setError("User not authenticated. Please log in."); // Set error if not authenticated
      return;
    }

    try {
      const clientsCollection = collection(db, "clients");
      const clientsSnapshot = await getDocs(clientsCollection);
      const clientsList = clientsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setClients(clientsList);
    } catch (err) {
      console.error("Error fetching clients:", err);
      setError("Failed to fetch clients. Please try again later."); // Set error if fetching fails
    }
  };

  // Add a new client
  const addClient = async (clientData) => {
    const user = auth.currentUser; // Get the current authenticated user
    if (!user) {
      setError("User not authenticated. Please log in."); // Set error if not authenticated
      return;
    }

    try {
      await addDoc(collection(db, "clients"), {
        ...clientData,
        userId: user.uid, // Assuming you want to associate clients with a user
      });
      fetchClients(); // Refresh the clients after adding
    } catch (err) {
      console.error("Error adding client:", err);
      setError("Failed to add client. Please try again later."); // Set error if adding fails
    }
  };

  // Update client in Firestore
  const updateClient = async (id, updatedData) => {
    const clientDoc = doc(db, "clients", id);
    await updateDoc(clientDoc, updatedData);
    fetchClients(); // Refresh the clients after updating
  };

  // Delete client from Firestore
  const deleteClient = async (id) => {
    const clientDoc = doc(db, "clients", id);
    await deleteDoc(clientDoc);
    setClients((prevClients) =>
      prevClients.filter((client) => client.id !== id)
    ); // Remove deleted client from state
  };

  useEffect(() => {
    fetchClients();
  }, []);

  return (
    <ClientContext.Provider
      value={{
        clients,
        setClients,
        addClient,
        updateClient,
        deleteClient,
        error,
      }}
    >
      {children}
    </ClientContext.Provider>
  );
};
