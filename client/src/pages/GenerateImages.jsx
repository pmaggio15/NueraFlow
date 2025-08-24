import { Image, Sparkles, Download, Share2, RefreshCw, Palette, Wand2 } from 'lucide-react'
import React, { useState } from 'react'

const GenerateImages = () => {
  const imageStyles = [
    { name: 'Realistic', desc: 'Photo-realistic images', icon: '📸' },
    { name: 'Anime', desc: 'Japanese animation style', icon: '🎌' },
    { name: 'Cartoon', desc: 'Fun cartoon style', icon: '🎨' },
    { name: 'Fantasy', desc: 'Magical and mystical', icon: '🧙‍♂️' },
    { name: '3D Render', desc: '3D rendered graphics', icon: '🔮' },
    { name: 'Portrait', desc: 'Professional portraits', icon: '👤' }
  ]
  
  const [selectedStyle, setSelectedStyle] = useState(null)  
  const [input, setInput] = useState('')
  const [generatedImage, setGeneratedImage] = useState(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [makePublic, setMakePublic] = useState(false)

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    
    if (!selectedStyle) {
      alert('Please select an art style');
      return;
    }
    
    setIsGenerating(true)
    
    console.log('Generating image:', { input, selectedStyle: selectedStyle.name, makePublic })
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 4000))
    
    // Mock generated image - replace with actual API response
    const mockImageUrl = `https://picsum.photos/400/400?random=${Date.now()}`
    setGeneratedImage({
      url: mockImageUrl,
      prompt: input,
      style: selectedStyle.name,
      timestamp: new Date().toISOString()
    })
    
    setIsGenerating(false)
  }

  const downloadImage = () => {
    if (generatedImage) {
      const link = document.createElement('a')
      link.href = generatedImage.url
      link.download = `ai-generated-${Date.now()}.png`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  const shareImage = () => {
    if (navigator.share && generatedImage) {
      navigator.share({
        title: 'AI Generated Image',
        text: `Generated with prompt: ${generatedImage.prompt}`,
        url: generatedImage.url
      })
    }
  }

  const regenerateImage = () => {
    setGeneratedImage(null)
    onSubmitHandler(new Event('submit'))
  }

  return (
    <div className='min-h-full p-6 bg-gradient-to-br from-slate-50 via-green-50 to-blue-50'>
      {/* Background decorative elements */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute top-1/4 left-1/4 w-72 h-72 bg-green-400/5 rounded-full blur-3xl animate-pulse'></div>
        <div className='absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl animate-pulse delay-1000'></div>
        <div className='absolute top-1/2 right-1/3 w-48 h-48 bg-purple-400/5 rounded-full blur-2xl animate-pulse delay-500'></div>
      </div>

      <div className='relative z-10 max-w-7xl mx-auto'>
        {/* Header Section */}
        <div className='text-center mb-8'>
          <div className='flex items-center justify-center gap-3 mb-4'>
            <div className='p-3 bg-white/20 backdrop-blur-sm rounded-2xl border border-white/30 shadow-lg'>
              <Wand2 className='w-8 h-8 text-green-600' />
            </div>
          </div>
          <h1 className='text-4xl md:text-5xl font-bold text-gray-900 mb-4'>
            AI Image <span className="bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">Generator</span>
          </h1>
          <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
            Transform your imagination into stunning visuals with the power of AI
          </p>
        </div>

        <div className='flex flex-col lg:flex-row items-start gap-8'>
          {/* Left Column - Configuration */}
          <div className='w-full lg:w-96 lg:flex-shrink-0'>
            <form onSubmit={onSubmitHandler} className='bg-white/70 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-8'>
              <div className='flex items-center gap-3 mb-8'>
                <div className='p-2 bg-green-100 rounded-xl'>
                  <Palette className='w-5 h-5 text-green-600' />
                </div>
                <h2 className='text-2xl font-bold text-gray-900'>Create Settings</h2>
              </div>
              
              <div className='space-y-8'>
                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-3'>Describe Your Image</label>
                  <textarea
                    rows={4}
                    value={input}                                    
                    onChange={(e) => setInput(e.target.value)}     
                    className='w-full p-4 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none text-gray-900 placeholder-gray-500 transition-all duration-200 resize-none' 
                    placeholder='A futuristic cityscape at sunset with flying cars and neon lights...' 
                    required
                  />
                  <p className='text-xs text-gray-500 mt-2'>Be detailed and specific for best results</p>
                </div>
                
                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-4'>Art Style</label> 
                  
                  {/* Top 4 Popular Styles */}
                  <div className='grid grid-cols-2 gap-3 mb-4'>
                    {imageStyles.slice(0, 4).map((style) => (
                      <div 
                        key={style.name}
                        onClick={() => setSelectedStyle(style)}     
                        className={`flex items-center gap-2 p-3 rounded-xl cursor-pointer transition-all duration-200 ${
                          selectedStyle?.name === style.name 
                            ? 'bg-green-50 border border-green-200 shadow-sm' 
                            : 'hover:bg-gray-50 border border-gray-200'
                        }`}
                      >
                        <div className={`w-3 h-3 rounded-full border-2 ${
                          selectedStyle?.name === style.name 
                            ? 'bg-green-500 border-green-500' 
                            : 'border-gray-300'
                        }`}>
                          {selectedStyle?.name === style.name && (
                            <div className='w-1.5 h-1.5 bg-white rounded-full m-0.5'></div>
                          )}
                        </div>
                        <span className='text-sm'>{style.icon}</span>
                        <div className='flex-1 min-w-0'>
                          <div className={`text-xs font-medium truncate ${
                            selectedStyle?.name === style.name ? 'text-green-700' : 'text-gray-700'
                          }`}>
                            {style.name}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Style Selection Dropdown */}
                  <div className='relative'>
                    <select 
                      value={selectedStyle ? selectedStyle.name : ""}
                      onChange={(e) => {
                        if (e.target.value) {
                          setSelectedStyle(imageStyles.find(s => s.name === e.target.value))
                        }
                      }}
                      className='w-full p-3 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none text-gray-900 transition-all duration-200'
                    >
                      <option value="">Select Art Style & Quality</option>
                      <optgroup label="Popular Styles">
                        {imageStyles.slice(0, 4).map((style) => (
                          <option key={style.name} value={style.name}>
                            {style.icon} {style.name} - {style.desc}
                          </option>
                        ))}
                      </optgroup>
                      <optgroup label="Additional Styles">
                        {imageStyles.slice(4).map((style) => (
                          <option key={style.name} value={style.name}>
                            {style.icon} {style.name} - {style.desc}
                          </option>
                        ))}
                      </optgroup>
                    </select>
                  </div>
                </div>

                {/* Public Toggle */}
                <div className='flex items-center justify-between p-4 bg-blue-50 rounded-2xl border border-blue-100'>
                  <div className='flex items-center gap-3'>
                    <Share2 className='w-5 h-5 text-blue-600' />
                    <div>
                      <div className='font-medium text-gray-900'>Make Public</div>
                      <div className='text-xs text-gray-600'>Share with the community</div>
                    </div>
                  </div>
                  <label className='relative cursor-pointer'>
                    <input 
                      type="checkbox" 
                      onChange={(e) => setMakePublic(e.target.checked)} 
                      checked={makePublic} 
                      className='sr-only peer' 
                    />
                    <div className='w-11 h-6 bg-gray-300 rounded-full peer-checked:bg-green-500 transition-colors duration-200'></div>
                    <div className='absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 peer-checked:translate-x-5 shadow-sm'></div>
                  </label>
                </div>
                
                <button 
                  type="submit"
                  disabled={isGenerating || !input.trim() || !selectedStyle}
                  className="w-full flex justify-center items-center gap-3 bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-4 rounded-2xl font-semibold text-lg hover:from-green-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      Creating Your Image...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" /> 
                      Generate Image
                    </>
                  )}
                </button>
              </div>
            </form> 
          </div>

          {/* Right Column - Generated Image */}
          <div className='flex-1 min-w-0 bg-white/70 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl min-h-[600px] flex flex-col'>
            {/* Header */}
            <div className='flex items-center justify-between p-8 border-b border-gray-100'>
              <div className='flex items-center gap-3'>
                <div className='p-2 bg-purple-100 rounded-xl'>
                  <Image className='w-5 h-5 text-purple-600' />
                </div>
                <h2 className='text-2xl font-bold text-gray-900'>Generated Image</h2>
              </div>
              
              {generatedImage && (
                <div className='flex items-center gap-2'>
                  <button
                    onClick={downloadImage}
                    className='p-3 bg-green-100 hover:bg-green-200 text-green-600 rounded-xl transition-colors duration-200'
                    title='Download image'
                  >
                    <Download className='w-4 h-4' />
                  </button>
                  <button
                    onClick={shareImage}
                    className='p-3 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-xl transition-colors duration-200'
                    title='Share image'
                  >
                    <Share2 className='w-4 h-4' />
                  </button>
                  <button
                    onClick={regenerateImage}
                    className='p-3 bg-purple-100 hover:bg-purple-200 text-purple-600 rounded-xl transition-colors duration-200'
                    title='Generate new image'
                  >
                    <RefreshCw className='w-4 h-4' />
                  </button>
                </div>
              )}
            </div>
            
            {/* Content Area */}
            <div className='flex-1 overflow-hidden'>
              {generatedImage ? (
                <div className='h-full p-8'>
                  <div className='h-full flex flex-col'>
                    <div className='flex-1 flex items-center justify-center bg-gray-50 rounded-2xl p-6 mb-6'>
                      <img 
                        src={generatedImage.url} 
                        alt="Generated artwork" 
                        className='max-w-full max-h-full object-contain rounded-xl shadow-lg'
                      />
                    </div>
                    
                    <div className='bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-4 border border-green-100'>
                      <div className='flex items-center gap-3 mb-2'>
                        <Palette className='w-4 h-4 text-green-600' />
                        <span className='font-semibold text-gray-900'>Image Details</span>
                      </div>
                      <div className='text-sm space-y-1'>
                        <div><span className='font-medium'>Style:</span> {generatedImage.style}</div>
                        <div><span className='font-medium'>Prompt:</span> {generatedImage.prompt}</div>
                        <div><span className='font-medium'>Created:</span> {new Date(generatedImage.timestamp).toLocaleString()}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className='h-full flex items-center justify-center p-8'>
                  <div className='text-center max-w-sm'>
                    <div className='p-6 bg-gray-100 rounded-full w-fit mx-auto mb-6'>
                      <Image className='w-12 h-12 text-gray-400' />
                    </div>
                    <h3 className='text-xl font-semibold text-gray-900 mb-3'>Ready to Create</h3>
                    <p className='text-gray-600 leading-relaxed'>
                      Describe your vision and select an art style to generate stunning AI-powered images
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

export default GenerateImages