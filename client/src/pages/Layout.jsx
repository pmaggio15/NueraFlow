import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { Menu, X } from 'lucide-react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import { SignIn, useUser } from '@clerk/clerk-react'

const Layout = () => {
  const [sidebar, setSidebar] = useState(false)
  const { user } = useUser()
  const navigate = useNavigate()

  return user ? (
    <div className='min-h-screen bg-cover bg-no-repeat bg-center relative'>
      {/* Navbar at the very top */}
      <Navbar />
      
      {/* Main Layout Container */}
      <div 
        className='min-h-screen bg-cover bg-no-repeat bg-center relative pt-16'
        style={{ backgroundImage: `url(${assets.gradientBackground})` }}
      >
        {/* Background overlay for better readability */}
        <div className="absolute inset-0 bg-black/5"></div>
        
        {/* Decorative background elements */}
        <div className='absolute top-0 right-1/4 w-72 h-72 bg-white/5 rounded-full blur-3xl'></div>
        <div className='absolute bottom-0 left-1/4 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl'></div>
        
        <div className='relative z-10 flex flex-col h-[calc(100vh-4rem)]'>
          {/* Mobile menu button - positioned below navbar */}
          <div className={`md:hidden fixed top-20 left-4 z-40 transition-all duration-300 ${sidebar ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
            <button
              onClick={() => setSidebar(true)}
              className='p-2 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30 transition-all duration-200'
            >
              <Menu className='w-5 h-5' />
            </button>
          </div>

          {/* Main Content Area */}
          <div className='flex-1 flex overflow-hidden'>
            {/* Sidebar */}
            <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
            
            {/* Main Content */}
            <div className='flex-1 bg-white/5 backdrop-blur-sm overflow-y-auto'>
              <div className='p-6 md:p-8'>
                {/* Content wrapper with glassmorphism */}
                <div className='bg-white/90 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl min-h-[calc(100vh-200px)] p-6 md:p-8'>
                  <Outlet />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div 
      className='min-h-screen bg-cover bg-no-repeat bg-center flex items-center justify-center relative'
      style={{ backgroundImage: `url(${assets.gradientBackground})` }}
    >
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/10"></div>
      
      {/* Decorative elements */}
      <div className='absolute top-1/4 left-1/4 w-72 h-72 bg-white/10 rounded-full blur-3xl'></div>
      <div className='absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl'></div>
      
      <div className='relative z-10'>
        <SignIn />
      </div>
    </div>
  )
}

export default Layout