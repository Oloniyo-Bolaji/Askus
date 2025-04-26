'use client'

import React, {useState, useEffect, useContext} from 'react'
import {auth} from '@utils/firebase'
import {NextContext} from '@/utils/context.js'
import '../../globals.css'
   
const Create = () => {
  
  const { CreatePost, submitting,  userPost, setUserPost, isEditting, submitEditPost } = useContext(NextContext)
  
    const handleSubmit = async (e) => {
    e.preventDefault()
    await CreatePost()
  }
  
  return(
    <div>
      <div className='hero'>
       <h2>Share your thoughts to others</h2>
       <p>Let your thoughts reach a larger audience and see what they have to say about it.</p>
      </div>
      
      <form onSubmit={isEditting? submitEditPost : handleSubmit}>
        <textarea
           type='text'
           placeholder='Write a post'
           value={userPost.post}
           onChange={(e) => {setUserPost({...userPost, post: e.target.value})}}>
        </textarea>
        <input
           type='text'
           placeholder='Write a post tag' 
           value={userPost.tag}
           onChange={(e) => {setUserPost({...userPost, tag: e.target.value})}}/>
         <div className='post-btn'>
            <button>{isEditting ? 'Save' : 'Post'}</button>
          </div>
      </form>
    </div>
    )
}
export default Create;