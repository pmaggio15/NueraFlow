import { Edit, Edit2, Eraser, Hash, Image, Scissors, Sparkles } from 'lucide-react'
import React, { useState } from 'react'

const RemoveObject = () => {
  const [input, setInput] = useState('')
  const [object, setObject] = useState('')

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
            <Sparkles className='w-6 text-[#4a7aff]' /> 
            <h1 className='text-xl font-semibold'>Object Removal</h1>
          </div>
          
          <p className='mt-6 text-sm font-medium'>Upload Image</p>
          <input  
            value={input}   
            type="file"
            accept="image/*"                                 
            onChange={(e) => setInput(e.target.files[0])}     
            className='w-full p-3 mt-2 outline-none text-sm rounded-md border border-gray-300 text-gray-600' 
            required
          />

          <p className='mt-6 text-sm font-medium'>Describe object name to remove</p>

          <textarea onChange={(e) => setObject(e.target.value)} value={object} rows={4}
            className='w-full p-2 px-3 mt-2 outine-none text-sm rounded-md border border-gray-300' placeholder='e.g., watch or spoon, Only single object name' required></textarea>
          
          <button className="w-full flex justify-center items-center gap-2 bg-gradient-to-r
            from-[#417df6] to-[#8e37eb] text-white px-4 py-3 mt-8 text-sm rounded-lg cursor-pointer hover:shadow-lg transition-all"> 
            <Scissors className="w-5" /> 
            Remove object
          </button>
        </form> 

        {/* Right Column - Generated Titles */}
        <div className='flex-1 min-w-0 bg-white rounded-lg border border-gray-200 flex flex-col min-h-[400px]'>
          <div className='flex items-center gap-3 p-6 border-b border-gray-100'>
            <Scissors className='w-5 h-5 text-[#4a7aff]' /> 
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
              
              <div className='h-full flex justify-center items-center'>
                <div className='flex flex-col items-center gap-3 text-gray-400 p-24'> 
                  <Scissors className='w-8 h-8' /> 
                  <p className='text-center text-xs max-w-xs'>Upload an image and click "Remove Object" to get started.</p> 
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
export default RemoveObject