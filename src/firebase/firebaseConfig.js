import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDI4gNL3cclMUu0bnpzyIQwfZGVyjsFSDw",
  authDomain: "devnito-invoice.firebaseapp.com",
  projectId: "devnito-invoice",
  storageBucket: "devnito-invoice.appspot.com",
  messagingSenderId: "1040106804235",
  appId: "1:1040106804235:web:06b0e39eb7a1c123b9630e",
  measurementId: "G-SX3KC4QKB6",
};

// Initializing Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
