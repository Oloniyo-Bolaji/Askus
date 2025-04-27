import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCJ3gcu-HhHWz9mIeJB5HIYSzGA-3-21VQ",
  authDomain: "askus-59b6a.firebaseapp.com",
  projectId: "askus-59b6a",
  storageBucket: "askus-59b6a.firebasestorage.app",
  messagingSenderId: "323639682775",
  appId: "1:323639682775:web:af2a70da4566d6884e3292",
  measurementId: "G-NZC3XXWVR7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()
export {auth, googleProvider}
