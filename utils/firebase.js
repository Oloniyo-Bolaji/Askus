import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyBwdF539TF8IosHZ36RBZ7aUvEtg3AtEfY",
  authDomain: "backend-next-9d9b2.firebaseapp.com",
  projectId: "backend-next-9d9b2",
  storageBucket: "backend-next-9d9b2.firebasestorage.app",
  messagingSenderId: "764628986410",
  appId: "1:764628986410:web:16ea27bc80c3f93cd7f153",
  measurementId: "G-ZLC4MZ74SD"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()
export {auth, googleProvider}
