// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCruqJj97XVZTALpsrxp1UosMyyIg6TIKc",
  authDomain: "ischolarship-egg.firebaseapp.com",
  projectId: "ischolarship-egg",
  storageBucket: "ischolarship-egg.appspot.com",
  messagingSenderId: "89404875984",
  appId: "1:89404875984:web:7d7a0c279c6964fe70ead5",
  measurementId: "G-WFG1TP6M0X"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

