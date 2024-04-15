
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBhd4bVknYYXwj69RAZBYnCfvdeucNb4yE",
  authDomain: "buyecommerce-ab149.firebaseapp.com",
  projectId: "buyecommerce-ab149",
  storageBucket: "buyecommerce-ab149.appspot.com",
  messagingSenderId: "866968366236",
  appId: "1:866968366236:web:5530cf408d8ee336c59159",
  measurementId: "G-R3X684HMBJ"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app); 
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();


 
