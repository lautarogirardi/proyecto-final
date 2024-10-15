// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBAgr_UAPFNq1u-MZBW_RXl0WV3XD2J998",
  authDomain: "proyecto-final-3eb8d.firebaseapp.com",
  projectId: "proyecto-final-3eb8d",
  storageBucket: "proyecto-final-3eb8d.appspot.com",
  messagingSenderId: "63633780265",
  appId: "1:63633780265:web:4485e99b4d3f97d131b638",
  measurementId: "G-2Y08SF27LM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);