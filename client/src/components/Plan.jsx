// import React from 'react'
// import {PricingTable} from '@clerk/clerk-react'

// const Plan = () => {
//   return (
//     <div className='max-w-2xl mx-auto z-20 my-30'>
//       <div className='text-center'>
//         <h2 className='text-slate-700 text-[42px]
//             font-semibold'>
//             Choose Your Plan
//         </h2>
//         <p className='text-gray-500 max-w-lg mx-auto'>Start for free and scale up as you grow. Find the perfect plan for your content creation needs.</p>
//       </div>
//       <div className='mt-14 max-sm:mx-8'>
//         <PricingTable /> 
//       </div>
//     </div>
//   )
// }

// export default Plan

import React from 'react'
import { PricingTable } from '@clerk/clerk-react'
import { Crown, Zap, Shield } from 'lucide-react'

const Plan = () => {
  return (
    <section className='px-6 md:px-12 lg:px-24 xl:px-32 py-20 lg:py-32 relative overflow-hidden'>
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
            Choose Your
            <span className='block mt-2 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent'>
              Perfect Plan
            </span>
          </h2>
          
          {/* Subheading */}
          <p className='text-xl md:text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed font-light mb-8'>
            Start for free and scale up as you grow. Find the perfect plan for your 
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

        {/* Pricing Table Container */}
        <div className='relative'>
          {/* Backdrop blur container for pricing table */}
          <div className='bg-white/95 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-2xl border border-white/30 hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] transition-all duration-500'>
            {/* Premium glow effect */}
            <div className='absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-purple-500/5 rounded-3xl'></div>
            
            {/* Pricing Table */}
            <div className='relative z-10'>
              <PricingTable />
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
