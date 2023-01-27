// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA6yurMLlTBY9JfmW-V_gM72lZ1JgmYZ3U",
  authDomain: "crud-firebase-7cfa4.firebaseapp.com",
  projectId: "crud-firebase-7cfa4",
  storageBucket: "crud-firebase-7cfa4.appspot.com",
  messagingSenderId: "960713132643",
  appId: "1:960713132643:web:bc99eb515c1e2ba18c0656"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)