'use client'

import { createContext, useState, useEffect } from 'react';
import { signInWithPopup, onAuthStateChanged, signOut } from 'firebase/auth'
import { auth, googleProvider } from './firebase.js'
import {useRouter} from 'next/navigation';

const NextContext = createContext();


const NextProvider = ({ children }) => {
  const router= useRouter()
  const [isUser, setIsUser] = useState(false)
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
  const [signedUpUser, setSignedUpUser] = useState({})
  
  
  const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    setIsUser(true);

    // First, check if user already exists
    const checkUser = await fetch(`/api/auth/${user.uid}`);
    
    if (checkUser.ok) {
      console.log('User already exists.');
    } else {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uid: user.uid,
          email: user.email,
          username: user.displayName,
          number: user.phoneNumber,
          image: user.photoURL,
        }),
      });

      if (response.ok) {
        console.log('New user created and saved to MongoDB.');
        alert('Signed in successfully!');
      } else {
        console.log('Error saving user:', response.status);
      }
    }
  } catch (err) {
    console.log('Login error:', err);
    alert('Login failed. Please try again.');
  }
};

  const logOut = async () => {
  try {
    await signOut(auth);
    setIsUser(false);
    setUserId('');
    setSignedUpUser(null);
    console.log('Logged out successfully.');
  } catch (error) {
    console.log('Logout error:', error);
  }
};

  useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (user) {
      setIsUser(true);
      setUserId(user.uid);
      setSignedUpUser(user);
    } else {
      setIsUser(false);
      setUserId('');
      setSignedUpUser(null);
    }
  });

  return () => unsubscribe();
}, []);

  const CreatePost = async () => {
    try{
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
 
  const editPost = async (id) => {
   setIsEditting(true)
   router.push(`/Edit?id=${id}`)
}
 
  const submitEditPost = async (id) => {
 try{
  const response = await fetch(`api/post/${id}/edit`, {
  method: 'PATCH',
  body: JSON.stringify({ 
    post:edit.post,
    tag: edit.tag
   }),
 })
 const data = await response.json()
   if(response.ok){
      alert('post edited')
    setEdit({
      post: '',
      tag: ''  
      })
    }
 }catch(error){
   console.log(error)
 }
} 

  const deletePost = async (id) => {
   try{
  const response = await fetch(`api/post/${id}`, {
  method: 'DELETE',
 })
 const data = await response.json()
   if(response.ok){
     alert('post deleted')
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
    <NextContext.Provider value={{ isUser, signedUpUser,  loginWithGoogle, logOut, CreatePost, submitting, editPost, deletePost, isEditting, setIsEditting, userPost, setUserPost, userId, posts, userPosts, userComments, posted, fetchPostDetails}}>
      {children}
    </NextContext.Provider>
  );
};

export { NextContext, NextProvider };