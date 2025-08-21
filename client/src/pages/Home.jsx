import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import AiTools from '../components/AiTools'
import { assets } from '../assets/assets'
import Testimonial from '../components/Testimonial'
import Plan from '../components/Plan'
import Footer from '../components/Footer'
import { useUser, Protect } from '@clerk/clerk-react';

const Home = () => {
  const { user } = useUser();

  // Clear localStorage plan to rely on Clerk billing only
  React.useEffect(() => {
    localStorage.removeItem('userPlan');
    localStorage.removeItem('planUpdatedAt');
  }, []);

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
      <Footer />
    </div>
  )
}

export default Home