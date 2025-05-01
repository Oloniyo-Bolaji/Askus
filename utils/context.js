'use client'

import { createContext, useState, useEffect } from 'react';
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from 'firebase/auth'
import {useRouter} from 'next/navigation';


const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: "G-NZC3XXWVR7"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()


const NextContext = createContext();

const NextProvider = ({ children }) => {
  const router= useRouter()
  const [signedUpUser, setSignedUpUser] = useState()
  const [userPost, setUserPost] = useState({
    post: '',
    tag: ''
  })
  const [userId, setUserId] = useState('')
  const [userPosts, setUserPosts] = useState([])
  const [userComments, setUserComments] = useState([])
  const [submitting, setSubmitting] = useState(false)
  const [posts, setPosts] = useState([])
  const [posted, setPosted] = useState({})
  
  
const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user
      setSignedUpUser(user)
      setUserId(user.uid)
      alert('signin successful')
    } catch (error) {
      console.error("Login error", error);
    }
  };
  
const logOut = async () => {
    try {
      await signOut(auth);
      setSignedUpUser(null);
      setUserId('');
      alert('Logged out successfully.');
    } catch (error) {
      console.error("Logout error", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUserId(currentUser.uid);
      setSignedUpUser(currentUser);
    });
    return () => unsubscribe();
  }, []);
  
  const CreatePost = async () => {
  try {
    setSubmitting(true); 

    const response = await fetch('/api/post/new', {
      method: 'POST',
      body: JSON.stringify({
        creator: {
          uid: signedUpUser.uid,
          username: signedUpUser.displayName,
          email: signedUpUser.email,
          number: signedUpUser.phoneNumber,
          image: signedUpUser.photoURL
        },
        post: userPost.post,
        tag: userPost.tag
      })
    });

    if (response.ok) {
      alert('New post made');
      setUserPost({
        post: '',
        tag: ''
      });
    }
  } catch (error) {
    console.log(error);
  } finally {
    setSubmitting(false);
  }
};

 
    useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/post')
      const data = await response.json();
      setPosts(data)
    }
    fetchPosts()
  })
  
  useEffect(() => {
    const fetchUserPosts = async () => {
      const response = await fetch(`/api/users/${userId}/posts`)
      const data = await response.json();
      
     setUserPosts(data)
    }
    fetchUserPosts()
  })
  
  useEffect(() => {
    const fetchUserComments = async () => {
      const response = await fetch(`/api/users/${userId}/comments`)
      const data = await response.json();
      
     setUserComments(data)
    }
    fetchUserComments()
  })
  
  const fetchPostDetails = async (id) => {
   const res = await fetch(`api/post/${id}`)
   const data = await res.json()
   console.log(data)
   setPosted(data)
  }


  return (
    <NextContext.Provider value={{
       signedUpUser,  
       loginWithGoogle, 
       logOut, 
       CreatePost, 
       submitting, 
       setUserPost,
       userPost, 
       setUserPost, 
       userId, 
       posts, 
       userPosts, 
       userComments, 
       posted, 
       fetchPostDetails}}>
      {children}
    </NextContext.Provider>
  );
};

export { NextContext, NextProvider };