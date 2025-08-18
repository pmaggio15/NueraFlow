import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Hero = () => {

  const navigate = useNavigate()

  return (
    <div 
      className="px-4 sm:px-20 xl:px-32 relative flex flex-col w-full justify-center items-center bg-cover bg-no-repeat bg-center h-[95vh] -mb-10"
    >
      <div className="text-center text-black z-10">
        <h1 className="text-4xl sm:text-5xl md:text-6xl 2xl:text-7xl font-bold mx-auto leading-[1.2] mb-4 text-white drop-shadow-lg">
          Unlock creativity with<br /> powerful <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent" >AI tools</span>
        </h1>
        <p className="mt-4 max-w-xs sm:max-w-lg 2xl:max-w-xl m-auto text-base md:text-lg text-white/90 drop-shadow-md leading-relaxed">
          Enhance your content creation with our suite of professional AI tools. Draft articles, generate visuals, and optimize workflows.
        </p>
        
       <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 mt-8 max-w-2xl mx-auto shadow-2xl">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-6">
            <button 
              onClick={() => navigate('/ai')} 
              className="group relative overflow-hidden bg-white text-[#bc82ff] px-8 py-4 rounded-lg font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-300 ease-out min-w-[200px] border-0 cursor-pointer"
            >
              <div className="absolute inset-0 -top-[1px] bg-gradient-to-r from-transparent via-purple-100/30 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
              
              <span className="relative z-10 flex items-center justify-center gap-2">
                Start Creating Now
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </button>
            
            <button 
              className="group bg-white/20 backdrop-blur-sm text-white border-2 border-white/30 px-8 py-4 rounded-lg font-semibold text-base hover:bg-white/30 hover:border-white/40 transition-all duration-200 min-w-[200px] cursor-pointer"
            >
              <span className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
                Watch Demo
              </span>
            </button>
          </div>
          <div className="flex justify-center items-center gap-4 pt-4 border-t border-white/20">
                <img src={assets.user__group} alt="" />
            </div>
            <p className="text-sm text-white/95 font-medium">
              Join <span className="font-bold text-yellow-300">10,000+</span> creators already using NueraFlow
            </p>
          </div>
        </div>
      </div>
  )
}

export default Hero


