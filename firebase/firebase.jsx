// firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Configuración de tu proyecto Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBd0ha2dFK6to0S6Po-aIiE-ZS2anwG0Sw",
    authDomain: "proyecto-final-b2079.firebaseapp.com",
    projectId: "proyecto-final-b2079",
    storageBucket: "proyecto-final-b2079.appspot.com",
    messagingSenderId: "218259672624",
    appId: "1:218259672624:web:8454082f4270fe65bae7f5",
    measurementId: "G-11V25LFVHH",
    databaseURL: "https://proyecto-final-b2079-default-rtdb.firebaseio.com/"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { app, database };