'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import './styles.css'
import {useRouter, usePathname} from 'next/navigation';
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";
import { useSession, signOut } from 'next-auth/react';

const ProfileNav = () => {
   const {data: session} = useSession()
   const router = useRouter()
   
   
  return (
   <nav className='profilenav'>
     <div>
       <button 
         onClick={() => router.push('/')}>
        <MdOutlineArrowBackIosNew />
      </button>
     </div>
     <div>
       <p>My Profile</p>
     </div>
     <div>
         <button 
            className='logout-btn'
            onClick={() => signOut()}
          >
           <IoIosLogOut />
          </button>
     </div>
   </nav>
  )
}

export default ProfileNav;
