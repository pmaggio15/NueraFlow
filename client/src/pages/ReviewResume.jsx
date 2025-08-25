import { FileText, Sparkles, RefreshCw, Upload, Target, CheckCircle, AlertCircle, TrendingUp, User } from 'lucide-react'
import React, { useState, useRef } from 'react'

const ReviewResume = () => {
  const [selectedResume, setSelectedResume] = useState(null)
  const [additionalNotes, setAdditionalNotes] = useState('')
  const [reviewResult, setReviewResult] = useState(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef(null)

  const reviewCategories = [
    { name: 'Format & Structure', icon: '📄' },
    { name: 'Content Quality', icon: '✍️' },
    { name: 'Skills & Experience', icon: '🎯' },
    { name: 'ATS Optimization', icon: '🤖' }
  ]

  const handleFileSelect = (file) => {
    if (file && file.type === 'application/pdf') {
      setSelectedResume({
        file: file,
        name: file.name,
        size: file.size,
        type: file.type
      })
      setReviewResult(null) // Clear previous result
    }
  }

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0])
    }
  }

  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0])
    }
  }

  const onSubmitHandler = async () => {
    if (!selectedResume) {
      alert('Please upload a resume first');
      return;
    }
    
    setIsAnalyzing(true)
    
    console.log('Analyzing resume:', { 
      resume: selectedResume.name, 
      notes: additionalNotes 
    })
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 3500))
    
    // Mock review result
    const mockReview = {
      overallScore: 85,
      strengths: [
        "Strong technical skills section with relevant technologies",
        "Clear work experience with quantified achievements",
        "Professional formatting and consistent structure",
        "Good use of action verbs and industry keywords"
      ],
      improvements: [
        "Add a professional summary at the top",
        "Include more quantified results in experience section",
        "Consider adding relevant certifications",
        "Optimize for ATS with better keyword distribution"
      ],
      categories: [
        { name: 'Format & Structure', score: 90, feedback: 'Well-organized with clear sections and consistent formatting' },
        { name: 'Content Quality', score: 82, feedback: 'Good content but could benefit from more specific achievements' },
        { name: 'Skills & Experience', score: 88, feedback: 'Relevant skills well-presented, experience shows clear progression' },
        { name: 'ATS Optimization', score: 80, feedback: 'Good keyword usage but could be improved for better ATS compatibility' }
      ],
      recommendations: [
        "Add a 2-3 line professional summary highlighting your key value proposition",
        "Quantify more achievements with specific numbers, percentages, or dollar amounts",
        "Consider adding a 'Key Achievements' or 'Notable Projects' section",
        "Review job descriptions for target roles to optimize keyword usage"
      ]
    }
    
    setReviewResult(mockReview)
    setIsAnalyzing(false)
  }

  const startNewReview = () => {
    setReviewResult(null)
    setSelectedResume(null)
    setAdditionalNotes('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
  }

  const getScoreColor = (score) => {
    if (score >= 85) return 'text-green-600 bg-green-100'
    if (score >= 70) return 'text-yellow-600 bg-yellow-100'
    return 'text-red-600 bg-red-100'
  }

  const getScoreBarColor = (score) => {
    if (score >= 85) return 'bg-green-500'
    if (score >= 70) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  return (
    <div className='min-h-full p-6 bg-gradient-to-br from-slate-50 via-green-50 to-blue-50'>
      {/* Background decorative elements */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute top-1/4 left-1/4 w-72 h-72 bg-green-400/5 rounded-full blur-3xl animate-pulse'></div>
        <div className='absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl animate-pulse delay-1000'></div>
        <div className='absolute top-1/2 right-1/3 w-48 h-48 bg-emerald-400/5 rounded-full blur-2xl animate-pulse delay-500'></div>
      </div>

      <div className='relative z-10 max-w-7xl mx-auto'>
        {/* Header Section */}
        <div className='text-center mb-8'>
          <div className='flex items-center justify-center gap-3 mb-4'>
            <div className='p-3 bg-white/20 backdrop-blur-sm rounded-2xl border border-white/30 shadow-lg'>
              <FileText className='w-8 h-8 text-green-600' />
            </div>
          </div>
          <h1 className='text-4xl md:text-5xl font-bold text-gray-900 mb-4'>
            AI Resume <span className="bg-gradient-to-r from-green-600 via-blue-600 to-emerald-600 bg-clip-text text-transparent">Review</span>
          </h1>
          <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
            Get professional feedback and actionable insights to improve your resume
          </p>
        </div>

        <div className='flex flex-col lg:flex-row items-start gap-8'>
          {/* Left Column - Configuration */}
          <div className='w-full lg:w-96 lg:flex-shrink-0'>
            <div className='bg-white/70 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-8'>
              <div className='flex items-center gap-3 mb-8'>
                <div className='p-2 bg-green-100 rounded-xl'>
                  <Target className='w-5 h-5 text-green-600' />
                </div>
                <h2 className='text-2xl font-bold text-gray-900'>Review Settings</h2>
              </div>
              
              <div className='space-y-8'>
                {/* File Upload Area */}
                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-3'>Upload Resume</label>
                  <div
                    className={`relative border-2 border-dashed rounded-2xl p-6 text-center transition-all duration-200 ${
                      dragActive 
                        ? 'border-green-400 bg-green-50' 
                        : selectedResume 
                          ? 'border-green-400 bg-green-50' 
                          : 'border-gray-300 hover:border-gray-400'
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf"
                      onChange={handleFileInputChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    
                    {selectedResume ? (
                      <div className='space-y-3'>
                        <div className='w-16 h-16 mx-auto rounded-xl bg-red-100 flex items-center justify-center'>
                          <FileText className='w-8 h-8 text-red-600' />
                        </div>
                        <div>
                          <p className='font-medium text-green-700 text-sm'>{selectedResume.name}</p>
                          <p className='text-xs text-green-600'>{formatFileSize(selectedResume.size)}</p>
                        </div>
                      </div>
                    ) : (
                      <div className='space-y-3'>
                        <div className='w-12 h-12 mx-auto bg-gray-100 rounded-2xl flex items-center justify-center'>
                          <Upload className='w-6 h-6 text-gray-400' />
                        </div>
                        <div>
                          <p className='font-medium text-gray-900'>
                            {dragActive ? 'Drop resume here' : 'Click or drag to upload'}
                          </p>
                          <p className='text-xs text-gray-500 mt-1'>
                            PDF files only, up to 10MB
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Additional Notes */}
                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-3'>
                    Additional Focus Areas 
                    <span className='text-gray-500 font-normal'>(Optional)</span>
                  </label>
                  <textarea
                    value={additionalNotes}
                    onChange={(e) => setAdditionalNotes(e.target.value)}
                    rows={3}
                    className='w-full p-4 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none text-gray-900 placeholder-gray-500 transition-all duration-200 resize-none'
                    placeholder='Any specific areas you want us to focus on? (e.g., "career change to marketing")'
                  />
                  <p className='text-xs text-gray-500 mt-2'>
                    Help us provide more targeted feedback for your goals
                  </p>
                </div>

                <button 
                  onClick={onSubmitHandler}
                  disabled={isAnalyzing || !selectedResume}
                  className="w-full flex justify-center items-center gap-3 bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-4 rounded-2xl font-semibold text-lg hover:from-green-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  {isAnalyzing ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      Analyzing Resume...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" /> 
                      Review Resume
                    </>
                  )}
                </button>
              </div>
            </div> 
          </div>

          {/* Right Column - Review Results */}
          <div className='flex-1 min-w-0 bg-white/70 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl min-h-[600px] flex flex-col'>
            {/* Header */}
            <div className='flex items-center justify-between p-8 border-b border-gray-100'>
              <div className='flex items-center gap-3'>
                <div className='p-2 bg-blue-100 rounded-xl'>
                  <TrendingUp className='w-5 h-5 text-blue-600' />
                </div>
                <h2 className='text-2xl font-bold text-gray-900'>Review Results</h2>
              </div>
              
              {reviewResult && (
                <button
                  onClick={startNewReview}
                  className='flex items-center gap-2 px-4 py-2 bg-green-100 hover:bg-green-200 text-green-600 rounded-xl transition-colors duration-200 font-medium'
                >
                  <RefreshCw className='w-4 h-4' />
                  New Review
                </button>
              )}
            </div>
            
            {/* Content Area */}
            <div className='flex-1 overflow-y-auto'>
              {reviewResult ? (
                <div className='p-8 space-y-8'>
                  {/* Overall Score */}
                  <div className='text-center bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 border border-green-100'>
                    <div className='flex items-center justify-center gap-2 mb-2'>
                      <User className='w-5 h-5 text-green-600' />
                      <h3 className='font-semibold text-gray-900'>Overall Resume Score</h3>
                    </div>
                    <div className={`text-4xl font-bold mb-2 ${getScoreColor(reviewResult.overallScore).split(' ')[0]}`}>
                      {reviewResult.overallScore}/100
                    </div>
                    <div className='w-full bg-gray-200 rounded-full h-2'>
                      <div 
                        className={`h-2 rounded-full ${getScoreBarColor(reviewResult.overallScore)}`}
                        style={{ width: `${reviewResult.overallScore}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Category Scores */}
                  <div>
                    <h3 className='font-semibold text-gray-900 mb-4'>Category Breakdown</h3>
                    <div className='grid md:grid-cols-2 gap-4'>
                      {reviewResult.categories.map((category, index) => (
                        <div key={index} className='bg-white/60 rounded-xl p-4 border border-gray-100'>
                          <div className='flex items-center justify-between mb-2'>
                            <span className='font-medium text-gray-900'>{category.name}</span>
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getScoreColor(category.score)}`}>
                              {category.score}/100
                            </span>
                          </div>
                          <p className='text-xs text-gray-600'>{category.feedback}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Strengths */}
                  <div>
                    <div className='flex items-center gap-2 mb-4'>
                      <CheckCircle className='w-5 h-5 text-green-600' />
                      <h3 className='font-semibold text-gray-900'>Strengths</h3>
                    </div>
                    <div className='space-y-2'>
                      {reviewResult.strengths.map((strength, index) => (
                        <div key={index} className='flex items-start gap-3 p-3 bg-green-50 rounded-xl border border-green-100'>
                          <CheckCircle className='w-4 h-4 text-green-600 mt-0.5 flex-shrink-0' />
                          <span className='text-sm text-gray-700'>{strength}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Areas for Improvement */}
                  <div>
                    <div className='flex items-center gap-2 mb-4'>
                      <AlertCircle className='w-5 h-5 text-orange-600' />
                      <h3 className='font-semibold text-gray-900'>Areas for Improvement</h3>
                    </div>
                    <div className='space-y-2'>
                      {reviewResult.improvements.map((improvement, index) => (
                        <div key={index} className='flex items-start gap-3 p-3 bg-orange-50 rounded-xl border border-orange-100'>
                          <AlertCircle className='w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0' />
                          <span className='text-sm text-gray-700'>{improvement}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div>
                    <div className='flex items-center gap-2 mb-4'>
                      <Sparkles className='w-5 h-5 text-blue-600' />
                      <h3 className='font-semibold text-gray-900'>Action Recommendations</h3>
                    </div>
                    <div className='space-y-3'>
                      {reviewResult.recommendations.map((recommendation, index) => (
                        <div key={index} className='p-4 bg-blue-50 rounded-xl border border-blue-100'>
                          <div className='flex items-start gap-3'>
                            <span className='flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold'>
                              {index + 1}
                            </span>
                            <span className='text-sm text-gray-700 font-medium'>{recommendation}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className='h-full flex items-center justify-center p-8'>
                  <div className='text-center max-w-sm'>
                    <div className='p-6 bg-gray-100 rounded-full w-fit mx-auto mb-6'>
                      <FileText className='w-12 h-12 text-gray-400' />
                    </div>
                    <h3 className='text-xl font-semibold text-gray-900 mb-3'>Ready to Review</h3>
                    <p className='text-gray-600 leading-relaxed'>
                      Upload your resume to get detailed feedback and professional recommendations
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

export default ReviewResume
