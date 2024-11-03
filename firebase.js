
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBAgr_UAPFNq1u-MZBW_RXl0WV3XD2J998",
  authDomain: "proyecto-final-3eb8d.firebaseapp.com",
  projectId: "proyecto-final-3eb8d",
  storageBucket: "proyecto-final-3eb8d.appspot.com",
  messagingSenderId: "63633780265",
  appId: "1:63633780265:web:4485e99b4d3f97d131b638",
  measurementId: "G-2Y08SF27LM"
};


const app = initializeApp(firebaseConfig);


const db = getFirestore(app);

export { db };
