// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getDatabase } from "firebase/database"; // Import Realtime Database

const firebaseConfig = {
  apiKey: "AIzaSyCxESkPdVSlGjtgwi_qXSgMnautwLHoYps",
  authDomain: "tao-healthdashboard.firebaseapp.com",
  projectId: "tao-healthdashboard",
  storageBucket: "tao-healthdashboard.appspot.com",
  messagingSenderId: "528037870582",
  appId: "1:528037870582:web:c3a4f0f4fee989402be5d7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const database = getDatabase(app); // Initialize Realtime Database

export { auth, provider, signInWithPopup, signOut, database }; // Export 'database'
