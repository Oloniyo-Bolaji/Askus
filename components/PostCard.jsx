'use client'

import React, { useState, useEffect, useContext } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import './styles.css'
import {useRouter, usePathname} from 'next/navigation';

const PostCard = ({post, fetchPostDetails}) => {
 const router = useRouter()
 const pathname = usePathname()
 
 
 const editPost = async (post) => {
   router.push(`/Edit?id=${post._id}`)
}

 const deletePost = async (id) => {
  if(!confirm("Are you sure?")) return;
 try{
  const response = await fetch(`/api/post/${id}`, {
  method: 'DELETE',
 })
   if(response.ok){
     alert('post deleted')
   }
 }catch(error){
   console.log(error)
 }
}

  return (
    <div className='post'>
      <div className='creator'>
        <div className='creator-image'>
          {post.creator?.image && 
            <Image 
             width={40} 
             height={40} 
             style = {{borderRadius: '50%', objectFit : 'cover'}}
             src={post.creator?.image}
             alt='profile'/>}
        </div>
        <div className='creator-details'>
          <h6>{post.creator?.username}</h6>
          <p>{post.creator?.email}</p>
        </div>
      </div>
      <div className='creator-post'>
        <p>{post.post.slice(0, 100)}...<button 
         onClick={() => {router.push(`/${post._id.toString()}`)
        }}>Read More</button></p>
      </div>
      <div className='post-details'>
        <p>{new Date(post.createdAt).toLocaleString()}</p>
        {pathname === '/' && post.isEdited && <p>Edited</p>}
      </div>
      {pathname === '/Profile' && <div className="btns">
        <button 
         className="edit-btn"
         onClick={() => {editPost(post)}}>Edit</button>
        <button 
          className="delete-btn"
          onClick={() => {deletePost(post._id)}}>Delete</button>
      </div>}
    </div>
  )
}

export default PostCard;
