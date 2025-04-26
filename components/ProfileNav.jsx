'use client'

import React, { useState, useEffect, useContext } from 'react'
import Link from 'next/link'
import './styles.css'
import {useRouter, usePathname} from 'next/navigation';
import {NextContext} from '@/utils/context.js'
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";

const ProfileNav = () => {
  const {logOut} = useContext(NextContext)
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
         onClick={logOut}
         className="logout-btn">
         <IoIosLogOut />
       </button>
     </div>
   </nav>
  )
}

export default ProfileNav;
