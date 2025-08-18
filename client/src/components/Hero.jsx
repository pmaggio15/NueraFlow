import React from 'react'
import { assets } from '../assets/assets'

const Hero = () => {
  return (
    <div 
      className="px-4 sm:px-20 xl:px-32 relative flex flex-col w-full justify-center items-center bg-cover bg-no-repeat bg-center min-h-screen"
      style={{ backgroundImage: `url(${assets.gradientBackground})` }}
    >
      <div className="text-center text-white z-10">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Welcome to QuickAI
        </h1>
        <p className="text-lg md:text-xl opacity-90 mb-8">
          Your AI-powered content creation platform
        </p>
        <button className="bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
          Get Started
        </button>
      </div>
    </div>
  )
}

export default Hero
