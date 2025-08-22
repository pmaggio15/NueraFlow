import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Crown, Zap, Shield, Check, Loader } from 'lucide-react'
import { useUser } from '@clerk/clerk-react'

const Plan = () => {
  const navigate = useNavigate()
  const { user, isLoaded } = useUser()
  const [isUpdating, setIsUpdating] = useState(false)

  // Get current plan from user metadata
  const getCurrentPlan = () => {
    return user?.unsafeMetadata?.plan || 'free'
  }

  const freeFeatures = [
    'Title Generation',
    'Article Generation',
    '5 generations per day',
    'Basic support'
  ]

  const premiumFeatures = [
    'Title Generation',
    'Article Generation', 
    'Generate Images',
    'Remove Background',
    'Remove Object',
    'Resume Review',
    'Unlimited generations',
    'Priority support',
    'Advanced AI models'
  ]

  const handleSubscribe = async (planType, price) => {
    // Set to false for production checkout flow, true for testing
    const isTestingMode = false
    
    console.log('isTestingMode:', isTestingMode)
    console.log('planType:', planType, 'price:', price)

    if (isTestingMode) {
      // Immediate plan update for testing
      setIsUpdating(true)
      try {
        await user.update({
          unsafeMetadata: {
            ...user.unsafeMetadata,
            plan: planType,
            subscriptionDate: new Date().toISOString(),
            subscriptionStatus: planType === 'premium' ? 'active' : 'inactive',
            testingMode: true
          }
        })
        
        console.log(`Plan immediately updated to: ${planType}`)
        
        // Navigate to dashboard after plan update
        setTimeout(() => {
          setIsUpdating(false)
          navigate('/ai')
        }, 1000)
        
      } catch (error) {
        console.error('Error updating plan:', error)
        setIsUpdating(false)
      }
    } else {
      // Production flow
      if (planType === 'free') {
        // For free plan, update immediately and go to dashboard
        setIsUpdating(true)
        try {
          await user.update({
            unsafeMetadata: {
              ...user.unsafeMetadata,
              plan: 'free',
              subscriptionDate: new Date().toISOString(),
              subscriptionStatus: 'inactive'
            }
          })
          
          setTimeout(() => {
            setIsUpdating(false)
            navigate('/ai')
          }, 1000)
          
        } catch (error) {
          console.error('Error updating to free plan:', error)
          setIsUpdating(false)
        }
      } else {
        // For premium plan, navigate to checkout for payment
        console.log('Navigating to checkout with:', { plan: planType, price: price, features: premiumFeatures })
        navigate('/checkout', { 
          state: { 
            plan: planType, 
            price: price,
            features: premiumFeatures
          } 
        })
      }
    }
  }

  // Don't render until user data is loaded
  if (!isLoaded) {
    return <div className="flex justify-center items-center h-32">Loading...</div>
  }

  const currentPlan = getCurrentPlan()
  const isPremium = currentPlan === 'premium'

  return (
    <section className='px-4 sm:px-20 xl:px-32 pt-8 pb-20 lg:pt-12 lg:pb-32 relative overflow-hidden'>
      {/* Background decorative elements */}
      <div className='absolute top-1/4 left-1/4 w-72 h-72 bg-purple-400/10 rounded-full blur-3xl'></div>
      <div className='absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl'></div>
      
      <div className='relative z-10 max-w-6xl mx-auto'>
        {/* Header Section - matching Hero style */}
        <div className='text-center mb-16'>
          <h2 className='text-4xl sm:text-5xl md:text-6xl 2xl:text-7xl font-bold text-white mb-6 leading-[1.2] drop-shadow-lg'>
            Choose Your <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Plan</span>
          </h2>
          
          <p className='text-base md:text-lg text-white/90 drop-shadow-md leading-relaxed max-w-2xl mx-auto mb-8'>
            Start for free and scale up as you grow. Find the perfect plan for your 
            <span className='font-semibold text-white'> content creation needs</span>
          </p>

          {/* Current Plan Indicator */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 max-w-md mx-auto shadow-2xl mb-4">
            <div className='flex justify-center items-center gap-2'>
              <span className='text-white/90 text-sm font-medium'>Current Plan:</span>
              <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                isPremium 
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white' 
                  : 'bg-green-100 text-green-700'
              }`}>
                {isPremium ? 'Premium' : 'Free'}
              </span>
            </div>
          </div>
          
          {/* Trust Indicators - glassmorphism style */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 max-w-2xl mx-auto shadow-2xl">
            <div className='flex flex-wrap justify-center gap-6 text-white/90 text-sm font-medium'>
              <div className='flex items-center gap-2'>
                <Shield className='w-4 h-4 text-green-400' />
                <span>30-Day Money Back</span>
              </div>
              <div className='flex items-center gap-2'>
                <div className='w-2 h-2 bg-blue-400 rounded-full'></div>
                <span>Cancel Anytime</span>
              </div>
              <div className='flex items-center gap-2'>
                <div className='w-2 h-2 bg-purple-400 rounded-full'></div>
                <span>No Setup Fees</span>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Cards - glassmorphism style matching Hero */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 max-w-5xl mx-auto shadow-2xl">
          <div className='grid md:grid-cols-2 gap-6'>
            
            {/* Free Plan */}
            <div className={`relative bg-white/90 backdrop-blur-xl rounded-xl p-6 shadow-lg border transition-all duration-300 ${
              !isPremium ? 'border-green-400 shadow-green-100' : 'border-white/30 hover:shadow-xl'
            }`}>
              <div className='absolute top-4 right-4'>
                {!isPremium ? (
                  <span className='bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium'>
                    Current
                  </span>
                ) : (
                  <span className='bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium'>
                    Available
                  </span>
                )}
              </div>
              
              <div className='mb-6'>
                <h3 className='text-2xl font-bold text-gray-900 mb-2'>Free</h3>
                <div className='flex items-baseline mb-4'>
                  <span className='text-4xl font-bold text-gray-900'>$0</span>
                  <span className='text-gray-500 ml-2'>Always free</span>
                </div>
                <p className='text-gray-600'>Perfect for getting started with AI content creation</p>
              </div>

              <ul className='space-y-3 mb-6'>
                {freeFeatures.map((feature, index) => (
                  <li key={index} className='flex items-center gap-3'>
                    <Check className='w-4 h-4 text-green-500 flex-shrink-0' />
                    <span className='text-gray-700 text-sm'>{feature}</span>
                  </li>
                ))}
              </ul>

              {!isPremium ? (
                <button 
                  disabled
                  className='w-full py-3 px-6 bg-green-100 text-green-800 rounded-lg font-semibold border border-green-200 cursor-default'
                >
                  Your Current Plan
                </button>
              ) : (
                <button 
                  onClick={() => handleSubscribe('free', 0)}
                  disabled={isUpdating}
                  className='w-full py-3 px-6 bg-white/20 backdrop-blur-sm text-gray-800 border-2 border-gray-300 rounded-lg font-semibold hover:bg-white/30 hover:border-gray-400 transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2'
                >
                  {isUpdating ? (
                    <>
                      <Loader className="w-4 h-4 animate-spin" />
                      Switching to Free...
                    </>
                  ) : (
                    'Switch to Free'
                  )}
                </button>
              )}
            </div>

            {/* Premium Plan */}
            <div className={`relative bg-white/90 backdrop-blur-xl rounded-xl p-6 shadow-xl border-2 transition-all duration-300 ${
              isPremium ? 'border-purple-400 shadow-purple-100' : 'border-purple-200 hover:shadow-2xl'
            }`}>
              <div className='absolute top-4 right-4'>
                {isPremium ? (
                  <span className='bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium'>
                    Current
                  </span>
                ) : (
                  <span className='bg-gradient-to-r from-purple-600 to-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium'>
                    Popular
                  </span>
                )}
              </div>
              
              <div className='mb-6'>
                <h3 className='text-2xl font-bold text-gray-900 mb-2'>Premium</h3>
                <div className='flex items-baseline mb-4'>
                  <span className='text-4xl font-bold text-gray-900'>$25</span>
                  <span className='text-gray-500 ml-2'>/month</span>
                </div>
                <p className='text-gray-600'>Unlock the full power of AI content creation</p>
              </div>

              <ul className='space-y-3 mb-6'>
                {premiumFeatures.map((feature, index) => (
                  <li key={index} className='flex items-center gap-3'>
                    <Check className='w-4 h-4 text-purple-600 flex-shrink-0' />
                    <span className='text-gray-700 text-sm'>{feature}</span>
                  </li>
                ))}
              </ul>

              {isPremium ? (
                <button 
                  disabled
                  className='w-full py-3 px-6 bg-green-600 text-white rounded-lg font-semibold cursor-default'
                >
                  Your Current Plan
                </button>
              ) : (
                <button 
                  onClick={() => handleSubscribe('premium', 25)}
                  disabled={isUpdating}
                  className='group relative overflow-hidden bg-white text-[#bc82ff] px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 ease-out w-full border-0 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
                >
                  <div className="absolute inset-0 -top-[1px] bg-gradient-to-r from-transparent via-purple-100/30 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {isUpdating ? (
                      <>
                        <Loader className="w-4 h-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        Subscribe Now
                        <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </>
                    )}
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Trust Section - matching style */}
        <div className='text-center mt-12'>
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 max-w-md mx-auto shadow-2xl">
            <div className='flex justify-center items-center gap-4'>
              <div className='flex items-center gap-2'>
                <div className='w-3 h-3 bg-green-400 rounded-full animate-pulse'></div>
                <span className='text-white/95 text-sm font-medium'>Join 10,000+ creators</span>
              </div>
              <div className='w-px h-4 bg-white/20'></div>
              <div className='text-white/90 text-sm'>
                <span className='font-semibold text-yellow-300'>4.9/5</span> rating
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Plan