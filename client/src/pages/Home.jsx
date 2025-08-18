import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import AiTools from '../components/AiTools'
import { assets } from '../assets/assets'
import Testimonial from '../components/Testimonial'

const Home = () => {
  return (
    <div 
      className="min-h-screen bg-cover bg-no-repeat bg-center"
      style={{ backgroundImage: `url(${assets.gradientBackground})` }}
    >
      <Navbar />
      <Hero />
      <AiTools />
      <Testimonial />
    </div>
  )
}

export default Home