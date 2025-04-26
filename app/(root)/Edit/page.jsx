'use client'

import React, {useState, useEffect, useContext} from 'react'
import {auth} from '@utils/firebase'
import {NextContext} from '@/utils/context.js'
import '../../globals.css'
   
const Edit = () => {
  
  const { editPost, edit, setEdit,  isEditting, submitEditPost } = useContext(NextContext)
  
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
           value={edit.post}
           onChange={(e) => {setEdit({...edit, post: e.target.value})}}>
        </textarea>
        <input
           type='text'
           placeholder='Write a post tag' 
           value={edit.tag}
           onChange={(e) => {setEdit({...edit, tag: e.target.value})}}/>
         <div className='post-btn'>
            <button>Save</button>
          </div>
      </form>
    </div>
    )
}
export default Edit;