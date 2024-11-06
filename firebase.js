import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyBd0ha2dFK6to0S6Po-aIiE-ZS2anwG0Sw",
  authDomain: "proyecto-final-b2079.firebaseapp.com",
  projectId: "proyecto-final-b2079",
  storageBucket: "proyecto-final-b2079.firebasestorage.app",
  messagingSenderId: "218259672624",
  appId: "1:218259672624:web:8454082f4270fe65bae7f5",
  measurementId: "G-11V25LFVHH"
};


const app = initializeApp(firebaseConfig);



const db = getFirestore(app);

export { db };
