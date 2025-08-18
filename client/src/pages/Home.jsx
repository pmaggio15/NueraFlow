import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import AiTools from '../components/AiTools'
import { assets } from '../assets/assets'
import Testimonial from '../components/Testimonial'
import Plan from '../components/Plan'

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
      <Plan />
    </div>
  )
}

export default Home