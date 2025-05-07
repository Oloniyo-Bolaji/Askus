'use client'

import React, { useState, useEffect, useContext } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import './styles.css'
import { FaUser } from "react-icons/fa";
import { useSession, signIn } from 'next-auth/react';


const Navbar = () => {
   const {data: session} = useSession()

  return (
    <nav className="navbar">
      <div className='logo'>
        <Link href="/">Ask<span>US</span></Link>
      </div>
      <div>
        {session ? (
        <div>
          <Link href='/Profile'>
            {session.user?.image && (<Image 
             width={20} 
             height={20} 
             style = {{borderRadius: '50%', objectFit : 'cover'}}
             src={session.user.image}
             alt='profile'/>)}
          </Link>
        </div>
        ) : (
         <button 
            className='register-btn'
            onClick={() => signIn("google")}
          >Sign In</button>
        )}
      </div>
    </nav>
  )
}

export default Navbar
