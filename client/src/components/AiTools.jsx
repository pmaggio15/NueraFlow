import React from 'react'
import { AiToolsData } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'
import { ArrowRight, CheckCircle2, Zap } from 'lucide-react'

const AiTools = () => {
    const navigate = useNavigate()
    const { user } = useUser()
    
    return (
        <section className='px-4 sm:px-8 lg:px-20 xl:px-32 pt-16 pb-8 lg:pt-24 lg:pb-12 relative overflow-hidden'>
            {/* Background decorative elements */}
            <div className='absolute top-0 left-1/4 w-72 h-72 bg-white/5 rounded-full blur-3xl'></div>
            <div className='absolute bottom-0 right-1/4 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl'></div>
            
            {/* Header Section */}
            <div className='relative z-10 text-center max-w-5xl mx-auto mb-20'>
                {/* Premium Badge */}
                <div className='inline-flex items-center gap-2 px-4 py-2 mb-8 text-sm font-semibold text-white bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-xl border border-white/20 rounded-full shadow-lg'>
                    <Zap className='w-4 h-4 text-yellow-400' />
                    <span>Enterprise-Grade AI Suite</span>
                    <CheckCircle2 className='w-4 h-4 text-green-400' />
                </div>
                
                {/* Main Heading */}
                <h2 className='text-5xl md:text-6xl lg:text-60xl font-bold text-white mb-2 leading-tight tracking-tight'>
                    
                    <span className='block mt-2 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent'>
                        Advanced AI Tools
                    </span>
                </h2>
                
                {/* Subheading */}
                <p className="text-base md:text-lg text-white/80 max-w-4xl mx-auto leading-relaxed">
                    Everything you need to create, enhance, and optimize your content with 
                    <span className="font-semibold text-white"> cutting-edge AI technology</span>
                </p>
                
            </div>

            {/* Tools Grid */}
            <div className='relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-8xl mx-auto'>
                {AiToolsData.map((tool, index) => (
                    <div 
                        key={index} 
                        className='group relative bg-white/95 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-white/30 hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] hover:border-white/50 hover:-translate-y-3 transition-all duration-700 ease-out cursor-pointer overflow-hidden'
                        onClick={() => user && navigate(tool.path)}
                    >
                        {/* Premium glow effect */}
                        <div className='absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl'></div>
                        
                        {/* Floating particles effect */}
                        <div className='absolute top-4 right-4 w-2 h-2 bg-purple-400/60 rounded-full opacity-0 group-hover:opacity-100 animate-pulse transition-opacity duration-700'></div>
                        <div className='absolute top-8 right-8 w-1 h-1 bg-cyan-400/60 rounded-full opacity-0 group-hover:opacity-100 animate-pulse transition-opacity duration-1000'></div>
                        
                        {/* Content */}
                        <div className='relative z-10'>
                            {/* Icon Container */}
                            <div className='mb-8'>
                                <div 
                                    className='inline-flex items-center justify-center w-20 h-20 rounded-3xl shadow-2xl group-hover:scale-110 transition-transform duration-500 ease-out'
                                    style={{
                                        background: `linear-gradient(135deg, ${tool.bg.from}, ${tool.bg.to})`,
                                        boxShadow: `0 20px 40px -12px ${tool.bg.from}40`
                                    }}
                                >
                                    <tool.Icon className='w-10 h-10 text-white drop-shadow-lg' />
                                </div>
                            </div>

                            {/* Title */}
                            <h3 className='text-2xl font-bold text-gray-900 mb-4 group-hover:text-gray-800 transition-colors duration-300 leading-tight'>
                                {tool.title}
                            </h3>

                            {/* Description */}
                            <p className='text-gray-600 text-base leading-relaxed mb-8 line-clamp-3'>
                                {tool.description}
                            </p>

                            {/* CTA Button */}
                            <div className='flex items-center justify-between'>
                                <div className='flex items-center text-base font-semibold text-gray-700 group-hover:text-gray-900 transition-colors duration-300'>
                                    <span>Explore Tool</span>
                                    <ArrowRight className='w-5 h-5 ml-3 transform group-hover:translate-x-2 transition-transform duration-300' />
                                </div>
                                
                                {/* Premium indicator */}
                                <div className='opacity-0 group-hover:opacity-100 transition-opacity duration-500'>
                                    <div className='px-3 py-1 bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 text-xs font-semibold rounded-full'>
                                        Premium
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Decorative corner elements */}
                        <div className='absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/20 via-transparent to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-700'></div>
                        <div className='absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-500/10 via-transparent to-transparent rounded-tr-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000'></div>
                    </div>
                ))}
            </div> 
             <div className="relative z-10 flex flex-wrap justify-center items-center gap-8 mt-20 pt-12 border-t border-white/10"></div>           
        </section>
    )
}

export default AiTools
