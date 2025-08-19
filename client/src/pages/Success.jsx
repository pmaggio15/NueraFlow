import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Check, Sparkles } from 'lucide-react'
import { assets } from '../assets/assets'

const Success = () => {
  const navigate = useNavigate()

  useEffect(() => {
    // Redirect to home page after 5 seconds
    const timer = setTimeout(() => {
      navigate('/')
    }, 5000)

    // Cleanup timer if component unmounts
    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <div 
      className="min-h-screen bg-cover bg-no-repeat bg-center flex items-center justify-center relative overflow-hidden"
      style={{ backgroundImage: `url(${assets.gradientBackground})` }}
    >
      {/* Animated background elements */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-yellow-400/10 rounded-full blur-2xl animate-pulse delay-500"></div>
      
      {/* Success Content */}
      <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
        {/* Success Icon */}
        <div className="mb-8 relative">
          <div className="w-32 h-32 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center mx-auto shadow-2xl border border-white/30">
            <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center relative overflow-hidden">
              <Check className="w-12 h-12 text-white animate-bounce" />
              {/* Sparkle effects */}
              <Sparkles className="absolute top-2 right-2 w-4 h-4 text-white animate-pulse" />
              <Sparkles className="absolute bottom-2 left-2 w-3 h-3 text-white animate-pulse delay-300" />
            </div>
          </div>
        </div>
        
        {/* Main Message */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight tracking-tight">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-lg md:text-xl font-medium text-green-400 uppercase tracking-wider">
              Payment Confirmed
            </span>
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse delay-300"></div>
          </div>
          
          <div className="space-y-2">
            <div className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
              Welcome to
            </div>
            <div className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent font-black">
              Premium
            </div>
          </div>
        </h1>
        
        {/* Professional Subtitle */}
        <p className="text-xl md:text-2xl text-white/80 font-light mb-8 leading-relaxed max-w-xl mx-auto">
          Your subscription is now active. Start creating with unlimited access to all 
          <span className="font-semibold text-white"> professional AI tools</span>.
        </p>
        
        {/* Features Preview */}
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 mb-8 border border-white/20 shadow-xl">
          <p className="text-white/80 text-lg mb-4 font-medium">You now have access to:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-white/70">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>Unlimited AI Generation</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span>Advanced Image Tools</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              <span>Priority Support</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
              <span>Premium AI Models</span>
            </div>
          </div>
        </div>
        
        {/* Countdown */}
        <div className="text-white/60 text-lg">
          <p>Redirecting to homepage in <span className="font-bold text-white">5</span> seconds...</p>
        </div>
        
        {/* Loading Animation */}
        <div className="mt-6 w-full max-w-xs mx-auto bg-white/20 rounded-full h-2">
          <div className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full animate-pulse" 
               style={{ 
                 width: '100%',
                 animation: 'expand 5s linear forwards'
               }}>
          </div>
        </div>
      </div>
      
      {/* CSS Animation */}
      <style jsx>{`
        @keyframes expand {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  )
}

export default Success
