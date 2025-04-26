'use client'

import React, { useState, useEffect, use,useContext } from 'react'
import {NextContext} from '@/utils/context.js'
import Image from 'next/image'
import '../../globals.css'
import { CiLocationArrow1 } from "react-icons/ci";


const Post =  ({params}) => {
  const [comment, setComment] = useState('')
  const unwrapped = use(params)
  const id = unwrapped.id
  
  const {signedUpUser, posted, fetchPostDetails } = useContext(NextContext) 
 

  const addComment = async () => {
 try{
  const response = await fetch(`api/post/${id}`, {
  method: 'PATCH',
  body: JSON.stringify({ 
    creator: {
     uid: signedUpUser?.uid,
     username: signedUpUser?.displayName,
     email: signedUpUser?.email,
     number: signedUpUser?.phoneNumber,
     image:signedUpUser?.photoURL
        },
    comment: comment
   }),
 })
 const data = await response.json()
   if(response.ok){
      alert('comment posted')
       setComment('')
       fetchPostDetails(id)
    }
 }catch(error){
   console.log(error)
 }
}
  
  useEffect(() => {
    fetchPostDetails(id)
  }, [id])
  
  
  return(
    <div className='detailedPost'>
      {/*post creator*/}
     <div className='detailedPost-creator'>
      <div className='detailedPost-image'>
       {posted.creator?.image && 
        <Image 
         width={40} 
         height={40} 
         style = {{borderRadius: '50%', objectFit : 'cover'}}
         src={posted.creator?.image}
             alt='profile'/>}
      </div>
      <div className='detailedPost-details'>
       <h6>{posted.creator?.username}</h6>
       <p>{posted.creator?.email}</p>
      </div>
     </div>
     {/*post*/}
     <div className='detailedPost-post'>
       <p>{posted.post}</p>
       <span>{posted.tag}</span>
     </div>
      {/*comments*/}
     <div className='detailedPost-comment'>
       <div className='comment-input'>
         <input 
           type='text'
           placeholder='Add a comment'
           value={comment}
           onChange= {(e) => {setComment(e.target.value)}}/>
         <button onClick={addComment}>
           <CiLocationArrow1 />
         </button>
       </div>
       <div className='comments'>
         {posted.comments?.map((comment, index) => (
          <div key={index} className='comment'>
           <div className='creator'>
            <div className='creator-image'>
             {comment.creator?.image && 
             <Image 
               width={40} 
               height={40} 
               style = {{borderRadius: '50%', objectFit : 'cover'}}
               src={comment.creator?.image}
               alt='profile'/>}
            </div>
           <div className='creator-details'>
            <h6>{comment.creator?.username}</h6>
            <p>{comment.creator?.email}</p>
            </div>
           </div>
          <div className='creator-post'>
           <p>{comment.comment}</p>
         </div>
      </div>
         ))}
       </div>
     </div>
     
    </div>
    )
}

export default Post;