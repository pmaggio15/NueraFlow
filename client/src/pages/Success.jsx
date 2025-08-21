import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'
import { Check, Sparkles, ArrowRight } from 'lucide-react'
import { assets } from '../assets/assets'

const Success = () => {
  const navigate = useNavigate()
  const { user } = useUser()
  const [isUpdatingPlan, setIsUpdatingPlan] = useState(true)

  useEffect(() => {
    const updateUserPlan = async () => {
      try {
        if (user) {
          console.log('Updating user plan to premium...')
          console.log('Current user:', user)
          
          // Try the correct Clerk method for updating metadata
          await user.update({
            unsafeMetadata: {
              ...user.unsafeMetadata,
              plan: 'premium',
              subscriptionDate: new Date().toISOString(),
              subscriptionStatus: 'active'
            }
          })
          
          console.log('User plan updated to premium successfully!')
          console.log('New metadata:', user.unsafeMetadata)
          setIsUpdatingPlan(false)
        }
      } catch (error) {
        console.error('Error updating user plan:', error)
        
        // Try alternative method if first one fails
        try {
          console.log('Trying alternative update method...')
          
          // Use Clerk's setMetadata method if available
          if (user.setUnsafeMetadata) {
            await user.setUnsafeMetadata({
              plan: 'premium',
              subscriptionDate: new Date().toISOString(),
              subscriptionStatus: 'active'
            })
            console.log('Alternative method worked!')
          }
        } catch (alternativeError) {
          console.error('Alternative method also failed:', alternativeError)
        }
        
        setIsUpdatingPlan(false)
      }
    }

    if (user) {
      updateUserPlan()
    }
  }, [user])

  // Navigate to home page
  const handleGoHome = () => {
    console.log('Navigating to home page...')
    navigate('/', { replace: true })
  }

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
              {isUpdatingPlan ? (
                <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <Check className="w-12 h-12 text-white animate-bounce" />
              )}
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
              {isUpdatingPlan ? 'Activating Premium' : 'Payment Confirmed'}
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
          {isUpdatingPlan ? (
            <>Updating your account to premium access...</>
          ) : (
            <>Your subscription is now active. Start creating with unlimited access to all 
            <span className="font-semibold text-white"> professional AI tools</span>.</>
          )}
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
        
        {/* Go to Home Button */}
        <button 
          onClick={handleGoHome}
          className="group flex items-center justify-center gap-3 mx-auto px-8 py-4 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-xl font-semibold text-lg hover:from-green-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          Go to Home
          <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  )
}

export default Success