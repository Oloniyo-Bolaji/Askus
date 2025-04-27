'use client'

import React, { useState, useEffect, useContext } from 'react'
import Link from 'next/link'
import './styles.css'
import {NextContext} from '@/utils/context.js'
import { FaUser } from "react-icons/fa";


const Navbar = () => {
   const { signedUpUser, loginWithGoogle, logOut } = useContext(NextContext)

  return (
    <nav className="navbar">
      <div className='logo'>
        <Link href="/">Ask<span>US</span></Link>
      </div>
      <div>
        {signedUpUser ? (
        <div>
          <Link href='/Profile'>
            <FaUser />
          </Link>
        </div>
        ) : (
          <button 
            className='register-btn'
            onClick={loginWithGoogle}>Sign In</button>
        )}
      </div>
    </nav>
  )
}

export default Navbar
