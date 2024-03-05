import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

// CONNECTING TO FIREBASE PROJECT 

const firebaseConfig = {
  apiKey: "AIzaSyCNKA4iBkXpHqchnnONs7ldzNBE65U594w",
  authDomain: "chat-app-fa2be.firebaseapp.com",
  projectId: "chat-app-fa2be",
  storageBucket: "chat-app-fa2be.appspot.com",
  messagingSenderId: "674243951863",
  appId: "1:674243951863:web:430268f60a11097818e7f2",
  measurementId: "G-KW7HF139YB"
};

// init firebase app
const app = initializeApp(firebaseConfig);

// init Authentication
export const auth = getAuth(app)      // we will be using export so that whenever it is needed we can import it

// init Storage Databasse
export const db = getFirestore(app)

