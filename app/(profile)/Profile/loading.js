'use client'

import React, { useState, useEffect, useContext } from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import  "../../globals.css"



const Loading = () => {
  return (
     <>
    <div className="profileHero">
      <Skeleton 
        circle={true} 
        width={140} 
        height={140} />
      <h4>
        <Skeleton  width={120}/>
      </h4>
    </div> 
    <div className="userPost">
     <h5>
       <Skeleton  width={100}/>
     </h5>
     <div className="profilePosts">
      {Array(5)
      .fill(null)
      .map((_, index) => (
        <div key={index}>
          <Skeleton height={100} />
        </div>
      ))}
       </div>
    </div>
     </>
  )
}

export default Loading;