'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Header() {
  const [user, setUser] = useState<any>(null)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) setUser(JSON.parse(userData))
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('user')
    setUser(null)
    window.location.href = '/'
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`
    }
  }

  return (
    <header className="fixed top-4 left-4 right-4 z-50">
      <div className="max-w-7xl mx-auto">

        {/* TRANSPARENT ROUNDED NAV CONTAINER */}
        <div className="bg-white/20 backdrop-blur-xl border border-white/30 rounded-full px-8 py-4 flex items-center justify-between shadow-2xl">

          {/* LEFT: LOGO */}
          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="Logo"
              className="w-10 h-10 rounded-lg"
            />
            <div>
              <h1 className="text-gray-800 font-semibold text-sm lg:text-base">
                Southern Railway
              </h1>
              <p className="text-gray-500 text-xs">
                Compendium of Learning Resources
              </p>
            </div>
          </div>

          {/* CENTER: SEARCH + COURSES */}
          <div className="hidden lg:flex items-center gap-4">

            {/* SEARCH */}
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-72 px-4 py-2.5 bg-white border border-gray-200 rounded-full text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-orange-400 text-white p-2 rounded-full hover:bg-orange-500"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </form>

            {/* COURSES */}
            <Link href="/courses">
              <button className="px-5 py-2 bg-orange-400 text-white rounded-full text-sm hover:bg-orange-500">
                Courses
              </button>
            </Link>
          </div>

          {/* RIGHT: AUTH */}
          {user ? (
            <div className="flex items-center gap-3">
              <Link href="/dashboard">
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition-colors duration-200 text-sm font-medium">
                  📚 My Learning
                </button>
              </Link>
              
              <div className="flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-full">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="text-gray-700 font-medium text-sm">
                  {user.name}
                </span>
              </div>
              
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-red-500 hover:bg-red-50 rounded-full transition-all duration-200 text-sm font-medium"
              >
                🚪 Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link href="/login">
                <button className="px-5 py-2 border border-blue-600 text-blue-600 rounded-full text-sm hover:bg-blue-50">
                  Log in
                </button>
              </Link>
              <Link href="/signup">
                <button className="px-5 py-2 bg-orange-400 text-white rounded-full text-sm hover:bg-orange-500">
                  Register
                </button>
              </Link>
            </div>
          )}

        </div>
      </div>
    </header>
  )
}
