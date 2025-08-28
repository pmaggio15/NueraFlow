import React, { useState, useRef } from 'react';
import {
  Scissors,
  Sparkles,
  Download,
  Share2,
  RefreshCw,
  Upload,
  Image as ImageIcon,
  Target,
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

const objectExamples = [
  { name: 'Person',    example: 'person in red shirt' },
  { name: 'Logo',      example: 'brand logo on top-right' },
  { name: 'Cup',       example: 'coffee cup on table' },
  { name: 'Sign',      example: 'no parking sign' },
];

const RemoveObject = () => {
  // Image & form state
  const [selectedImage, setSelectedImage] = useState(null);   // { file, name, size, preview }
  const [objectDescription, setObjectDescription] = useState('');
  // Result
  const [processedImage, setProcessedImage] = useState(null); // { url, originalName, removedObject, timestamp }
  // UI state
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

  const setExampleDescription = (text) => setObjectDescription(text);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!isSignedIn) {
      toast.error('Please sign in first.');
      return;
    }
    if (!selectedImage?.file) {
      toast.error('Please upload an image.');
      return;
    }
    if (!objectDescription.trim()) {
      toast.error('Please describe the object to remove.');
      return;
    }
    if (isProcessing) return;

    try {
      setIsProcessing(true);

      const formData = new FormData();
      formData.append('image', selectedImage.file);
      formData.append('object', objectDescription);

      const token = await getToken();
      const { data } = await api.post('/api/ai/remove-image-object', formData, {
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
          'Content-Type': 'multipart/form-data',
        },
      });

      if (data?.success) {
        const url = data.content || data.url;
        setProcessedImage({
          url,
          originalName: selectedImage.name,
          removedObject: objectDescription,
          timestamp: Date.now(),
        });
        toast.success('Object removed!');
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
      a.download = 'object-removed.png';
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
      
    }
  };

  const processNewImage = () => {
    setProcessedImage(null);
    setObjectDescription('');
    fileInputRef.current?.click();
  };

  return (
    <div className="min-h-full p-6 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-400/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-400/5 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-cyan-400/5 rounded-full blur-2xl animate-pulse delay-500" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl border border-white/30 shadow-lg">
              <Scissors className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            AI Object{' '}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
              Remover
            </span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Remove any object from your images with precision AI technology
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-start gap-8">
          {/* Left: Configuration */}
          <div className="w-full lg:w-96 lg:flex-shrink-0">
            <form
              onSubmit={onSubmitHandler}
              className="bg-white/70 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-8"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-blue-100 rounded-xl">
                  <Target className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Remove Settings</h2>
              </div>

              <div className="space-y-8">
                {/* File Upload Area */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Upload Image
                  </label>
                  <div
                    className={`relative border-2 border-dashed rounded-2xl p-6 text-center transition-all duration-200 ${
                      dragActive
                        ? 'border-blue-400 bg-blue-50'
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
                      <div className="space-y-3">
                        <div className="w-16 h-16 mx-auto rounded-xl overflow-hidden shadow-md">
                          <img
                            src={selectedImage.preview}
                            alt="Selected"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium text-green-700 text-sm">
                            {selectedImage.name}
                          </p>
                          <p className="text-xs text-green-600">
                            {formatFileSize(selectedImage.size)}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="w-12 h-12 mx-auto bg-gray-100 rounded-2xl flex items-center justify-center">
                          <Upload className="w-6 h-6 text-gray-400" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {dragActive ? 'Drop image here' : 'Click or drag to upload'}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            JPG, PNG, WebP up to 10MB
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Object Description */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Object to Remove
                  </label>
                  <textarea
                    value={objectDescription}
                    onChange={(e) => setObjectDescription(e.target.value)}
                    rows={3}
                    className="w-full p-4 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900 placeholder-gray-500 transition-all duration-200 resize-none"
                    placeholder='Describe the object (e.g., "person in red shirt", "coffee cup on table")'
                    required
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Be specific about the object’s location and appearance
                  </p>
                </div>

                {/* Quick Examples */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Quick Examples
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {objectExamples.map((item, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => setExampleDescription(item.example)}
                        className="text-left p-3 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-xl transition-colors duration-200"
                      >
                        <div className="text-xs font-medium text-blue-700">{item.name}</div>
                        <div className="text-xs text-blue-600 truncate">{item.example}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing || !selectedImage || !objectDescription.trim()}
                  className="w-full flex justify-center items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-4 rounded-2xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  {isProcessing ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      Removing Object...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      Remove Object
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
                <h2 className="text-2xl font-bold text-gray-900">Processed Result</h2>
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
                    className="p-3 bg-purple-100 hover:bg-purple-200 text-purple-600 rounded-xl transition-colors duration-200"
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
                    {/* Before/After */}
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
                        <h3 className="font-semibold text-gray-900 text-center">Object Removed</h3>
                        <div className="bg-gray-50 rounded-2xl p-4 h-full flex items-center justify-center">
                          <img
                            src={processedImage.url}
                            alt="Processed"
                            className="max-w-full max-h-full object-contain rounded-xl shadow-md"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-4 border border-blue-100">
                      <div className="flex items-center gap-3 mb-2">
                        <Scissors className="w-4 h-4 text-blue-600" />
                        <span className="font-semibold text-gray-900">Processing Complete</span>
                      </div>
                      <div className="text-sm space-y-1">
                        <div>
                          <span className="font-medium">Original:</span> {processedImage.originalName}
                        </div>
                        <div>
                          <span className="font-medium">Removed:</span> {processedImage.removedObject}
                        </div>
                        <div>
                          <span className="font-medium">Processed:</span>{' '}
                          {new Date(processedImage.timestamp).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-full flex items-center justify-center p-8">
                  <div className="text-center max-w-sm">
                    <div className="p-6 bg-gray-100 rounded-full w-fit mx-auto mb-6">
                      <Scissors className="w-12 h-12 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Ready to Remove</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Upload an image and describe the object you want to remove using AI precision
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RemoveObject;
