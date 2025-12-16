'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (res.ok) {
        router.push('/login')
      } else {
        alert('Signup failed')
      }
    } catch (error) {
      alert('Error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        
        {/* LEFT SIDE - SIGNUP FORM */}
        <div className="w-full max-w-md mx-auto lg:order-1">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h2>
              <p className="text-black">Join thousands of railway professionals</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
              </div>

              <div className="flex items-start">
                <input type="checkbox" required className="w-4 h-4 text-blue-400 border-gray-300 rounded focus:ring-blue-400 mt-1" />
                <span className="ml-2 text-sm text-black">
                  I agree to the{' '}
                  <a href="#" className="text-blue-500 hover:text-blue-600 font-medium">Terms of Service</a>
                  {' '}and{' '}
                  <a href="#" className="text-blue-500 hover:text-blue-600 font-medium">Privacy Policy</a>
                </span>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Creating Account...
                  </div>
                ) : (
                  'Create Account'
                )}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-black">
                Already have an account?{' '}
                <Link href="/login" className="text-blue-500 hover:text-blue-600 font-semibold">
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - BRANDING */}
        <div className="hidden lg:block lg:order-2">
          <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-3xl p-12 text-white relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                <img src="/logo.png" alt="Logo" className="w-12 h-12 rounded-xl bg-white/20 p-2" />
                <div>
                  <h2 className="text-2xl font-bold">Southern Railway</h2>
                  <p className="text-blue-100">Learning & Development</p>
                </div>
              </div>
              
              <h1 className="text-4xl font-bold mb-6 leading-tight">
                Start Your Professional Growth Today
              </h1>
              
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                Join our community of railway professionals and advance your career with expert-led training.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">🚂</div>
                  <span>Railway-specific training programs</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">🏆</div>
                  <span>Industry-recognized certifications</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">👥</div>
                  <span>Connect with 50,000+ professionals</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">📈</div>
                  <span>Career advancement opportunities</span>
                </div>
              </div>
            </div>
            
            {/* DECORATIVE ELEMENTS */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-24 -translate-x-24"></div>
          </div>
        </div>
      </div>
    </div>
  )
}