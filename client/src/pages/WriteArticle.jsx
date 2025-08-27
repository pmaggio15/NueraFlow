import { Edit, Edit2, Sparkles, Copy, Download, RefreshCw } from 'lucide-react'
import React, { useState } from 'react'
import axios from 'axios'
import { useAuth } from '@clerk/clerk-react'
import Markdown from 'react-markdown'

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || 'http://localhost:3000',
  headers: { 'Content-Type': 'application/json' }
})

const WriteArticle = () => {
  const articleLength = [
    { length: 800,  text: 'Short (500-800 words)',   desc: 'Quick reads, blog posts' },
    { length: 1200, text: 'Medium (800-1200 words)', desc: 'In-depth articles' },
    { length: 1600, text: 'Long (1200+ words)',      desc: 'Comprehensive guides' }
  ]

  const [selectedLength, setSelectedLength] = useState(articleLength[0])
  const [input, setInput] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)   
  const [generatedArticle, setGeneratedArticle] = useState('') 

  const { getToken } = useAuth()

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    if (!input.trim()) return
    setIsGenerating(true)

    try {
      const prompt = `Write an article about ${input} in ${selectedLength.text}`

      const token = await getToken()
      const { data } = await api.post(
        '/api/ai/generate-article',
        { prompt, length: selectedLength.length },
        token ? { headers: { Authorization: `Bearer ${token}` } } : undefined
      )

      if (data?.success) {
        setGeneratedArticle(data.content ?? '')
      } else {
        alert(data?.message || 'Failed to generate article.')
      }
    } catch (err) {
      const msg = err?.response?.data?.message || err?.message || 'Request failed'
      alert(msg)
    } finally {
      setIsGenerating(false)
    }
  }

  const copyToClipboard = () => {
    if (!generatedArticle) return
    navigator.clipboard.writeText(generatedArticle)
  }

  const downloadArticle = () => {
    if (!generatedArticle) return
    const blob = new Blob([generatedArticle], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${input.replace(/\s+/g, '-').toLowerCase()}-article.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const regenerateArticle = async () => {
    if (isGenerating) return
    setGeneratedArticle('')
    // programmatically trigger generate with the current values
    await onSubmitHandler({ preventDefault: () => {} })
  }

  return (
    <div className='min-h-full p-6 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50'>
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute top-1/4 left-1/4 w-72 h-72 bg-blue-400/5 rounded-full blur-3xl animate-pulse'></div>
        <div className='absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-400/5 rounded-full blur-3xl animate-pulse delay-1000'></div>
        <div className='absolute top-1/2 right-1/3 w-48 h-48 bg-cyan-400/5 rounded-full blur-2xl animate-pulse delay-500'></div>
      </div>

      <div className='relative z-10 max-w-7xl mx-auto'>
        <div className='text-center mb-8'>
          <div className='flex items-center justify-center gap-3 mb-4'>
            <div className='p-3 bg-white/20 backdrop-blur-sm rounded-2xl border border-white/30 shadow-lg'>
              <Sparkles className='w-8 h-8 text-blue-600' />
            </div>
          </div>
          <h1 className='text-4xl md:text-5xl font-bold text-gray-900 mb-4'>
            AI Article <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">Generator</span>
          </h1>
          <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
            Transform your ideas into compelling, well-structured articles with the power of AI
          </p>
        </div>

        <div className='flex flex-col lg:flex-row items-start gap-8'>
          {/* Left Column */}
          <div className='w-full lg:w-96 lg:flex-shrink-0'>
            <form onSubmit={onSubmitHandler} className='bg-white/70 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-8'>
              <div className='flex items-center gap-3 mb-8'>
                <div className='p-2 bg-blue-100 rounded-xl'>
                  <Edit className='w-5 h-5 text-blue-600' />
                </div>
                <h2 className='text-2xl font-bold text-gray-900'>Configuration</h2>
              </div>

              <div className='space-y-6'>
                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-3'>Article Topic</label>
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className='w-full p-4 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900 placeholder-gray-500 transition-all duration-200'
                    placeholder='The future of artificial intelligence is...'
                    required
                  />
                </div>

                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-3'>Article Length</label>
                  <div className='space-y-3'>
                    {articleLength.map((item, index) => (
                      <div
                        key={index}
                        onClick={() => setSelectedLength(item)}
                        className={`p-4 rounded-2xl border-2 cursor-pointer transition-all duration-200 ${
                          selectedLength.text === item.text
                            ? 'bg-blue-50 border-blue-200 shadow-lg'
                            : 'bg-white/60 border-gray-200 hover:bg-white/80 hover:border-gray-300'
                        }`}
                      >
                        <div className='flex items-center justify-between'>
                          <div>
                            <div className={`text-sm font-semibold ${
                              selectedLength.text === item.text ? 'text-blue-700' : 'text-gray-700'
                            }`}>
                              {item.text}
                            </div>
                            <div className={`text-xs mt-1 ${
                              selectedLength.text === item.text ? 'text-blue-600' : 'text-gray-500'
                            }`}>
                              {item.desc}
                            </div>
                          </div>
                          <div className={`w-4 h-4 rounded-full border-2 ${
                            selectedLength.text === item.text
                              ? 'bg-blue-500 border-blue-500'
                              : 'border-gray-300'
                          }`}>
                            {selectedLength.text === item.text && (
                              <div className='w-2 h-2 bg-white rounded-full m-0.5' />
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isGenerating || !input.trim()}
                  className="w-full flex justify-center items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-4 rounded-2xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      Generating Article...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      Generate Article
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Right Column - Generated Article */}
          <div className='flex-1 min-w-0 bg-white/70 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl min-h-[600px] flex flex-col'>
            <div className='flex items-center justify-between p-8 border-b border-gray-100'>
              <div className='flex items-center gap-3'>
                <div className='p-2 bg-green-100 rounded-xl'>
                  <Edit2 className='w-5 h-5 text-green-600' />
                </div>
                <h2 className='text-2xl font-bold text-gray-900'>Generated Article</h2>
              </div>

              {generatedArticle && (
                <div className='flex items-center gap-2'>
                  <button onClick={copyToClipboard} className='p-3 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-xl' title='Copy to clipboard'>
                    <Copy className='w-4 h-4' />
                  </button>
                  <button onClick={downloadArticle} className='p-3 bg-green-100 hover:bg-green-200 text-green-600 rounded-xl' title='Download article'>
                    <Download className='w-4 h-4' />
                  </button>
                  <button onClick={regenerateArticle} className='p-3 bg-purple-100 hover:bg-purple-200 text-purple-600 rounded-xl' title='Regenerate article'>
                    <RefreshCw className='w-4 h-4' />
                  </button>
                </div>
              )}
            </div>
            
            <div className="flex-1 overflow-y-auto">
            {generatedArticle ? (
              <div className="p-8">
                <div className="prose prose-slate max-w-none">
                  <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                    <div className='reset__tw'>
                      <Markdown>{generatedArticle}</Markdown>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center p-32">
                <div className="text-center max-w-sm">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Ready to Create</h3>
                  <p className="text-gray-600 leading-relaxed mb-4 text-sm">
                    Enter your topic then click "Generate Article" to create
                  </p>
                  <div className="p-4 bg-gray-100 rounded-full w-fit mx-auto mb-6">
                    <Edit2 className="w-4 h-4 text-gray-400" />
                  </div>
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

export default WriteArticle

