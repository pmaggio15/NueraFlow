import { useUser, useAuth } from '@clerk/clerk-react'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Heart, Users, Sparkles, TrendingUp } from 'lucide-react'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

const Community = () => {
  const [creations, setCreations] = useState([])
  const [loading, setLoading] = useState(true)
  const { user } = useUser()
  const { getToken } = useAuth()

  const fetchCreations = async () => {
    try {
      const token = await getToken()
      const { data } = await axios.get('/api/user/get-published-creations', {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      })
      if (data?.success) {
        setCreations(data.creations || [])
      } else {
        toast.error(data?.message || 'Failed to fetch creations')
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message || 'Request failed')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (user) {
      fetchCreations()
    }
  }, [user])

  const handleLike = async (creationId) => {
    try {
      const token = await getToken()
      const { data } = await axios.post(
        '/api/user/toggle-like-creation',
        { id: creationId },
        { headers: token ? { Authorization: `Bearer ${token}` } : {} }
      )
      if (data?.success) {
        await fetchCreations()
        toast.success(data.message || 'Updated')
      } else {
        toast.error(data?.message || 'Could not update like')
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message || 'Request failed')
    }
  }

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
              <Users className='w-8 h-8 text-purple-600' />
            </div>
          </div>
          <h1 className='text-4xl md:text-5xl font-bold text-gray-900 mb-4'>
            Community <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">Creations</span>
          </h1>
          <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
            Discover and explore amazing AI-generated content from our community
          </p>
        </div>

        {/* Stats Bar */}
        <div className='bg-white/70 backdrop-blur-xl rounded-3xl border border-white/20 shadow-lg p-6 mb-8'>
          <div className='flex items-center justify-center gap-8 text-center'>
            <div className='flex items-center gap-3'>
              <div className='p-2 bg-purple-100 rounded-xl'>
                <Sparkles className='w-5 h-5 text-purple-600' />
              </div>
              <div>
                <p className='text-sm text-gray-600'>Total Creations</p>
                <p className='text-xl font-bold text-gray-900'>{creations.length}</p>
              </div>
            </div>
            <div className='flex items-center gap-3'>
              <div className='p-2 bg-pink-100 rounded-xl'>
                <Heart className='w-5 h-5 text-pink-600' />
              </div>
              <div>
                <p className='text-sm text-gray-600'>Total Likes</p>
                <p className='text-xl font-bold text-gray-900'>
                  {creations.reduce((total, creation) => total + (creation.likes?.length || 0), 0)}
                </p>
              </div>
            </div>
            <div className='flex items-center gap-3'>
              <div className='p-2 bg-blue-100 rounded-xl'>
                <TrendingUp className='w-5 h-5 text-blue-600' />
              </div>
              <div>
                <p className='text-sm text-gray-600'>Categories</p>
                <p className='text-xl font-bold text-gray-900'>
                  {[...new Set(creations.map(c => c.type))].length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Creations Grid */}
        <div className='bg-white/70 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl min-h-[600px]'>
          {/* Grid Header */}
          <div className='p-8 border-b border-gray-100'>
            <div className='flex items-center gap-3'>
              <div className='p-2 bg-green-100 rounded-xl'>
                <Sparkles className='w-5 h-5 text-green-600' />
              </div>
              <h2 className='text-2xl font-bold text-gray-900'>Featured Creations</h2>
            </div>
          </div>

          {/* Grid Content */}
          <div className='p-8'>
            {loading ? (
              <div className='h-96 flex items-center justify-center'>
                <span className='w-10 h-10 my-1 rounded-full border-4 border-gray-300 border-t-transparent animate-spin'></span>
              </div>
            ) : creations.length > 0 ? (
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                {creations.map((creation, index) => (
                  <div key={creation.id || index} className='group relative bg-white/60 rounded-2xl overflow-hidden border border-gray-100 hover:border-gray-200 transition-all duration-300 hover:shadow-xl hover:scale-105'>
                    {/* Image Container with fixed aspect ratio */}
                    <div className='relative aspect-square overflow-hidden'>
                      <img 
                        src={creation.image || creation.content} 
                        alt={creation.prompt || "AI Creation"} 
                        className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-110' 
                      />
                      
                      {/* Overlay */}
                      <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                        <div className='absolute bottom-0 left-0 right-0 p-4'>
                          <p className='text-white text-sm font-medium line-clamp-2 mb-3'>
                            {creation.prompt}
                          </p>
                          
                          {/* Action Bar */}
                          <div className='flex items-center justify-between'>
                            <div className='flex items-center gap-2'>
                              <span className='px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs text-white font-medium'>
                                {creation.type?.replace('-', ' ') || 'Creation'}
                              </span>
                            </div>
                            
                            <button
                              onClick={() => handleLike(creation.id)}
                              className='flex items-center gap-1 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1.5 hover:bg-white/30 transition-colors duration-200'
                            >
                              <span className='text-white text-sm font-medium'>
                                {creation.likes?.length || 0}
                              </span>
                              <Heart 
                                className={`w-4 h-4 transition-all duration-200 ${
                                  creation.likes?.includes(user?.id) 
                                    ? 'fill-red-500 text-red-500' 
                                    : 'text-white hover:text-red-300'
                                }`} 
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Card Footer */}
                    <div className='p-4'>
                      <div className='flex items-center justify-between'>
                        <div className='text-xs text-gray-500'>
                          {new Date(creation.createdAt || creation.created_at).toLocaleDateString()}
                        </div>
                        <div className='flex items-center gap-1 text-gray-400'>
                          <Heart className='w-3 h-3' />
                          <span className='text-xs'>{creation.likes?.length || 0}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className='h-96 flex items-center justify-center'>
                <div className='text-center max-w-sm'>
                  <div className='p-6 bg-gray-100 rounded-full w-fit mx-auto mb-6'>
                    <Users className='w-12 h-12 text-gray-400' />
                  </div>
                  <h3 className='text-xl font-semibold text-gray-900 mb-3'>No Creations Yet</h3>
                  <p className='text-gray-600 leading-relaxed'>
                    Be the first to share your AI creations with the community!
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Community