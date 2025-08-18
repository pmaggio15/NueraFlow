import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import {useClerk, UserButton, useUser} from '@clerk/clerk-react'

const Navbar = () => {
    const navigate = useNavigate()
    const {user} = useUser()
    const {openSignIn} = useClerk()

  return (
<div className='fixed z-50 w-full bg-white/10 backdrop-blur-md border-b border-white/20 flex justify-between items-center py-3 sm:py-4 px-4 sm:px-8 xl:px-16 cursor-pointer'>    <img 
        src={assets.logo} 
        alt="logo" 
        className='w-32 sm:w-44 cursor-pointer' 
        onClick={() => navigate('/')}
    />

      {
        user ? (
          <div className="flex items-center gap-3">
            <UserButton 
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10 ring-2 ring-white/30"
                }
              }}
            />
          </div>
        ) : (
          <button 
            onClick={openSignIn}
            className='group flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold cursor-pointer text-white bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 hover:border-white/40 transition-all duration-200'
          >
            Get Started 
            <ArrowRight className='w-4 h-4 transition-transform group-hover:translate-x-0.5' /> 
          </button>
        )
      }
    </div>
  )
}

export default Navbar
