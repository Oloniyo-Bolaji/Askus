'use client'

import React, { useState, useEffect, use } from 'react';
import Image from 'next/image'
import '../../globals.css'
import { CiLocationArrow1 } from "react-icons/ci";
import { useSession } from "next-auth/react"


const Post = ({params}) => {
  const {data: session} = useSession()
  const user = session?.user
  const unwrapped = use(params)
  const id = unwrapped.id
  
   const [comment, setComment] = useState('')
   const [showInput, setShowInput] = useState(false)
   const [posted, setPosted] = useState({})

  
  const fetchPostDetails = async (id) => {
     const res = await fetch(`/api/post/${id}`)
     const data = await res.json()
     console.log(data)
     setPosted(data)
   }
   
   useEffect(() => {
    fetchPostDetails(id)
  }, [id])
   
   
const addComment = async () => {
  if (!user) return <p>Please Sign In</p>
 try{
  const response = await fetch(`api/post/${id}`, {
  method: 'PATCH',
  body: JSON.stringify({ 
    creator: {
      id: user.id,
     username: user.name,
     email: user.email,
     image: user.image
        },
    comment: comment
   }),
 })
   if(response.ok){
     const data = await response.json()
      alert('comment posted')
       setComment('')
       setShowInput(false)
       fetchPostDetails(id)
    }
 }catch(error){
   console.log(error)
 }
}

  
  
  
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
     <div>
       <h2>{posted.title}</h2>
     </div>
     <div className='detailedPost-post'>
       <p>{posted.post}</p>
       <span>{posted.tag}</span>
     </div>
     <div className='detailedPost-count'>
       <span>{posted.comments?.length} {posted.comments?.length > 1 ? 'Comments' : 'Comment'}</span>
       <button
         onClick={() => {setShowInput(true)}}>Add Comment</button>
     </div>
      {/*comments*/}
     <div className='detailedPost-comment'>
       {showInput && 
        <div className='comment-input'>
         <input 
           type='text'
           placeholder='Add a comment'
           value={comment}
           onChange= {(e) => {setComment(e.target.value)}}/>
         <button onClick={addComment}>
           <CiLocationArrow1 />
         </button>
       </div>}
       <div className='comments'>
         {posted.comments?.map((comment, index) => (
          <div key={index} className='comment'>
            <div className="creator-image">
              <div className='creator-image'>
             {comment.creator?.image && 
             <Image 
               width={40} 
               height={40} 
               style = {{borderRadius: '50%', objectFit : 'cover'}}
               src={comment.creator?.image}
               alt='profile'/>}
            </div>
            </div>
            <div className="comment-details">
              <div className='creator-details'>
            <h6>{comment.creator?.username}</h6>
            <p>{comment.creator?.email}</p>
            </div>
          <div className='creator-post'>
           <p>{comment.comment}</p>
         </div>
            </div>
      </div>
         ))}
       </div>
     </div>
     
    </div>
    )
}

export default Post;