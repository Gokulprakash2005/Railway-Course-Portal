'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Header({ hideSearch = false }: { hideSearch?: boolean }) {
  const [user, setUser] = useState<any>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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
        <div className="bg-white/90 backdrop-blur-xl border border-white/50 rounded-full px-8 py-4 flex items-center justify-between shadow-2xl">

          {/* LEFT: LOGO */}
          <Link href={user ? "/dashboard" : "/"} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <img
              src="/logo.png"
              alt="Logo"
              className="w-10 h-10 rounded-lg"
            />
            <div>
              <h1 className="text-black font-semibold text-sm lg:text-base">
                Southern Railway
              </h1>
              <p className="text-black font-medium text-xs">
                Compendium of Learning Resources
              </p>
            </div>
          </Link>

          {/* CENTER: SEARCH + COURSES */}
          <div className="hidden min-[1100px]:flex items-center gap-4">

            {/* SEARCH */}
            {!hideSearch && (
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-48 lg:w-72 px-4 py-2.5 bg-white border border-gray-200 rounded-full text-sm text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
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
            )}

            {/* COURSES */}
            {!hideSearch && (
              <Link href="/courses">
                <button className="px-5 py-2 bg-orange-400 text-white rounded-full text-sm font-medium hover:bg-orange-500">
                  Courses
                </button>
              </Link>
            )}
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="min-[1100px]:hidden p-2 text-black hover:bg-gray-100 rounded-lg"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* RIGHT: AUTH */}
          {user ? (
            <div className="hidden min-[1100px]:flex items-center gap-3">
              <Link href="/dashboard">
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition-colors duration-200 text-sm font-medium">
                  📚 My Learning
                </button>
              </Link>
              
              <div className="flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-full">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="text-black font-medium text-sm">
                  {user.name}
                </span>
              </div>
              
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-black hover:text-red-500 hover:bg-red-50 rounded-full transition-all duration-200 text-sm font-medium"
              >
                🚪 Logout
              </button>
            </div>
          ) : (
            <div className="hidden min-[1100px]:flex items-center gap-3">
              <Link href="/login">
                <button className="px-5 py-2 border border-blue-600 text-blue-600 rounded-full text-sm font-medium hover:bg-blue-50">
                  Log in
                </button>
              </Link>
              <Link href="/signup">
                <button className="px-5 py-2 bg-orange-400 text-white rounded-full text-sm font-medium hover:bg-orange-500">
                  Register
                </button>
              </Link>
            </div>
          )}

        </div>

        {/* MOBILE MENU */}
        {mobileMenuOpen && (
          <div className="min-[1100px]:hidden mt-2 bg-white/95 backdrop-blur-xl border border-white/30 rounded-2xl p-4 shadow-2xl">
            {/* Search */}
            {!hideSearch && (
              <form onSubmit={handleSearch} className="mb-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search courses..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-full text-sm text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-orange-400 text-white p-2 rounded-full hover:bg-orange-500"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                </div>
              </form>
            )}

            {/* Navigation */}
            <div className="space-y-2">
              {!hideSearch && (
                <Link href="/courses" onClick={() => setMobileMenuOpen(false)}>
                  <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                    Courses
                  </button>
                </Link>
              )}
              
              {user ? (
                <>
                  <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                    <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                      📚 My Learning
                    </button>
                  </Link>
                  <div className="px-4 py-2 text-gray-600 text-sm">
                    Welcome, {user.name}
                  </div>
                  <button
                    onClick={() => { handleLogout(); setMobileMenuOpen(false); }}
                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    🚪 Logout
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                    <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                      Log in
                    </button>
                  </Link>
                  <Link href="/signup" onClick={() => setMobileMenuOpen(false)}>
                    <button className="w-full text-left px-4 py-2 bg-orange-400 text-white hover:bg-orange-500 rounded-lg">
                      Register
                    </button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
