// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth"; // Import Firebase Authentication

const firebaseConfig = {
  apiKey: "AIzaSyCxLgZfZhG8HyzH6XSBuXNoRhPspdWX2iE",
  authDomain: "w-project-43adb.firebaseapp.com",
  projectId: "w-project-43adb",
  storageBucket: "w-project-43adb.appspot.com",
  messagingSenderId: "865999352855",
  appId: "1:865999352855:web:855f695c330f1fc3e59852",
  measurementId: "G-LPVLC66LBW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore (database)
const db = getFirestore(app);

// Initialize Firebase Storage
const storage = getStorage(app);

// Initialize Firebase Authentication
const auth = getAuth(app); // Add Firebase Authentication

// Export Firestore, Storage, and Authentication
export { db, storage, auth };
