'use client'

import React, {useState, useEffect, useContext, use} from 'react'
import {auth} from '@utils/firebase'
import {NextContext} from '@/utils/context.js'
import '../../globals.css'
   
const Edit = ({params}) => {
  const unwrapped = use(params)
  const postId = unwrapped.id
  
  const { edit, setEdit,  isEditting} = useContext(NextContext)
  
  
  useEffect(() => {
    const getEditDetails = async () => {
      const response = await fetch(`/api/post/${postId}`)
      const data = await response.json()
      setEdit({
        post: data.post,
        tag: data.tag
      })
    }
    if(postId) getEditDetails
  }, [postId])
  
  
  const submitEditPost = async () => {
 try{
  const response = await fetch(`/api/post/${postId}/edit`, {
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json'
  },
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
const handleSubmit = async (e) => {
    e.preventDefault()
    await submitEditPost(postId)
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
            <button>Save</button>
          </div>
      </form>
    </div>
    )
}
export default Edit;