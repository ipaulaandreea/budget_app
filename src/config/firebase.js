// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyALizjhUPagNrUQGA03CgxQiiTLMFTqFxg",
  authDomain: "budget-5097e.firebaseapp.com",
  projectId: "budget-5097e",
  storageBucket: "budget-5097e.appspot.com",
  messagingSenderId: "163601759581",
  appId: "1:163601759581:web:f9eb34f30c210a950efcb4",
  measurementId: "G-5QS4PFVPYG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)