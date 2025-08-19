// import React, { useState } from 'react'
// import { Outlet, useNavigate } from 'react-router-dom'
// import { assets } from '../assets/assets'
// import { Menu, X } from 'lucide-react'
// import Sidebar from '../components/Sidebar'
// import { SignIn, useUser } from '@clerk/clerk-react'

// const Layout = () => {
// const [sidebar, setSidebar] = useState(false)
// const {user} = useUser()

//   const navigate = useNavigate()
//   return user ? (
//     <div className='flex flex-col items-start justify-start h-screen'>
//       <nav className='w-full px-8 min-h-14 flex items-center justify-between border-b border-gray-200'>
//         <img className='cursor-pointer w-32 sm:w-44' src={assets.logo} alt="" onClick={() => navigate('/')} />
//         {
//           sidebar ? <X onClick={() => setSidebar(false)} className='w-6 h-6 text-gray-600 sm:hidden'/>
//           : <Menu onClick={() => setSidebar(true)} className='w-6 h-6 text-gray-600 sm:hidden' />
//         }
//       </nav>
//       <div className='flex-1 w-full flex h-[calc(100vh-64px)]'>
//         <Sidebar sidebar={sidebar} setSidebar={setSidebar}/>
//         <div className='flex-1 bg-[#f4f7fb]'>
//           <Outlet />
//         </div>
//       </div>
//     </div>
//   ) : (
//     <div className='flex items-center justify-center h-screen'> 
//       <SignIn />
//     </div>
//   )
// }

// export default Layout

import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { Menu, X, Bell, Settings } from 'lucide-react'
import Sidebar from '../components/Sidebar'
import { SignIn, useUser, UserButton } from '@clerk/clerk-react'

const Layout = () => {
  const [sidebar, setSidebar] = useState(false)
  const { user } = useUser()
  const navigate = useNavigate()

  return user ? (
    <div 
      className='min-h-screen bg-cover bg-no-repeat bg-center relative'
      style={{ backgroundImage: `url(${assets.gradientBackground})` }}
    >
      {/* Background overlay for better readability */}
      <div className="absolute inset-0 bg-black/5"></div>
      
      {/* Decorative background elements */}
      <div className='absolute top-0 right-1/4 w-72 h-72 bg-white/5 rounded-full blur-3xl'></div>
      <div className='absolute bottom-0 left-1/4 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl'></div>
      
      <div className='relative z-10 flex flex-col h-screen'>
        {/* Modern Navigation Bar */}
        <nav className='w-full px-6 md:px-8 py-4 bg-white/10 backdrop-blur-xl border-b border-white/20 shadow-lg'>
          <div className='flex items-center justify-between'>
            {/* Logo Section */}
            <div className='flex items-center gap-4'>
              <img 
                className='cursor-pointer h-8 md:h-10 transition-transform hover:scale-105' 
                src={assets.logo} 
                alt="NueraFlow Logo" 
                onClick={() => navigate('/')} 
              />
              {/* Mobile menu button */}
              <button
                onClick={() => setSidebar(!sidebar)}
                className='md:hidden p-2 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30 transition-all duration-200'
              >
                {sidebar ? <X className='w-5 h-5' /> : <Menu className='w-5 h-5' />}
              </button>
            </div>

            {/* Right side controls */}
            <div className='flex items-center gap-4'>
              {/* Notifications */}
              <button className='p-2 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30 transition-all duration-200 hidden sm:flex'>
                <Bell className='w-5 h-5' />
              </button>
              
              {/* User Profile */}
              <div className='flex items-center gap-3'>
                <div className='hidden sm:block text-right'>
                  <p className='text-white font-semibold text-sm'>{user.fullName}</p>
                  <p className='text-white/70 text-xs'>{user.primaryEmailAddress?.emailAddress}</p>
                </div>
                <div className='relative'>
                  <UserButton 
                    appearance={{
                      elements: {
                        avatarBox: "w-10 h-10 ring-2 ring-white/30 hover:ring-white/50 transition-all duration-200",
                        userButtonPopoverCard: "backdrop-blur-xl bg-white/95 border border-white/20 shadow-2xl"
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </nav>

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