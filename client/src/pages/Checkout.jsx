import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'
import { ArrowLeft, CreditCard, Shield, Check, ChevronDown, ChevronUp } from 'lucide-react'

const Checkout = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { user } = useUser()
  const [isProcessing, setIsProcessing] = useState(false)
  const [showTestCard, setShowTestCard] = useState(false)
  
  const { plan = 'premium', price = 25, features = [] } = location.state || {}
  const [formData, setFormData] = useState({
    email: '',
    cardNumber: '',
    expiryDate: '',
    cvc: '',
    name: '',
    country: 'US'
  })

  // Set to false for production checkout flow, true for testing
  const isTestingMode = false

  // Auto-fill user data from Clerk when component mounts
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        email: user.primaryEmailAddress?.emailAddress || '',
        name: user.fullName || `${user.firstName || ''} ${user.lastName || ''}`.trim() || ''
      }))
    }
  }, [user])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsProcessing(true)

    console.log('Checkout - isTestingMode:', isTestingMode)

    if (isTestingMode) {
      console.log('In testing mode - updating plan immediately')
      // In testing mode, immediately update the plan and go to dashboard
      try {
        await user.update({
          unsafeMetadata: {
            ...user.unsafeMetadata,
            plan: 'premium',
            subscriptionDate: new Date().toISOString(),
            subscriptionStatus: 'active',
            testingMode: true
          }
        })
        
        console.log('Plan updated in checkout, navigating to dashboard')
        
        // Simulate processing delay for UX
        setTimeout(() => {
          setIsProcessing(false)
          navigate('/ai') // Go directly to dashboard in testing mode
        }, 1500)
        
      } catch (error) {
        console.error('Error updating plan in testing mode:', error)
        setIsProcessing(false)
      }
    } else {
      console.log('In production mode - going to success page')
      // Production mode - simulate payment processing then go to success page
      setTimeout(() => {
        setIsProcessing(false)
        navigate('/success') // Go to success page in production
      }, 2000)
    }
  }

  const handleBack = () => {
    navigate(-1)
  }

  // If plan is free, show free plan confirmation
  if (plan === 'free') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center py-12 px-4">
        <div className="max-w-lg w-full">
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">You're All Set!</h1>
            <p className="text-gray-600 mb-8">You're now on the free plan and can start using our AI tools immediately.</p>
            <button 
              onClick={() => navigate('/ai')}
              className="w-full py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-colors"
            >
              Continue to Dashboard
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button 
          onClick={handleBack}
          className="flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to plans</span>
        </button>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20 h-fit">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
            
            <div className="bg-gray-50 rounded-2xl p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900 capitalize">{plan} Plan</h3>
                <span className="text-2xl font-bold text-gray-900">${price}/mo</span>
              </div>
              
              <div className="space-y-3">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Total</span>
                <span>${price}.00/month</span>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Billed monthly. Cancel anytime.
              </p>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-xl">
              <div className="flex items-center gap-2 text-blue-700 mb-2">
                <Shield className="w-5 h-5" />
                <span className="font-semibold">30-Day Money Back Guarantee</span>
              </div>
              <p className="text-blue-600 text-sm">
                Not satisfied? Get a full refund within 30 days.
              </p>
            </div>
          </div>
          
          {/* Payment Form */}
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20">
            <div className="flex items-center gap-2 mb-6">
              <CreditCard className="w-6 h-6 text-gray-700" />
              <h2 className="text-2xl font-bold text-gray-900">Payment Details</h2>
            </div>

            {/* Test Card Info Banner (Optional - for demo purposes) */}
            <div className="mb-6">
              <button
                type="button"
                onClick={() => setShowTestCard(!showTestCard)}
                className="w-full p-4 bg-yellow-50 border border-yellow-200 rounded-xl hover:bg-yellow-100 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="font-semibold text-yellow-800">Demo Mode - Click for test card details</span>
                  </div>
                  {showTestCard ? (
                    <ChevronUp className="w-5 h-5 text-yellow-700" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-yellow-700" />
                  )}
                </div>
              </button>
              
              {showTestCard && (
                <div className="mt-2 p-4 bg-yellow-50 border border-yellow-200 border-t-0 rounded-b-xl">
                  <p className="text-yellow-700 text-sm mb-3">Use this test card for demo purposes:</p>
                  <div className="bg-white rounded-lg p-3 border border-yellow-200">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Card Number:</span>
                        <div className="font-mono font-semibold">4242 4242 4242 4242</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Expiry:</span>
                        <div className="font-mono font-semibold">12/28</div>
                      </div>
                      <div>
                        <span className="text-gray-600">CVC:</span>
                        <div className="font-mono font-semibold">123</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Name:</span>
                        <div className="font-semibold">{user?.fullName || 'Test User'}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Email:</span>
                        <div className="font-semibold">{user?.primaryEmailAddress?.emailAddress || 'test@example.com'}</div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setFormData(prev => ({
                          ...prev,
                          cardNumber: '4242 4242 4242 4242',
                          expiryDate: '12/28',
                          cvc: '123',
                          name: user?.fullName || `${user?.firstName || ''} ${user?.lastName || ''}`.trim() || 'Test User',
                          email: user?.primaryEmailAddress?.emailAddress || 'test@example.com'
                        }))
                        setShowTestCard(false)
                      }}
                      className="mt-3 w-full py-2 px-4 bg-yellow-100 hover:bg-yellow-200 text-yellow-800 rounded-lg font-medium transition-colors"
                    >
                      Auto-fill test data
                    </button>
                  </div>
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Cardholder Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                <input
                  type="text"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  required
                  className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="1234 5678 9012 3456"
                  maxLength="19"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                  <input
                    type="text"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    required
                    className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="MM/YY"
                    maxLength="5"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">CVC</label>
                  <input
                    type="text"
                    name="cvc"
                    value={formData.cvc}
                    onChange={handleInputChange}
                    required
                    className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="123"
                    maxLength="4"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="GB">United Kingdom</option>
                  <option value="AU">Australia</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-200 ${
                  isProcessing
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl'
                }`}
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Processing Payment...
                  </div>
                ) : (
                  `Subscribe for $${price}.00/month`
                )}
              </button>

              <p className="text-xs text-gray-500 text-center">
                By subscribing, you agree to our Terms of Service and Privacy Policy. Your subscription will auto-renew monthly.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout