'use client'
import Image from "next/image";
import Link from "next/link";
import {useState, 
    useEffect,
    useContext}
from 'react'
import PostCard from '@/components/PostCard.jsx'
import {NextContext} from '@/utils/context.js'
import '../globals.css';

export default function Home() {
 
 const { posts, fetchPostDetails } = useContext(NextContext) 
 const tags = [
   "Relationship", "Marriage", "Work", "Family",  "Business", "Finance"
   ]
  
  return (
    <>
      <div className='hero'>
       <h2>Got something bothering you?</h2>
       <p>Worrying about a situation or desicion, let people advice you and learn from others experience.</p>
       <button>
         <Link href='/Create'>Share</Link>
      </button>      
      </div>
      
      {/*<div className='search-input'>
        <div>
          <input type='text'/>
          <button>Search</button>
        </div>
      </div>*/}
      
      {/*tags*/}
     {/*} <div className='tags'>
        <div>
          {tags.map((tag, index) => (
        <button>{tag}</button>
        ))}
        </div>
      </div>*/}
      
      <div className='posts'>
       {posts.map((post, index) => (
          <PostCard  
            key={index}
            post={post}
            fetchPostDetails={fetchPostDetails}/>
      ))}
      </div>
      
    </>
  );
}
