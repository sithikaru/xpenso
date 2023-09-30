// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import firebase from "firebase/compat/app";
// Required for side-effects
import "firebase/firestore";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBw6gWUJXMU3RUctKPOPVlnQ5ZAuuCxRgk",
  authDomain: "xpenso-4d3cb.firebaseapp.com",
  projectId: "xpenso-4d3cb",
  storageBucket: "xpenso-4d3cb.appspot.com",
  messagingSenderId: "1069957902884",
  appId: "1:1069957902884:web:f0546d35ffdf0dbaf95eb1",
  measurementId: "G-B7YB4KVWM0"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);