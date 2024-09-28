// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'; // Import for Firebase JS SDK
import { getAuth } from 'firebase/auth'; // Import for authentication

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBd0ha2dFK6to0S6Po-aIiE-ZS2anwG0Sw",
  authDomain: "proyecto-final-b2079.firebaseapp.com",
  projectId: "proyecto-final-b2079",
  storageBucket: "proyecto-final-b2079.appspot.com",
  messagingSenderId: "218259672624",
  appId: "1:218259672624:web:8454082f4270fe65bae7f5",
  measurementId: "G-11V25LFVHH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
