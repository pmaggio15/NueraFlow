import { Edit, Edit2, Hash, Image, Sparkles } from 'lucide-react'
import React, { useState } from 'react'

const GenerateImages = () => {
  const imageStyle = ['Realisti style', 'Anime style', 'Cartoon style', 'Fantasy style', '3D style', 'Portrait style'] 
  const [selectedStyle, setSelectedStyle] = useState('Realistic')  
  const [input, setInput] = useState('')
  const [generatedTitles, setGeneratedTitles] = useState('')
  const [publish, setPublish] = useState(false)

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log('Generating titles for:', { input, selectedCategory })
  }

  return (
    <div className='h-full overflow-y-scroll p-6 text-slate-700'>
      <div className='flex items-start gap-6 max-w-7xl mx-auto'>
        
        {/* Left Column - Configuration */}
        <form onSubmit={onSubmitHandler} className='flex-shrink-0 w-96 p-6 bg-white rounded-lg border border-gray-200'>
          <div className='flex items-center gap-3'>
            <Sparkles className='w-6 text-[#00ad25]' /> 
            <h1 className='text-xl font-semibold'>AI Image Generator</h1>
          </div>
          
          <p className='mt-6 text-sm font-medium'>Describe Your Image</p>
          <textarea  
            rows= {4}
            value={input}                                    
            onChange={(e) => setInput(e.target.value)}     
            className='w-full p-3 mt-2 outline-none text-sm rounded-md border border-gray-300' 
            placeholder='Describe what you want to see in the image...' 
            required
          />
          
          <p className='mt-6 text-sm font-medium'>Style</p> 
          <div className='mt-3 flex gap-3 flex-wrap'>
            {imageStyle.map((item) => (
              <span 
                onClick={() => setSelectedStyle(item)}     
                className={`text-xs px-4 py-2 border rounded-full cursor-pointer ${
                  selectedStyle === item
                    ? 'bg-green-50 text-green-700 border-purple-200' 
                    : 'text-gray-500 border-gray-300'
                }`} 
                key={item}
              >
                {item}
              </span>
            ))}
          </div>

          <div className='my-6 flex items-center gap-2'>
            <label className='relative cursor-pointer'>
              <input type="checkbox" onChange={(e)=> setPublish(e.target.checked)} checked={publish} className='sr-only peer' />

              <div className='w-9 h-5 bg-slate-300 rounded-full peer-checked:bg-green-500 transition'></div>
              <span className='absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition peer-checked:translate-x-4'></span>
            </label>
            <p className='text-sm'>Make this image Public</p>
          </div>
          
          <button className="w-full flex justify-center items-center gap-2 bg-gradient-to-r
            from-[#00ad25] to-[#04ff50] text-white px-4 py-3 mt-8 text-sm rounded-lg cursor-pointer hover:shadow-lg transition-all"> {/* Fixed: removed backticks */}
            <Image className="w-5" /> 
            Generate Image
          </button>
        </form> 

        {/* Right Column - Generated Titles */}
        <div className='flex-1 min-w-0 bg-white rounded-lg border border-gray-200 flex flex-col min-h-[400px]'>
          <div className='flex items-center gap-3 p-6 border-b border-gray-100'>
            <Image className='w-5 h-5 text-[#00ad25]' /> 
            <h1 className='text-xl font-semibold'>Generated Image</h1>
          </div>
          
          {/* Content Area */}
          <div className='flex-1 p-6'>
            {generatedTitles ? ( 
              <div className='prose max-w-none'>
                <div className='whitespace-pre-wrap text-sm text-gray-700 leading-relaxed'>
                  {generatedTitles}
                </div>
              </div>
            ) : (
              // Show placeholder when no content
              <div className='h-full flex justify-center items-center'>
                <div className='flex flex-col items-center gap-3 text-gray-400 p-24'> 
                  <Image className='w-8 h-8' /> 
                  <p className='text-center text-xs max-w-xs'>Enter a keyword and click "Generate image" to get started</p> 
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
export default GenerateImages