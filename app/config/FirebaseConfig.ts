// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAVF9J7L3J90pqasYndFWasgBBsGTA7-3k",
  authDomain: "advsample-c9360.firebaseapp.com",
  projectId: "advsample-c9360",
  storageBucket: "advsample-c9360.firebasestorage.app",
  messagingSenderId: "478184065040",
  appId: "1:478184065040:web:086a3c5b91e203b929e295",
  measurementId: "G-557BC6TH5F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestoreDb=getFirestore(app);