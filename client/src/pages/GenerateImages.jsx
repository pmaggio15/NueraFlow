import React, { useState } from 'react';
import {
  Image as ImageIcon,
  Sparkles,
  Download,
  Share2,
  RefreshCw,
  Palette,
  Wand2,
} from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '@clerk/clerk-react';

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || 'http://localhost:3000',
  headers: { 'Content-Type': 'application/json' },
});

const GenerateImages = () => {
  const imageStyles = [
    { name: 'Realistic', desc: 'Photo-realistic images', icon: '📸' },
    { name: 'Anime', desc: 'Japanese animation style', icon: '🎌' },
    { name: 'Cartoon', desc: 'Fun cartoon style', icon: '🎨' },
    { name: 'Fantasy', desc: 'Magical and mystical', icon: '🧙‍♂️' },
    { name: '3D Render', desc: '3D rendered graphics', icon: '🔮' },
    { name: 'Portrait', desc: 'Professional portraits', icon: '👤' },
  ];

  // Default to first style to avoid null .name access
  const [selectedStyle, setSelectedStyle] = useState(imageStyles[0]);
  const [input, setInput] = useState('');
  const [generatedImage, setGeneratedImage] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [makePublic, setMakePublic] = useState(false);

  const { getToken, isSignedIn } = useAuth();

  const generate = async () => {
    if (!input.trim()) {
      toast.error('Please describe your image.');
      return;
    }
    if (!selectedStyle?.name) {
      toast.error('Please select an art style.');
      return;
    }
    if (isGenerating) return;

    setIsGenerating(true);
    try {
      const prompt = `Generate an image of ${input} in the style ${selectedStyle.name}.`;
      const token = await getToken();
      const headers = token ? { Authorization: `Bearer ${token}` } : undefined;

      const { data } = await api.post(
        '/api/ai/generate-image',
        { prompt, publish: makePublic },
        { headers }
      );

      if (data?.success) {
        setGeneratedImage(data.content ?? '');
      } else {
        toast.error(data?.message || 'Failed to generate image.');
      }
    } catch (err) {
      const msg = err?.response?.data?.message || err?.message || 'Request failed';
      toast.error(msg);
    } finally {
      setIsGenerating(false);
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!isSignedIn) {
      toast.error('Please sign in to generate images.');
      return;
    }
    await generate();
  };

  const downloadImage = async () => {
    if (!generatedImage) return;
    try {
      // robust cross-origin download
      const res = await fetch(generatedImage, { mode: 'cors' });
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'generated-image.png';
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch {
      // fallback
      window.open(generatedImage, '_blank', 'noopener');
    }
  };

  const shareImage = async () => {
    if (!generatedImage) return;
    try {
      if (navigator.share) {
        await navigator.share({ title: 'Generated image', url: generatedImage });
      } else {
        await navigator.clipboard.writeText(generatedImage);
        toast.success('Image link copied to clipboard.');
      }
    } catch {
      /* user canceled share */
    }
  };

  const regenerateImage = async () => {
    if (isGenerating) return;
    await generate();
  };

  return (
    <div className="min-h-full p-6 bg-gradient-to-br from-slate-50 via-green-50 to-blue-50">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-green-400/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-purple-400/5 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl border border-white/30 shadow-lg">
              <Wand2 className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            AI Image{' '}
            <span className="bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              Generator
            </span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Transform your imagination into stunning visuals with the power of AI
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-start gap-8">
          {/* Left Column - Configuration */}
          <div className="w-full lg:w-96 lg:flex-shrink-0">
            <form
              onSubmit={onSubmitHandler}
              className="bg-white/70 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-8"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-green-100 rounded-xl">
                  <Palette className="w-5 h-5 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Create Settings</h2>
              </div>

              <div className="space-y-8">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Describe Your Image
                  </label>
                  <textarea
                    rows={4}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="w-full p-4 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none text-gray-900 placeholder-gray-500 transition-all duration-200 resize-none"
                    placeholder="A futuristic cityscape at sunset with flying cars and neon lights..."
                    required
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Be detailed and specific for best results
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-4">
                    Art Style
                  </label>

                  {/* Quick picks */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    {imageStyles.slice(0, 4).map((style) => (
                      <button
                        type="button"
                        key={style.name}
                        onClick={() => setSelectedStyle(style)}
                        className={`flex items-center gap-2 p-3 rounded-xl transition-all duration-200 text-left ${
                          selectedStyle?.name === style.name
                            ? 'bg-green-50 border border-green-200 shadow-sm'
                            : 'hover:bg-gray-50 border border-gray-200'
                        }`}
                      >
                        <div
                          className={`w-3 h-3 rounded-full border-2 ${
                            selectedStyle?.name === style.name
                              ? 'bg-green-500 border-green-500'
                              : 'border-gray-300'
                          }`}
                        >
                          {selectedStyle?.name === style.name && (
                            <div className="w-1.5 h-1.5 bg-white rounded-full m-0.5"></div>
                          )}
                        </div>
                        <span className="text-sm">{style.icon}</span>
                        <div className="flex-1 min-w-0">
                          <div
                            className={`text-xs font-medium truncate ${
                              selectedStyle?.name === style.name
                                ? 'text-green-700'
                                : 'text-gray-700'
                            }`}
                          >
                            {style.name}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Full list */}
                  <div className="relative">
                    <select
                      value={selectedStyle?.name || ''}
                      onChange={(e) => {
                        const val = e.target.value;
                        setSelectedStyle(imageStyles.find((s) => s.name === val) || null);
                      }}
                      className="w-full p-3 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none text-gray-900 transition-all duration-200"
                    >
                      <option value="">Select Art Style & Quality</option>
                      <optgroup label="Popular Styles">
                        {imageStyles.slice(0, 4).map((style) => (
                          <option key={style.name} value={style.name}>
                            {style.icon} {style.name} — {style.desc}
                          </option>
                        ))}
                      </optgroup>
                      <optgroup label="Additional Styles">
                        {imageStyles.slice(4).map((style) => (
                          <option key={style.name} value={style.name}>
                            {style.icon} {style.name} — {style.desc}
                          </option>
                        ))}
                      </optgroup>
                    </select>
                  </div>
                </div>

                {/* Public Toggle */}
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-2xl border border-blue-100">
                  <div className="flex items-center gap-3">
                    <Share2 className="w-5 h-5 text-blue-600" />
                    <div>
                      <div className="font-medium text-gray-900">Make Public</div>
                      <div className="text-xs text-gray-600">Share with the community</div>
                    </div>
                  </div>
                  <label className="relative cursor-pointer">
                    <input
                      type="checkbox"
                      onChange={(e) => setMakePublic(e.target.checked)}
                      checked={makePublic}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-300 rounded-full peer-checked:bg-green-500 transition-colors duration-200"></div>
                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 peer-checked:translate-x-5 shadow-sm"></div>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isGenerating || !input.trim() || !selectedStyle?.name}
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
          <div className="w-full max-w-lg bg-white rounded-lg flex flex-col border border-gray-200 min-h-96 overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-xl">
                  <ImageIcon className="w-5 h-5 text-[#00AD25]" />
                </div>
                <h2 className="text-xl font-semibold">Generated image</h2>
              </div>

              {generatedImage && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={downloadImage}
                    className="p-3 bg-green-100 hover:bg-green-200 text-green-600 rounded-xl transition-colors"
                    title="Download image"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                  <button
                    onClick={shareImage}
                    className="p-3 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-xl transition-colors"
                    title="Share image"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={regenerateImage}
                    disabled={isGenerating}
                    className="p-3 bg-purple-100 hover:bg-purple-200 disabled:opacity-50 text-purple-600 rounded-xl transition-colors"
                    title="Generate new image"
                  >
                    <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
                  </button>
                </div>
              )}
            </div>

            {/* Body */}
            <div className="flex-1 flex items-center justify-center p-4">
              {isGenerating ? (
                <div className="flex items-center gap-3 text-gray-500">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Generating image…</span>
                </div>
              ) : generatedImage ? (
                <img
                  src={generatedImage}
                  alt="Generated"
                  className="w-full h-auto object-contain rounded-md"
                />
              ) : (
                <div className="text-sm flex flex-col items-center gap-5 text-gray-400 py-10">
                  <ImageIcon className="w-9 h-9" />
                  <p>Enter a topic and click “Generate image” to get started</p>
                </div>
              )}
            </div>
          </div>
          {/* /Right Column */}
        </div>
      </div>
    </div>
  );
};

export default GenerateImages;
