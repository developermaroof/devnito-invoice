// firebase.js (or wherever you manage Firebase interactions)

import { db } from "./firebaseConfig"; // Adjust import based on your Firebase setup
import { doc, deleteDoc } from "firebase/firestore";

export const deleteInvoiceFromFirebase = async (id) => {
  const invoiceRef = doc(db, "invoices", id); // Adjust the collection name as necessary
  await deleteDoc(invoiceRef);
};
