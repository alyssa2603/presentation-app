// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBAQeuS6JyjWewsOSLMs8w97t018413Y2I",
  authDomain: "internship-52f2a.firebaseapp.com",
  projectId: "internship-52f2a",
  storageBucket: "internship-52f2a.firebasestorage.app",
  messagingSenderId: "963034289187",
  appId: "1:963034289187:web:665cbef7babdd040e74d96",
  measurementId: "G-GZ93F5RJWV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);