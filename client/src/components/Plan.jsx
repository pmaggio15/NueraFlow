import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Crown, Zap, Shield, Check } from 'lucide-react'

const Plan = () => {
  const navigate = useNavigate()

  const handleSubscribe = (planType, price) => {
    // Navigate to checkout with plan information
    navigate('/checkout', { 
      state: { 
        plan: planType, 
        price: price,
        features: planType === 'premium' ? premiumFeatures : freeFeatures
      } 
    })
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

  return (
    <section className='px-6 md:px-12 lg:px-24 xl:px-32 pt-8 pb-20 lg:pt-12 lg:pb-32 relative overflow-hidden'>
      {/* Background decorative elements */}
      <div className='absolute top-1/4 left-1/4 w-72 h-72 bg-purple-400/5 rounded-full blur-3xl'></div>
      <div className='absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl'></div>
      
      <div className='relative z-10 max-w-6xl mx-auto'>
        {/* Header Section */}
        <div className='text-center mb-20'>
          {/* Premium Badge */}
          <div className='inline-flex items-center gap-2 px-4 py-2 mb-8 text-sm font-semibold text-white/80 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full shadow-lg'>
            <Crown className='w-4 h-4 text-yellow-400' />
            <span>Flexible Pricing Plans</span>
            <Zap className='w-4 h-4 text-blue-400' />
          </div>
          
          {/* Main Heading */}
          <h2 className='text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight tracking-tight'>
            Pick Your <span className='mt-2 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent'>Plan</span>
          </h2>
          
          {/* Subheading */}
          <p className='text-base md:text-lg text-white/80 max-w-4xl mx-auto leading-relaxed font-light mb-8'>
            Start for free and scale up as you grow. <br/> Find the perfect plan for your 
            <span className='font-semibold text-white'> content creation needs</span>
          </p>
          
          {/* Trust Indicators */}
          <div className='flex flex-wrap justify-center gap-8 text-white/70 text-sm font-medium'>
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

        {/* Custom Pricing Cards */}
        <div className='relative'>
          <div className='bg-white/95 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-2xl border border-white/30 hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] transition-all duration-500'>
            <div className='grid md:grid-cols-2 gap-8 relative z-10'>
              
              {/* Free Plan */}
              <div className='relative bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300'>
                <div className='absolute top-4 right-4'>
                  <span className='bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium'>
                    Current
                  </span>
                </div>
                
                <div className='mb-8'>
                  <h3 className='text-2xl font-bold text-gray-900 mb-2'>Free</h3>
                  <div className='flex items-baseline mb-4'>
                    <span className='text-5xl font-bold text-gray-900'>$0</span>
                    <span className='text-gray-500 ml-2'>Always free</span>
                  </div>
                  <p className='text-gray-600'>Perfect for getting started with AI content creation</p>
                </div>

                <ul className='space-y-4 mb-8'>
                  {freeFeatures.map((feature, index) => (
                    <li key={index} className='flex items-center gap-3'>
                      <Check className='w-5 h-5 text-green-500 flex-shrink-0' />
                      <span className='text-gray-700'>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button 
                  onClick={() => handleSubscribe('free', 0)}
                  className='w-full py-4 px-6 bg-gray-100 text-gray-800 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-200 border border-gray-200'
                >
                  Get Started Free
                </button>
              </div>

              {/* Premium Plan */}
              <div className='relative bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-8 shadow-xl border-2 border-purple-200 hover:shadow-2xl transition-all duration-300'>
                <div className='absolute top-4 right-4'>
                  <span className='bg-gradient-to-r from-purple-600 to-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium'>
                    Popular
                  </span>
                </div>
                
                <div className='mb-8'>
                  <h3 className='text-2xl font-bold text-gray-900 mb-2'>Premium</h3>
                  <div className='flex items-baseline mb-4'>
                    <span className='text-5xl font-bold text-gray-900'>$25</span>
                    <span className='text-gray-500 ml-2'>/month</span>
                  </div>
                  <p className='text-gray-600'>Unlock the full power of AI content creation</p>
                </div>

                <ul className='space-y-4 mb-8'>
                  {premiumFeatures.map((feature, index) => (
                    <li key={index} className='flex items-center gap-3'>
                      <Check className='w-5 h-5 text-purple-600 flex-shrink-0' />
                      <span className='text-gray-700'>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button 
                  onClick={() => handleSubscribe('premium', 25)}
                  className='w-full py-4 px-6 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl'
                >
                  Subscribe Now
                </button>
              </div>
            </div>
            
            {/* Decorative corner elements */}
            <div className='absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/10 via-transparent to-transparent rounded-bl-full'></div>
            <div className='absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-500/10 via-transparent to-transparent rounded-tr-full'></div>
          </div>
        </div>

        {/* Bottom Trust Section */}
        <div className='text-center mt-16'>
          <div className='inline-flex items-center justify-center gap-4 px-8 py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl'>
            <div className='flex items-center gap-2'>
              <div className='w-3 h-3 bg-green-400 rounded-full animate-pulse'></div>
              <span className='text-white/90 text-base font-medium'>Trusted by 10,000+ creators</span>
            </div>
            <div className='w-px h-6 bg-white/20'></div>
            <div className='text-white/70 text-sm'>
              <span className='font-semibold text-white'>4.9/5</span> average rating
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Plan