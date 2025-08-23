import { Edit, Edit2, Hash, Sparkles } from 'lucide-react'
import React, { useState } from 'react'

const BlogTitles = () => {
  const blogCategories = ['General', 'Technology', 'Business', 'Health', 'Lifestyle', 'Education', 'Travel', 'Food'] 
  const [selectedCategory, setSelectedCategory] = useState('General')  
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
            <Sparkles className='w-6 text-[#8e37eb]' /> 
            <h1 className='text-xl font-semibold'>AI Title Generator</h1>
          </div>
          
          <p className='mt-6 text-sm font-medium'>Keyword</p>
          <input 
            type="text" 
            value={input}                                    
            onChange={(e) => setInput(e.target.value)}     
            className='w-full p-3 mt-2 outline-none text-sm rounded-md border border-gray-300' 
            placeholder='web development, cooking tips...' 
            required
          />
          
          <p className='mt-6 text-sm font-medium'>Category</p> 
          <div className='mt-3 flex gap-3 flex-wrap'>
            {blogCategories.map((item) => (
              <span 
                onClick={() => setSelectedCategory(item)}     
                className={`text-xs px-4 py-2 border rounded-full cursor-pointer ${
                  selectedCategory === item
                    ? 'bg-purple-50 text-purple-700 border-purple-200' 
                    : 'text-gray-500 border-gray-300'
                }`} 
                key={item}
              >
                {item}
              </span>
            ))}
          </div>
          
          <button className="w-full flex justify-center items-center gap-2 bg-gradient-to-r
            from-[#c341f6] to-[#8e37eb] text-white px-4 py-3 mt-8 text-sm rounded-lg cursor-pointer hover:shadow-lg transition-all"> {/* Fixed: removed backticks */}
            <Hash className="w-5" /> 
            Generate titles 
          </button>
        </form> 

        {/* Right Column - Generated Titles */}
        <div className='flex-1 min-w-0 bg-white rounded-lg border border-gray-200 flex flex-col min-h-[400px]'>
          <div className='flex items-center gap-3 p-6 border-b border-gray-100'>
            <Hash className='w-5 h-5 text-[#8e37eb]' /> 
            <h1 className='text-xl font-semibold'>Generated Titles</h1>
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
                  <Hash className='w-8 h-8' /> 
                  <p className='text-center text-xs max-w-xs'>Enter a keyword and click "Generate titles" to get started</p> 
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogTitles