'use client'

import { createContext, useState, useEffect } from 'react';
import { signInWithPopup, onAuthStateChanged, signOut } from 'firebase/auth'
import { auth, googleProvider } from './firebase.js'
import {useRouter} from 'next/navigation';

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
  const [edit, setEdit] = useState({
    post: '',
    tag: ''
  })
  const [userComments, setUserComments] = useState([])
  const [submitting, setSubmitting] = useState(false)
  const [isEditting, setIsEditting] = useState(false)
  const [posts, setPosts] = useState([])
  const [posted, setPosted] = useState({})
  
  
const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setSignedUpUser(result.user)
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
    try{
    const response = await fetch('/api/post/new', {
      method: 'POST',
      body: JSON.stringify({
        creator: {
          uid: signedUpUser?.uid,
          username: signedUpUser?.displayName,
          email: signedUpUser?.email,
          number: signedUpUser?.phoneNumber,
          image: signedUpUser?.photoURL
        },
        post: userPost.post,
        tag: userPost.tag
      })
    })
    setSubmitting(true)
    if(response.ok){
      alert('new post made')
      setUserPost({
      post: '',
      tag: ''  
      })
      setSubmitting(false)
    }
    }catch(error){
      console.log(error)
    }
  }
 
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
       isEditting,
       setUserPost,
       setIsEditting, 
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