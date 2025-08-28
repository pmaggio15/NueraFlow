import { FileText, Sparkles, RefreshCw, Upload, Target, TrendingUp } from 'lucide-react'
import React, { useState, useRef } from 'react'
import axios from 'axios'
import { useAuth } from '@clerk/clerk-react'
import toast from 'react-hot-toast'
import Markdown from 'react-markdown'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL || 'http://localhost:3000';

const ReviewResume = () => {
  // ✅ Simple function-style state (matches your “similar to this” snippet)
  const [input, setInput] = useState(null);     // PDF file
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState('');   // Markdown returned by API

  // UI state to keep your original styles/UX
  const [dragActive, setDragActive] = useState(false);
  const [selectedResume, setSelectedResume] = useState(null); // { file, name, size, type }
  const [additionalNotes, setAdditionalNotes] = useState('');
  const fileInputRef = useRef(null);

  const { getToken } = useAuth();

  const handleFileSelect = (file) => {
    if (!file) return;
    if (file.type !== 'application/pdf') {
      toast.error('Please upload a PDF file.');
      return;
    }
    setInput(file); // ✅ your simple “input” state
    setSelectedResume({
      file,
      name: file.name,
      size: file.size,
      type: file.type
    });
    setContent(''); // clear previous result
  };

  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
    if (e.type === 'dragleave') setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (!input) {
        toast.error('Please upload a resume first.');
        return;
      }
      setLoading(true);

      const formData = new FormData();
      formData.append('resume', input);
      // Optional: include notes if your backend wants them
      if (additionalNotes.trim()) formData.append('notes', additionalNotes.trim());

      const token = await getToken();
      const { data } = await axios.post('/api/ai/resume-review', formData, {
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
          // Let axios set the multipart boundary automatically
        },
      });

      if (data?.success) {
        setContent(data.content || '');
      } else {
        toast.error(data?.message || 'Failed to analyze resume.');
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message || 'Request failed');
    } finally {
      setLoading(false);
    }
  };

  const startNewReview = () => {
    setContent('');
    setInput(null);
    setSelectedResume(null);
    setAdditionalNotes('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

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
          {/* Left Column - Configuration (styles unchanged) */}
          <div className='w-full lg:w-96 lg:flex-shrink-0'>
            <div className='bg-white/70 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-8'>
              <div className='flex items-center gap-3 mb-8'>
                <div className='p-2 bg-green-100 rounded-xl'>
                  <Target className='w-5 h-5 text-green-600' />
                </div>
                <h2 className='text-2xl font-bold text-gray-900'>Review Settings</h2>
              </div>
              
              <form onSubmit={onSubmitHandler} className='space-y-8'>
                {/* File Upload Area (styles unchanged) */}
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

                {/* Additional Notes (kept for your style; optional) */}
                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-3'>
                    Additional Focus Areas <span className='text-gray-500 font-normal'>(Optional)</span>
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
                  type="submit"
                  disabled={loading || !input}
                  className="w-full flex justify-center items-center gap-3 bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-4 rounded-2xl font-semibold text-lg hover:from-green-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  {loading ? (
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
              </form>
            </div> 
          </div>

          {/* Right Column - Review Results (styles unchanged around the container/header) */}
          <div className='flex-1 min-w-0 bg-white/70 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl min-h-[600px] flex flex-col'>
            {/* Header */}
            <div className='flex items-center justify-between p-8 border-b border-gray-100'>
              <div className='flex items-center gap-3'>
                <div className='p-2 bg-blue-100 rounded-xl'>
                  <TrendingUp className='w-5 h-5 text-blue-600' />
                </div>
                <h2 className='text-2xl font-bold text-gray-900'>Review Results</h2>
              </div>
              
              {content && (
                <button
                  onClick={startNewReview}
                  className='flex items-center gap-2 px-4 py-2 bg-green-100 hover:bg-green-200 text-green-600 rounded-xl transition-colors duration-200 font-medium'
                >
                  <RefreshCw className='w-4 h-4' />
                  New Review
                </button>
              )}
            </div>
            
            {/* Content Area -> show Markdown like your simple version */}
            <div className='flex-1 overflow-y-auto'>
              {content ? (
                <div className='p-8'>
                  <div className='text-sm text-slate-600 max-w-none'>
                    {/* Optional reset wrapper if you use it elsewhere */}
                    <div className='reset-tw'>
                      <Markdown>{content}</Markdown>
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
          {/* /Right */}
        </div>
      </div>
    </div>
  )
}

export default ReviewResume
