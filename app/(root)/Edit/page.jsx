'use client'

import React, {useState, useEffect, useContext} from 'react'
import { useSearchParams } from 'next/navigation';
import {auth} from '@utils/firebase'
import {NextContext} from '@/utils/context.js'
import '../../globals.css'
   
const Edit = () => {
  const [edit, setEdit] = useState({
    post: '',
    tag: ''
  }) 
  const [isEditting, setIsEditting] = useState(false)
const searchParams = useSearchParams();
const postId = searchParams.get('id');
  
  
  useEffect(() => {
    const getEditDetails = async () => {
      const response = await fetch(`/api/post/${postId}`)
      const data = await response.json()
      setEdit({
        post: data.post,
        tag: data.tag
      })
    }
    if(postId) getEditDetails();
  }, [postId])
  

const submitEditPost = async () => {
  try {
    setIsEditting(true);

    const response = await fetch(`/api/post/${postId}/edit`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        post: edit.post,
        tag: edit.tag
      }),
    });

    if (response.ok) {
      alert('Post edited');
      setEdit({ post: '', tag: '' });
    }
  } catch (error) {
    console.log(error);
  } finally {
    setIsEditting(false);
  }
};
 
const handleSubmit = async (e) => {
    e.preventDefault()
    await submitEditPost()
  }
  
 
  return(
    <div>
      <div className='hero'>
       <h2>Share your thoughts to others</h2>
       <p>Let your thoughts reach a larger audience and see what they have to say about it.</p>
      </div>
      
      <form onSubmit={handleSubmit}>
        <textarea
           type='text'
           placeholder='Write a post'
           value= {edit.post}
           onChange={(e) => {setEdit({...edit, post: e.target.value})}}
           >
        </textarea>
        <input
           type='text'
           placeholder='Write a post tag' 
           value= {edit.tag}
           onChange={(e) => {setEdit({...edit, tag: e.target.value})}}
           />
         <div className='post-btn'>
            <button>{isEditting ? 'Saving...' : 'Save'}</button>
          </div>
      </form>
    </div>
    )
}
export default Edit;