'use client'

import React, {useState, useEffect, useContext} from 'react'
import '../../globals.css'
import { useSession } from "next-auth/react"
import {useRouter} from 'next/navigation';
import Notify from 'simple-notify'
import 'simple-notify/dist/simple-notify.css'

const Create = () => {
  const router = useRouter()
  const {data: session} = useSession()
  const user = session?.user
  
  const [submitting, setSubmitting] = useState(false)
  const [userPost, setUserPost] = useState({
    title:'',
    post: '',
    tag: '' 
  })
  
  
  const CreatePost = async () => {
  if (!user){
    console.log('not a user')
    
  }
  try {
    setSubmitting(true); 

    const response = await fetch('/api/post/new', {
      method: 'POST',
      body: JSON.stringify({
        creator: {
          id: user.id,
          username: user.name,
          email: user.email,
          image: user.image
        },
        title: userPost.title,
        post: userPost.post,
        tag: userPost.tag
      })
    });

    if (response.ok) {
      new Notify({
       status: 'success',
       text: 'Succesfully uploaded a post',
       effect: 'slide',
       speed: 300,
       showIcon: true,
       showCloseButton: true,
       autoclose: true,
       autotimeout: 3000,
       gap: 20,
       distance: 20,
       type: 'outline',
       position: 'right top'
    })
      setUserPost({
        post: '',
        tag: ''
      });
    }
  } catch (error) {
    new Notify({
       status: 'danger',
       text: error.message,
       effect: 'slide',
       speed: 300,
       showIcon: true,
       showCloseButton: true,
       autoclose: true,
       autotimeout: 3000,
       gap: 20,
       distance: 20,
       type: 'outline',
       position: 'right top'
    })
    console.log(error);
  } finally {
    setSubmitting(false);
  }
};

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
      
      <form onSubmit={handleSubmit}>
        <input
           type='text'
           placeholder='Write a post tag' 
           value={userPost.title}
           onChange={(e) => {setUserPost({...userPost, title: e.target.value})}}/>
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
            <button>{submitting ? 'Posting...' : 'Post'}</button>
          </div>
      </form>
    </div>
    )
}
export default Create;