// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD1qrQpU4iONJu0AQ6ufTT5XKZvePSqaRw",
  authDomain: "phyo-deli.firebaseapp.com",
  projectId: "phyo-deli",
  storageBucket: "phyo-deli.firebasestorage.app",
  messagingSenderId: "975439089540",
  appId: "1:975439089540:web:27a20f4267b68c055bd7d1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
