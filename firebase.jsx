// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const analytics = getAnalytics(app);