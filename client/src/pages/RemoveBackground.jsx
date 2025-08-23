import { Edit, Edit2, Eraser, Hash, Image, Sparkles } from 'lucide-react'
import React, { useState } from 'react'

const RemoveBackground = () => {
 
  const [input, setInput] = useState('')
  const [generatedTitles, setGeneratedTitles] = useState('')

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
            <Sparkles className='w-6 text-[#ff4938]' /> 
            <h1 className='text-xl font-semibold'>Background Removal</h1>
          </div>
          
          <p className='mt-6 text-sm font-medium'>Upload Image</p>
          <textarea  
            value={input}   
            type="file"
            accept="image/*"                                 
            onChange={(e) => setInput(e.target.files[0])}     
            className='w-full p-3 mt-2 outline-none text-sm rounded-md border border-gray-300 text-gray-600' 
            required
          />

          <p className='text-xs text-gray-500 font-light mt-1'>Supports JPG, PNG, and other image formats</p>
          
          <button className="w-full flex justify-center items-center gap-2 bg-gradient-to-r
            from-[#f6ab41] to-[#ff4938] text-white px-4 py-3 mt-8 text-sm rounded-lg cursor-pointer hover:shadow-lg transition-all"> {/* Fixed: removed backticks */}
            <Eraser className="w-5" /> 
            Remove background
          </button>
        </form> 

        {/* Right Column - Generated Titles */}
        <div className='flex-1 min-w-0 bg-white rounded-lg border border-gray-200 flex flex-col min-h-[400px]'>
          <div className='flex items-center gap-3 p-6 border-b border-gray-100'>
            <Eraser className='w-5 h-5 text-[#ff4938]' /> 
            <h1 className='text-xl font-semibold'>Processed Image</h1>
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
                  <Eraser className='w-8 h-8' /> 
                  <p className='text-center text-xs max-w-xs'>Enter a keyword and click "Remove Background" to get started</p> 
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
export default RemoveBackground