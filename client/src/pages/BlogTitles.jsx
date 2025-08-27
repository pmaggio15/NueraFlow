import { Hash, Sparkles, Copy, RefreshCw, Lightbulb, Target } from 'lucide-react';
import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Markdown from 'react-markdown';
import { useAuth } from '@clerk/clerk-react';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const BlogTitles = () => {
  const blogCategories = [
    { name: 'General', icon: '📝' },
    { name: 'Technology', icon: '💻' },
    { name: 'Business', icon: '💼' },
    { name: 'Health', icon: '🏥' },
    { name: 'Lifestyle', icon: '✨' },
    { name: 'Education', icon: '🎓' },
    { name: 'Travel', icon: '✈️' },
    { name: 'Food', icon: '🍳' }
  ]
  
  const [selectedCategory, setSelectedCategory] = useState(null)  
  const [input, setInput] = useState('')
  const [generatedTitles, setGeneratedTitles] = useState([])
  const [isGenerating, setIsGenerating] = useState(false)

  const { getToken } = useAuth()

  const onSubmitHandler = async (e)=>{
        e.preventDefault();
        try {
           setIsGenerating(true)
           const prompt = `Generate a blog title for the keyword ${input} in the category ${selectedCategory.name}`
  
           const { data } = await axios.post('/api/ai/generate-blog-title', {prompt}, {headers: {Authorization: `Bearer ${await getToken()}`}})
  
           if (data.success) {
            const titlesArray = data.content.split('\n').filter(title => title.trim());
            setGeneratedTitles(titlesArray);
          }
          else{
            toast.error(data.message)
           }
        } catch (error) {
          toast.error(error.message)
        }
        setIsGenerating(false)
      }

      const regenerateTitles = async () => {
  if (!input.trim() || !selectedCategory) return;
  
  try {
    setIsGenerating(true);
    const prompt = `Generate a blog title for the keyword ${input} in the category ${selectedCategory.name}`;
    
    const { data } = await axios.post('/api/ai/generate-blog-title', {prompt}, {headers: {Authorization: `Bearer ${await getToken()}`}});

    if (data.success) {
    const titlesArray = data.content.split('\n').filter(title => title.trim());
    setGeneratedTitles(titlesArray);
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error(error.message);
  }
  setIsGenerating(false);
};

const copyTitle = (title) => {
  navigator.clipboard.writeText(title).then(() => {
    toast.success('Title copied to clipboard!');
  }).catch(() => {
    toast.error('Failed to copy title');
  });
};

  return (
    <div className='min-h-full p-6 bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50'>
      {/* Background decorative elements */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute top-1/4 left-1/4 w-72 h-72 bg-purple-400/5 rounded-full blur-3xl animate-pulse'></div>
        <div className='absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-400/5 rounded-full blur-3xl animate-pulse delay-1000'></div>
        <div className='absolute top-1/2 right-1/3 w-48 h-48 bg-blue-400/5 rounded-full blur-2xl animate-pulse delay-500'></div>
      </div>

      <div className='relative z-10 max-w-7xl mx-auto'>
        {/* Header Section */}
        <div className='text-center mb-8'>
          <div className='flex items-center justify-center gap-3 mb-4'>
            <div className='p-3 bg-white/20 backdrop-blur-sm rounded-2xl border border-white/30 shadow-lg'>
              <Hash className='w-8 h-8 text-purple-600' />
            </div>
          </div>
          <h1 className='text-4xl md:text-5xl font-bold text-gray-900 mb-4'>
            AI Blog Title <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">Generator</span>
          </h1>
          <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
            Create engaging, SEO-optimized blog titles that capture attention and drive traffic
          </p>
        </div>

        <div className='flex flex-col lg:flex-row items-start gap-8'>
          {/* Left Column - Configuration */}
          <div className='w-full lg:w-96 lg:flex-shrink-0'>
            <form onSubmit={onSubmitHandler} className='bg-white/70 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-8'>
              <div className='flex items-center gap-3 mb-8'>
                <div className='p-2 bg-purple-100 rounded-xl'>
                  <Target className='w-5 h-5 text-purple-600' />
                </div>
                <h2 className='text-2xl font-bold text-gray-900'>Title Settings</h2>
              </div>
              
              <div className='space-y-8'>
                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-3'>Topic Keywords</label>
                  <input 
                    type="text" 
                    value={input}                                    
                    onChange={(e) => setInput(e.target.value)}     
                    className='w-full p-4 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-gray-900 placeholder-gray-500 transition-all duration-200' 
                    placeholder='e.g., artificial intelligence, productivity tips...' 
                    required
                  />
                  <p className='text-xs text-gray-500 mt-2'>Enter the main topic or keywords for your blog post</p>
                </div>
                
                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-4'>Content Category</label> 
                  
                  {/* Top 4 Popular Categories */}
                  <div className='grid grid-cols-2 gap-3 mb-4'>
                    {blogCategories.slice(0, 4).map((category) => (
                      <div 
                        key={category.name}
                        onClick={() => setSelectedCategory(category)}     
                        className={`flex items-center gap-2 p-3 rounded-xl cursor-pointer transition-all duration-200 ${
                          selectedCategory?.name === category.name 
                            ? 'bg-purple-50 border border-purple-200 shadow-sm' 
                            : 'hover:bg-gray-50 border border-gray-200'
                        }`}
                      >
                        <div className={`w-3 h-3 rounded-full border-2 ${
                          selectedCategory?.name === category.name 
                            ? 'bg-purple-500 border-purple-500' 
                            : 'border-gray-300'
                        }`}>
                          {selectedCategory?.name === category.name && (
                            <div className='w-1.5 h-1.5 bg-white rounded-full m-0.5'></div>
                          )}
                        </div>
                        <span className='text-sm'>{category.icon}</span>
                        <div className='flex-1 min-w-0'>
                          <div className={`text-xs font-medium truncate ${
                            selectedCategory?.name === category.name ? 'text-purple-700' : 'text-gray-700'
                          }`}>
                            {category.name}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Category Selection Dropdown */}
                  <div className='relative'>
                    <select 
                      value={selectedCategory ? selectedCategory.name : ""}
                      onChange={(e) => {
                        if (e.target.value) {
                          setSelectedCategory(blogCategories.find(c => c.name === e.target.value))
                        }
                      }}
                      className='w-full p-3 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-gray-900 transition-all duration-200'
                    >
                      <option value="">Select Content Category</option>
                      <optgroup label="Popular Categories">
                        {blogCategories.slice(0, 4).map((category) => (
                          <option key={category.name} value={category.name}>
                            {category.icon} {category.name}
                          </option>
                        ))}
                      </optgroup>
                      <optgroup label="Additional Categories">
                        {blogCategories.slice(4).map((category) => (
                          <option key={category.name} value={category.name}>
                            {category.icon} {category.name}
                          </option>
                        ))}
                      </optgroup>
                    </select>
                  </div>
                </div>
                
                <button 
                  type="submit"
                  disabled={isGenerating || !input.trim() || !selectedCategory}
                  className="w-full flex justify-center items-center gap-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-4 rounded-2xl font-semibold text-lg hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      Generating Titles...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" /> 
                      Generate Blog Titles
                    </>
                  )}
                </button>
              </div>
            </form> 
          </div>

          {/* Right Column - Generated Titles */}
          <div className='flex-1 min-w-0 bg-white/70 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl min-h-[600px] flex flex-col'>
            {/* Header */}
            <div className='flex items-center justify-between p-8 border-b border-gray-100'>
              <div className='flex items-center gap-3'>
                <div className='p-2 bg-green-100 rounded-xl'>
                  <Lightbulb className='w-5 h-5 text-green-600' />
                </div>
                <h2 className='text-2xl font-bold text-gray-900'>Generated Titles</h2>
              </div>
              
              {generatedTitles.length > 0 && (
                <button
                  onClick={regenerateTitles}
                  className='flex items-center gap-2 px-4 py-2 bg-purple-100 hover:bg-purple-200 text-purple-600 rounded-xl transition-colors duration-200 font-medium'
                >
                  <RefreshCw className='w-4 h-4' />
                  Regenerate
                </button>
              )}
            </div>
            
            {/* Content Area */}
            <div className='flex-1 overflow-y-auto'>
              {generatedTitles.length > 0 ? (
                <div className='p-8'>
                  <div className='space-y-3'>
                    {generatedTitles.map((title, index) => (
                      <div 
                        key={index} 
                        className='group p-4 bg-white/60 hover:bg-white/80 rounded-xl border border-gray-100 hover:border-gray-200 transition-all duration-200 hover:shadow-sm'
                      >
                        <div className='flex items-start justify-between gap-4'>
                          <div className='flex items-start gap-3'>
                            <span className='flex-shrink-0 w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5'>
                              {index + 1}
                            </span>
                             <div className='text-gray-800 font-medium leading-relaxed prose prose-sm max-w-none [&>*]:mb-0'>
                              <Markdown>
                                {title}
                              </Markdown>
                            </div>
                          </div>
                          <button
                            onClick={() => copyTitle(title)}
                            className='flex-shrink-0 p-2 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-lg transition-colors duration-200 opacity-0 group-hover:opacity-100'
                            title='Copy title'
                          >
                            <Copy className='w-4 h-4' />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className='h-full flex items-center justify-center p-8'>
                  <div className='text-center max-w-sm'>
                    <div className='p-6 bg-gray-100 rounded-full w-fit mx-auto mb-6'>
                      <Hash className='w-12 h-12 text-gray-400' />
                    </div>
                    <h3 className='text-xl font-semibold text-gray-900 mb-3'>Ready to Create</h3>
                    <p className='text-gray-600 leading-relaxed'>
                      Enter your topic keywords and select a category to generate compelling blog titles
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogTitles