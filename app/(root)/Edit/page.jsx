'use client'

import React, {useState, useEffect, useContext} from 'react'
import { useSearchParams } from 'next/navigation';
import '../../globals.css'
import Notify from 'simple-notify'
import 'simple-notify/dist/simple-notify.css'

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
        title: data.title,
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
        title: edit.title,
        post: edit.post,
        tag: edit.tag,
        isEdited: true
      }),
    });

    if (response.ok) {
      new Notify({
       status: 'success',
       text: 'Edited',
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
      setEdit({ title: '', post: '', tag: '' });
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
        <input
           type='text'
           placeholder='Write a post tag' 
           value={edit.title}
           onChange={(e) => {setEdit({...edit, title: e.target.value})}}/>
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