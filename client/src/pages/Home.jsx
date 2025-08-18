// import React from 'react'
// import Navbar from '../components/Navbar'
// import Hero from '../components/Hero'
// import AiTools from '../components/AiTools'

// const Home = () => {
//   return (
//       <>
//         <Navbar />
//         <Hero />
//         <AiTools />
//       </>
//   )
// }

// export default Home


import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import AiTools from '../components/AiTools'
import { assets } from '../assets/assets'

const Home = () => {
  return (
    <div 
      className="min-h-screen bg-cover bg-no-repeat bg-center"
      style={{ backgroundImage: `url(${assets.gradientBackground})` }}
    >
      <Navbar />
      <Hero />
      <AiTools />
    </div>
  )
}

export default Home