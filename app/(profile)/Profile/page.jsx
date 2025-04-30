'use client'
import React, { useState, useEffect, useContext } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {auth} from '@/utils/firebase.js'
import {NextContext} from '@/utils/context.js'
import PostCard from '@/components/PostCard.jsx' 
import  "../../globals.css"
import {useRouter} from 'next/navigation'   

const Profile = () => {
  const router = useRouter()
   const {userPost, setUserPost, signedUpUser, userPosts, userComments, logOut} = useContext(NextContext)


  
  
  return (
   <div>
     <div className="profileHero">
     {signedUpUser?.photoURL && 
        <Image 
          width={140} 
          height={140} 
          style = {{borderRadius: '50%', objectFit : 'cover'}}
          src={signedUpUser?.photoURL}
          alt='profile'/>}
       <h4>{signedUpUser?.displayName}</h4>
       </div>
     <div className="userPost">
       <h5>My Posts</h5>
       {userPosts.length === 0 ? (
        <div className="noPost">
         <p>You haven't made a post</p>
       </div>
       ) : (
       <div className="profilePosts">
        {userPosts.map((post, index) => {
        return (
          <PostCard 
            key={index} 
            post={post} />);
        })}
       </div>)}
   </div>
   </div>
  )
}

export default Profile;






