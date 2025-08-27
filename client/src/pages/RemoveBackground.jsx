// import { Eraser, Sparkles, Download, Share2, RefreshCw, Upload, ImageIcon, Wand2 } from 'lucide-react'
// import React, { useState, useRef } from 'react'
// import axios from 'axios';

// axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

// const RemoveBackground = () => {

//   const RemoveBackground = () => {
//   const [selectedImage, setSelectedImage] = useState(null)
//   const [processedImage, setProcessedImage] = useState(null)
//   const [isProcessing, setIsProcessing] = useState(false)
//   const [dragActive, setDragActive] = useState(false)
//   const fileInputRef = useRef(null)

//   const {getToken} = useAuth()
    
//   const onSubmitHandler = async (e)=>{
//         e.preventDefault();
//         try {
//           setLoading(true)

//           const formData = new FormData()
//           formData.append('image', input)

//           const { data } = await axios.post('/api/ai/remove-image-background',formData, {headers: {Authorization: `Bearer ${await getToken()}`}})

//          if (data.success) {
//           setContent(data.content)
//          }else{
//           toast.error(data.message)
//          }
//         } catch (error) {
//           toast.error(error.message)
//         }
//         setLoading(false)
//       }

//   return (
//     <div className='min-h-full p-6 bg-gradient-to-br from-slate-50 via-orange-50 to-red-50'>
//       {/* Background decorative elements */}
//       <div className='absolute inset-0 overflow-hidden pointer-events-none'>
//         <div className='absolute top-1/4 left-1/4 w-72 h-72 bg-orange-400/5 rounded-full blur-3xl animate-pulse'></div>
//         <div className='absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-400/5 rounded-full blur-3xl animate-pulse delay-1000'></div>
//         <div className='absolute top-1/2 right-1/3 w-48 h-48 bg-pink-400/5 rounded-full blur-2xl animate-pulse delay-500'></div>
//       </div>

//       <div className='relative z-10 max-w-7xl mx-auto'>
//         {/* Header Section */}
//         <div className='text-center mb-8'>
//           <div className='flex items-center justify-center gap-3 mb-4'>
//             <div className='p-3 bg-white/20 backdrop-blur-sm rounded-2xl border border-white/30 shadow-lg'>
//               <Eraser className='w-8 h-8 text-red-600' />
//             </div>
//           </div>
//           <h1 className='text-4xl md:text-5xl font-bold text-gray-900 mb-4'>
//             AI Background <span className="bg-gradient-to-r from-red-600 via-orange-600 to-pink-600 bg-clip-text text-transparent">Remover</span>
//           </h1>
//           <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
//             Remove backgrounds from your images instantly with AI precision
//           </p>
//         </div>

//         <div className='flex flex-col lg:flex-row items-start gap-8'>
//           {/* Left Column - Upload */}
//           <div className='w-full lg:w-96 lg:flex-shrink-0'>
//             <form onSubmit={onSubmitHandler} className='bg-white/70 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-8'>
//               <div className='flex items-center gap-3 mb-8'>
//                 <div className='p-2 bg-red-100 rounded-xl'>
//                   <Upload className='w-5 h-5 text-red-600' />
//                 </div>
//                 <h2 className='text-2xl font-bold text-gray-900'>Upload Image</h2>
//               </div>
              
//               <div className='space-y-6'>
//                 {/* File Upload Area */}
//                 <div>
//                   <label className='block text-sm font-semibold text-gray-700 mb-3'>Select Image</label>
//                   <div
//                     className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-200 ${
//                       dragActive 
//                         ? 'border-red-400 bg-red-50' 
//                         : selectedImage 
//                           ? 'border-green-400 bg-green-50' 
//                           : 'border-gray-300 hover:border-gray-400'
//                     }`}
//                     onDragEnter={handleDrag}
//                     onDragLeave={handleDrag}
//                     onDragOver={handleDrag}
//                     onDrop={handleDrop}
//                   >
//                     <input
//                       ref={fileInputRef}
//                       type="file"
//                       accept="image/*"
//                       onChange={handleFileInputChange}
//                       className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//                     />
                    
//                     {selectedImage ? (
//                       <div className='space-y-4'>
//                         <div className='w-20 h-20 mx-auto rounded-xl overflow-hidden shadow-lg'>
//                           <img 
//                             src={selectedImage.preview} 
//                             alt="Selected" 
//                             className='w-full h-full object-cover'
//                           />
//                         </div>
//                         <div>
//                           <p className='font-medium text-green-700'>{selectedImage.name}</p>
//                           <p className='text-sm text-green-600'>{formatFileSize(selectedImage.size)}</p>
//                         </div>
//                       </div>
//                     ) : (
//                       <div className='space-y-4'>
//                         <div className='w-16 h-16 mx-auto bg-gray-100 rounded-2xl flex items-center justify-center'>
//                           <Upload className='w-8 h-8 text-gray-400' />
//                         </div>
//                         <div>
//                           <p className='text-lg font-medium text-gray-900'>
//                             {dragActive ? 'Drop image here' : 'Drop image or click to upload'}
//                           </p>
//                           <p className='text-sm text-gray-500 mt-2'>
//                             Supports JPG, PNG, WebP up to 10MB
//                           </p>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 <button 
//                   type="submit"
//                   disabled={isProcessing || !selectedImage}
//                   className="w-full flex justify-center items-center gap-3 bg-gradient-to-r from-red-600 to-orange-600 text-white px-6 py-4 rounded-2xl font-semibold text-lg hover:from-red-700 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
//                 >
//                   {isProcessing ? (
//                     <>
//                       <RefreshCw className="w-5 h-5 animate-spin" />
//                       Removing Background...
//                     </>
//                   ) : (
//                     <>
//                       <Sparkles className="w-5 h-5" /> 
//                       Remove Background
//                     </>
//                   )}
//                 </button>
//               </div>
//             </form> 
//           </div>

//           {/* Right Column - Result */}
//           <div className='flex-1 min-w-0 bg-white/70 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl min-h-[600px] flex flex-col'>
//             {/* Header */}
//             <div className='flex items-center justify-between p-8 border-b border-gray-100'>
//               <div className='flex items-center gap-3'>
//                 <div className='p-2 bg-green-100 rounded-xl'>
//                   <ImageIcon className='w-5 h-5 text-green-600' />
//                 </div>
//                 <h2 className='text-2xl font-bold text-gray-900'>Processed Image</h2>
//               </div>
              
//               {processedImage && (
//                 <div className='flex items-center gap-2'>
//                   <button
//                     onClick={downloadImage}
//                     className='p-3 bg-green-100 hover:bg-green-200 text-green-600 rounded-xl transition-colors duration-200'
//                     title='Download image'
//                   >
//                     <Download className='w-4 h-4' />
//                   </button>
//                   <button
//                     onClick={shareImage}
//                     className='p-3 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-xl transition-colors duration-200'
//                     title='Share image'
//                   >
//                     <Share2 className='w-4 h-4' />
//                   </button>
//                   <button
//                     onClick={processNewImage}
//                     className='p-3 bg-orange-100 hover:bg-orange-200 text-orange-600 rounded-xl transition-colors duration-200'
//                     title='Process new image'
//                   >
//                     <RefreshCw className='w-4 h-4' />
//                   </button>
//                 </div>
//               )}
//             </div>
            
//             {/* Content Area */}
//             <div className='flex-1 overflow-hidden'>
//               {processedImage ? (
//                 <div className='h-full p-8'>
//                   <div className='h-full flex flex-col'>
//                     {/* Before/After Comparison */}
//                     <div className='flex-1 grid md:grid-cols-2 gap-6'>
//                       <div className='space-y-3'>
//                         <h3 className='font-semibold text-gray-900 text-center'>Original</h3>
//                         <div className='bg-gray-50 rounded-2xl p-4 h-full flex items-center justify-center'>
//                           <img 
//                             src={selectedImage.preview} 
//                             alt="Original" 
//                             className='max-w-full max-h-full object-contain rounded-xl shadow-md'
//                           />
//                         </div>
//                       </div>
//                       <div className='space-y-3'>
//                         <h3 className='font-semibold text-gray-900 text-center'>Background Removed</h3>
//                         <div className='bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-4 h-full flex items-center justify-center relative'>
//                           {/* Transparent background pattern */}
//                           <div className='absolute inset-4 opacity-20' style={{
//                             backgroundImage: `conic-gradient(#f3f4f6 0deg, #f3f4f6 90deg, #e5e7eb 90deg, #e5e7eb 180deg, #f3f4f6 180deg, #f3f4f6 270deg, #e5e7eb 270deg)`,
//                             backgroundSize: '20px 20px'
//                           }}></div>
//                           <img 
//                             src={processedImage.url} 
//                             alt="Processed" 
//                             className='max-w-full max-h-full object-contain rounded-xl shadow-md relative z-10'
//                           />
//                         </div>
//                       </div>
//                     </div>
                    
//                     <div className='mt-6 bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-4 border border-red-100'>
//                       <div className='flex items-center gap-3 mb-2'>
//                         <Eraser className='w-4 h-4 text-red-600' />
//                         <span className='font-semibold text-gray-900'>Processing Complete</span>
//                       </div>
//                       <div className='text-sm space-y-1'>
//                         <div><span className='font-medium'>Original:</span> {processedImage.originalName}</div>
//                         <div><span className='font-medium'>Processed:</span> {new Date(processedImage.timestamp).toLocaleString()}</div>
//                         <div><span className='font-medium'>Format:</span> PNG with transparent background</div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ) : (
//                 <div className='h-full flex items-center justify-center p-8'>
//                   <div className='text-center max-w-sm'>
//                     <div className='p-6 bg-gray-100 rounded-full w-fit mx-auto mb-6'>
//                       <Eraser className='w-12 h-12 text-gray-400' />
//                     </div>
//                     <h3 className='text-xl font-semibold text-gray-900 mb-3'>Ready to Remove</h3>
//                     <p className='text-gray-600 leading-relaxed'>
//                       Upload an image to automatically remove its background using AI technology
//                     </p>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default RemoveBackground

import React, { useState, useRef } from 'react';
import {
  Eraser,
  Sparkles,
  Download,
  Share2,
  RefreshCw,
  Upload,
  Image as ImageIcon,
} from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '@clerk/clerk-react';

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || 'http://localhost:3000',
});

function formatFileSize(bytes = 0) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

const RemoveBackground = () => {
  const [selectedImage, setSelectedImage] = useState(null); // { file, name, size, preview }
  const [processedImage, setProcessedImage] = useState(null); // { url, originalName, timestamp }
  const [isProcessing, setIsProcessing] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const { getToken, isSignedIn } = useAuth();

  const setPreviewFromFile = (file) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file.');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.error('Max file size is 10MB.');
      return;
    }
    // cleanup old preview
    if (selectedImage?.preview) URL.revokeObjectURL(selectedImage.preview);
    setSelectedImage({
      file,
      name: file.name,
      size: file.size,
      preview: URL.createObjectURL(file),
    });
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files?.[0];
    setPreviewFromFile(file);
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
    const file = e.dataTransfer?.files?.[0];
    setPreviewFromFile(file);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!isSignedIn) {
      toast.error('Please sign in first.');
      return;
    }
    if (!selectedImage?.file) {
      toast.error('Please choose an image.');
      return;
    }
    if (isProcessing) return;

    try {
      setIsProcessing(true);

      const formData = new FormData();
      formData.append('image', selectedImage.file);

      const token = await getToken();
      const { data } = await api.post('/api/ai/remove-image-background', formData, {
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
          'Content-Type': 'multipart/form-data',
        },
      });

      if (data?.success) {
        const url = data.content || data.url; // backend may return content or url
        setProcessedImage({
          url,
          originalName: selectedImage.name,
          timestamp: Date.now(),
        });
        toast.success('Background removed!');
      } else {
        toast.error(data?.message || 'Failed to process image.');
      }
    } catch (err) {
      const msg = err?.response?.data?.message || err?.message || 'Request failed';
      toast.error(msg);
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadImage = async () => {
    if (!processedImage?.url) return;
    try {
      const res = await fetch(processedImage.url, { mode: 'cors' });
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'background-removed.png';
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch {
      window.open(processedImage.url, '_blank', 'noopener');
    }
  };

  const shareImage = async () => {
    if (!processedImage?.url) return;
    try {
      if (navigator.share) {
        await navigator.share({ title: 'Processed image', url: processedImage.url });
      } else {
        await navigator.clipboard.writeText(processedImage.url);
        toast.success('Image link copied to clipboard.');
      }
    } catch {
      /* user canceled share */
    }
  };

  const processNewImage = () => {
    setProcessedImage(null);
    fileInputRef.current?.click();
  };

  return (
    <div className="min-h-full p-6 bg-gradient-to-br from-slate-50 via-orange-50 to-red-50">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-orange-400/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-400/5 rounded-3xl blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-pink-400/5 rounded-2xl blur-2xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl border border-white/30 shadow-lg">
              <Eraser className="w-8 h-8 text-red-600" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            AI Background{' '}
            <span className="bg-gradient-to-r from-red-600 via-orange-600 to-pink-600 bg-clip-text text-transparent">
              Remover
            </span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Remove backgrounds from your images instantly with AI precision
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-start gap-8">
          {/* Left: Upload */}
          <div className="w-full lg:w-96 lg:flex-shrink-0">
            <form
              onSubmit={onSubmitHandler}
              className="bg-white/70 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-8"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-red-100 rounded-xl">
                  <Upload className="w-5 h-5 text-red-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Upload Image</h2>
              </div>

              <div className="space-y-6">
                {/* Drop zone */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Select Image
                  </label>
                  <div
                    className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-200 ${
                      dragActive
                        ? 'border-red-400 bg-red-50'
                        : selectedImage
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
                      accept="image/*"
                      onChange={handleFileInputChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />

                    {selectedImage ? (
                      <div className="space-y-4">
                        <div className="w-20 h-20 mx-auto rounded-xl overflow-hidden shadow-lg">
                          <img
                            src={selectedImage.preview}
                            alt="Selected"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium text-green-700">{selectedImage.name}</p>
                          <p className="text-sm text-green-600">
                            {formatFileSize(selectedImage.size)}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="w-16 h-16 mx-auto bg-gray-100 rounded-2xl flex items-center justify-center">
                          <Upload className="w-8 h-8 text-gray-400" />
                        </div>
                        <div>
                          <p className="text-lg font-medium text-gray-900">
                            {dragActive ? 'Drop image here' : 'Drop image or click to upload'}
                          </p>
                          <p className="text-sm text-gray-500 mt-2">
                            Supports JPG, PNG, WebP up to 10MB
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing || !selectedImage}
                  className="w-full flex justify-center items-center gap-3 bg-gradient-to-r from-red-600 to-orange-600 text-white px-6 py-4 rounded-2xl font-semibold text-lg hover:from-red-700 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  {isProcessing ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      Removing Background...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      Remove Background
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Right: Result */}
          <div className="flex-1 min-w-0 bg-white/70 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl min-h-[600px] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-8 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-xl">
                  <ImageIcon className="w-5 h-5 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Processed Image</h2>
              </div>

              {processedImage && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={downloadImage}
                    className="p-3 bg-green-100 hover:bg-green-200 text-green-600 rounded-xl transition-colors duration-200"
                    title="Download image"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                  <button
                    onClick={shareImage}
                    className="p-3 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-xl transition-colors duration-200"
                    title="Share image"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={processNewImage}
                    className="p-3 bg-orange-100 hover:bg-orange-200 text-orange-600 rounded-xl transition-colors duration-200"
                    title="Process new image"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Body */}
            <div className="flex-1 overflow-hidden">
              {processedImage ? (
                <div className="h-full p-8">
                  <div className="h-full flex flex-col">
                    <div className="flex-1 grid md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <h3 className="font-semibold text-gray-900 text-center">Original</h3>
                        <div className="bg-gray-50 rounded-2xl p-4 h-full flex items-center justify-center">
                          <img
                            src={selectedImage.preview}
                            alt="Original"
                            className="max-w-full max-h-full object-contain rounded-xl shadow-md"
                          />
                        </div>
                      </div>
                      <div className="space-y-3">
                        <h3 className="font-semibold text-gray-900 text-center">
                          Background Removed
                        </h3>
                        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-4 h-full flex items-center justify-center relative">
                          {/* checkerboard */}
                          <div
                            className="absolute inset-4 opacity-20"
                            style={{
                              backgroundImage:
                                'conic-gradient(#f3f4f6 0deg, #f3f4f6 90deg, #e5e7eb 90deg, #e5e7eb 180deg, #f3f4f6 180deg, #f3f4f6 270deg, #e5e7eb 270deg)',
                              backgroundSize: '20px 20px',
                            }}
                          />
                          <img
                            src={processedImage.url}
                            alt="Processed"
                            className="max-w-full max-h-full object-contain rounded-xl shadow-md relative z-10"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-4 border border-red-100">
                      <div className="flex items-center gap-3 mb-2">
                        <Eraser className="w-4 h-4 text-red-600" />
                        <span className="font-semibold text-gray-900">Processing Complete</span>
                      </div>
                      <div className="text-sm space-y-1">
                        <div>
                          <span className="font-medium">Original:</span>{' '}
                          {processedImage.originalName}
                        </div>
                        <div>
                          <span className="font-medium">Processed:</span>{' '}
                          {new Date(processedImage.timestamp).toLocaleString()}
                        </div>
                        <div>
                          <span className="font-medium">Format:</span> PNG with transparent
                          background
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-full flex items-center justify-center p-8">
                  <div className="text-center max-w-sm">
                    <div className="p-6 bg-gray-100 rounded-full w-fit mx-auto mb-6">
                      <Eraser className="w-12 h-12 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Ready to Remove</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Upload an image to automatically remove its background using AI technology
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
  );
};

export default RemoveBackground;
