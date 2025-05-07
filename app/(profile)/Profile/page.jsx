'use client'
export const dynamic = 'force-dynamic';

import React, { useState, useEffect} from 'react'
import Link from 'next/link'
import Image from 'next/image'
import PostCard from '@/components/PostCard.jsx' 
import  "../../globals.css"
import {useRouter} from 'next/navigation'   
import { useSession } from "next-auth/react"

const Profile = () => {
  const {data: session} = useSession()
  const user = session?.user
  const router = useRouter()
  const [userPosts, setUserPosts] = useState([])
   
   

  useEffect(() => {
  if (!session?.user?.id) return;

  const fetchUserPosts = async () => {
    const response = await fetch(`/api/users/${session.user.id}/posts`);
    const data = await response.json();
    setUserPosts(data);
  };

  fetchUserPosts();
}, [session]);

const deletePost = async (id) => {
  if (!confirm("Are you sure you want to delete this post?")) return;
  try {
    const response = await fetch(`/api/post/${id}`, {
      method: 'DELETE',
    })
    if (response.ok) {
      setUserPosts(prevPosts => prevPosts.filter(post => post._id !== id));
      alert('post deleted')
    }
  } catch (error) {
    console.log(error)
  }
}


  return (
   <div>
     <div className="profileHero">
     {user?.image && 
        <Image 
          width={140} 
          height={140} 
          style = {{borderRadius: '50%', objectFit : 'cover'}}
          src={user?.image}
          alt='profile'/>}
       <h4>{user?.name}</h4>
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
            post={post}
            deletePost={deletePost}/>);
        })}
       </div>)}
   </div>
   </div>
  )
}

export default Profile;






