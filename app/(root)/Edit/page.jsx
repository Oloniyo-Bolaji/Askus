'use client'

import React, {useState, useEffect, useContext, use} from 'react'
import {auth} from '@utils/firebase'
import {NextContext} from '@/utils/context.js'
import '../../globals.css'
   
const Edit = ({params}) => {
  const unwrapped = use(params)
  const postId = unwrapped.id
  
  const { editPost, edit, setEdit,  isEditting, submitEditPost } = useContext(NextContext)
  
    const handleSubmit = async (e) => {
    e.preventDefault()
    await submitEditPost(postId)
  }
  useEffect(() => {
   const getEditting = async () => {
     const res = await fetch(`api/post/${postId}`)
     const data = await res.json()
     setEdit({
       post: data.post,
       tag: data.tag
   })
   }
 }, [postId])
 
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
           value= "of course"
           >
        </textarea>
        <input
           type='text'
           placeholder='Write a post tag' 
           />
         <div className='post-btn'>
            <button>Save</button>
          </div>
      </form>
    </div>
    )
}
export default Edit;