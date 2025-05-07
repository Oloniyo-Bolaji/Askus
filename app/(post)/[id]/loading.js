'use client'

import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import  "../../globals.css"



const Loading = () => {
  return (
     <div className='detailedPost'>
      {/*post creator*/}
     <div className='detailedPost-creator'>
      <div className='detailedPost-image'>
       <Skeleton 
        circle={true} 
        width={40} 
        height={40} />
      </div>
      <div className='detailedPost-details'>
       <Skeleton  width={100}/>
       <Skeleton  width={120}/>
      </div>
     </div>
     {/*post*/}
     <div>
       <Skeleton  width={120} height={40}/>
     </div>
     <div className='detailedPost-post'>
       <Skeleton  width={120}/>
       <Skeleton  width={120}/>
       <Skeleton  width={120}/>
       <Skeleton  width={120}/>
       <Skeleton  width={120}/>
       <Skeleton  width={40}/>
     </div>
      {/*comments*/}
     <div className='detailedPost-comment'>
       <div className='comments'>
          {Array(5)
          .fill(null)
         .map((_, index) => (
         <div key={index} className='comment'>
            <div className="creator-image">
              <div className='creator-image'>
           <Skeleton 
            circle={true} 
            width={40} 
            height={40} />
            </div>
            </div>
            <div className="comment-details">
              <div className='creator-details'>
              <Skeleton height={100} />
             <Skeleton height={100} />
            </div>
          <div className='creator-post'>
           <Skeleton height={100} />
         </div>
            </div>
      </div>
        ))}
       </div>
     </div>
     
    </div>
  )
}

export default Loading;