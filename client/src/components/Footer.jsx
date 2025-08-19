import React, { useState } from 'react'
import { Mail, ArrowRight, Zap, Shield, Heart } from 'lucide-react'
import { assets } from '../assets/assets'

const Footer = () => {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      setTimeout(() => {
        setIsSubscribed(false)
        setEmail('')
      }, 3000)
    }
  }

  return (
    <footer className="relative overflow-hidden">
      {/* Background with same gradient as your site */}
      <div 
        className="absolute inset-0 bg-cover bg-no-repeat bg-center"
        style={{ backgroundImage: `url(${assets.gradientBackground})` }}
      >
        <div className="absolute inset-0 bg-black/20"></div>
      </div>
      
      {/* Decorative background elements */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-white/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl"></div>
      
      <div className="relative z-10 px-6 md:px-12 lg:px-24 xl:px-32 pt-20 pb-12">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-16">
            
            {/* Brand Section */}
            <div>
              <div className="mb-8">
                <img 
                  className="h-10 mb-6" 
                  src={assets.logo || "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/dummyLogo/dummyLogoDark.svg"} 
                  alt="NueraFlow Logo" 
                />
                <h3 className="text-2xl font-bold text-white mb-6 leading-tight">
                  AI-Powered Content Creation
                </h3>
                <p className="text-white/80 text-lg leading-relaxed max-w-lg">
                  Transform your creative workflow with our comprehensive suite of AI tools. 
                  Create, enhance, and optimize content with enterprise-grade artificial intelligence.
                </p>
              </div>
              
              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-2 text-white/70">
                  <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <Shield className="w-4 h-4 text-green-400" />
                  </div>
                  <span className="font-medium text-sm">Enterprise Security</span>
                </div>
                <div className="flex items-center gap-2 text-white/70">
                  <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <Zap className="w-4 h-4 text-blue-400" />
                  </div>
                  <span className="font-medium text-sm">99.9% Uptime</span>
                </div>
                <div className="flex items-center gap-2 text-white/70">
                  <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center">
                    <Heart className="w-4 h-4 text-red-400" />
                  </div>
                  <span className="font-medium text-sm">10,000+ Happy Users</span>
                </div>
              </div>
            </div>

            {/* Newsletter Section */}
            <div>
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-xl max-w-md lg:max-w-none">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5 text-blue-400" />
                  </div>
                  <h4 className="font-bold text-xl text-white">Stay Updated</h4>
                </div>
                <p className="text-white/80 text-base mb-8 leading-relaxed">
                  Get the latest AI insights, product updates, and exclusive tips delivered to your inbox.
                </p>
                
                {isSubscribed ? (
                  <div className="text-center py-6">
                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <ArrowRight className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-green-300 font-medium text-lg">Thanks for subscribing!</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} className="space-y-5">
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email" 
                      required
                      className="w-full px-5 py-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-base"
                    />
                    <button 
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition-colors shadow-lg hover:shadow-xl flex items-center justify-center gap-3 text-base"
                    >
                      Subscribe
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-wrap items-center gap-6 text-white/60 text-sm">
              <a href="#" className="hover:text-white transition-colors">Home</a>
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
              <a href="#" className="hover:text-white transition-colors">Support</a>
            </div>
            <div className="text-white/60 text-sm text-center md:text-right">
              <p>© 2025 NueraFlow</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer