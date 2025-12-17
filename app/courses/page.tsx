'use client'

import { useState, useEffect } from 'react'
import Header from '../components/landing/Header'
import Footer from '../components/landing/Footer'
import Link from 'next/link'

export default function CoursesPage() {
  const [user, setUser] = useState<any>(null)
  const [enrolledCourses, setEnrolledCourses] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    }
    if (userData) {
      const enrollmentKey = `enrolledCourses_${JSON.parse(userData).email}`
      const enrolled = localStorage.getItem(enrollmentKey)
      if (enrolled) {
        setEnrolledCourses(JSON.parse(enrolled))
      }
    }
  }, [])

  const courses = [
    {
      title: "25kV Vacuum Circuit Breaker Maintenance",
      instructor: "Sr. Electrical Eng. Suresh Patel",
      rating: 4.9,
      students: "15,432",
      image: "/Gemini_Generated_Image_evhen0evhen0evhe.png",
      category: "Electrical Systems",
      duration: "4 weeks",
      level: "Advanced",
      description: "Complete maintenance procedures for 25kV Vacuum Circuit Breakers and Interrupters used in Indian Railway Traction System"
    },
    {
      title: "Railway Safety Management",
      instructor: "Dr. Rajesh Kumar",
      rating: 4.8,
      students: "12,345",
      image: "/Gemini_Generated_Image_vydyqvydyqvydyqv.png",
      category: "Safety & Operations",
      duration: "8 weeks",
      level: "Intermediate",
      description: "Comprehensive safety protocols and risk management in railway operations"
    },
    {
      title: "Signal & Interlocking Systems",
      instructor: "Eng. Priya Sharma",
      rating: 4.9,
      students: "8,765",
      image: "/Gemini_Generated_Image_k4vd1ak4vd1ak4vd.png",
      category: "Signaling",
      duration: "6 weeks",
      level: "Advanced",
      description: "Modern signaling technology and interlocking system design"
    },
    {
      title: "Track Maintenance & Engineering",
      instructor: "Chief Eng. Amit Singh",
      rating: 4.7,
      students: "9,876",
      image: "/Gemini_Generated_Image_d2atv1d2atv1d2at.png",
      category: "Engineering",
      duration: "10 weeks",
      level: "Beginner",
      description: "Track infrastructure maintenance and engineering best practices"
    },
  ]

  const categories = ['All', 'Electrical Systems', 'Safety & Operations', 'Signaling', 'Engineering']

  const filteredCourses = courses.filter(course => {
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  if (user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        {/* COURSERA-STYLE HEADER */}
        <header className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link href="/dashboard" className="flex items-center hover:opacity-80 transition-opacity">
                <img src="/logo.png" alt="Logo" className="h-8 w-8" />
                <span className="ml-3 text-xl font-bold text-blue-600">Southern Railway</span>
              </Link>
              <nav className="hidden md:flex space-x-8">
                <span className="text-blue-600 font-medium border-b-2 border-blue-600 pb-4">Explore</span>
                <Link href="/dashboard" className="text-gray-700 hover:text-blue-600 font-medium">
                  My Learning
                </Link>
              </nav>
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">{user?.name?.charAt(0)?.toUpperCase()}</span>
                </div>
                <button onClick={() => { localStorage.removeItem('user'); window.location.href = '/'; }} className="text-gray-500 hover:text-gray-700">
                  Sign out
                </button>
              </div>
            </div>
          </div>
        </header>
        
        <main className="pt-8 pb-16">
          <div className="max-w-7xl mx-auto px-6">
            
            {/* LOGGED IN HERO */}
            <div className="mb-12 mt-20">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Welcome back, <span className="text-blue-600">{user.name}</span>
              </h1>
              <p className="text-xl text-black max-w-3xl">
                Continue your learning journey or explore new courses
              </p>
            </div>

            {/* LOGGED IN SEARCH & FILTERS */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 mb-8 border border-gray-200">
              <div className="flex flex-col lg:flex-row gap-6 items-center">
                
                {/* SEARCH BAR */}
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="Search courses, instructors..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-3 pl-12 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-gray-50 focus:bg-white transition-all duration-200 text-black"
                  />
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-black">
                    🔍
                  </div>
                </div>

                {/* CATEGORY FILTERS */}
                <div className="flex gap-2 flex-wrap">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                        selectedCategory === category
                          ? 'bg-blue-500 text-white shadow-lg'
                          : 'bg-gray-100 text-black hover:bg-gray-200'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>

          {/* RESULTS COUNT */}
          <div className="mb-6">
            <p className="text-gray-600">
              Showing <span className="font-semibold text-gray-900">{filteredCourses.length}</span> courses
              {selectedCategory !== 'All' && (
                <span> in <span className="font-semibold text-orange-500">{selectedCategory}</span></span>
              )}
            </p>
          </div>

            {/* LOGGED IN COURSES GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCourses.map((course, index) => (
                <div
                  key={index}
                  className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 hover:border-blue-300"
                >
                {/* IMAGE */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-medium px-3 py-1 rounded-full">
                      {course.level}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="bg-black/70 text-white text-xs px-2 py-1 rounded">
                      {course.duration}
                    </span>
                  </div>
                </div>

                {/* CONTENT */}
                <div className="p-6">
                  {/* CATEGORY */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-orange-100 text-orange-600 text-xs font-medium px-3 py-1 rounded-full">
                      📚 {course.category}
                    </span>
                  </div>

                  {/* TITLE */}
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                    {course.title}
                  </h3>

                  {/* DESCRIPTION */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {course.description}
                  </p>

                  {/* INSTRUCTOR */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {course.instructor.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span className="text-sm text-gray-700 font-medium">{course.instructor}</span>
                  </div>

                  {/* STATS */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-400">⭐</span>
                        <span className="text-sm font-medium text-gray-700">{course.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-gray-400">👥</span>
                        <span className="text-sm text-gray-600">{course.students}</span>
                      </div>
                    </div>
                    <span className="text-lg font-bold text-green-600">FREE</span>
                  </div>

                    {/* LOGGED IN ACTION BUTTON */}
                    <div className="pt-4 border-t border-gray-100">
                      {enrolledCourses.includes(course.title) ? (
                        <Link href={`/learn?course=${encodeURIComponent(course.title)}`}>
                          <button className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                            📖 Continue Learning
                          </button>
                        </Link>
                      ) : (
                        <Link href={`/enroll?course=${encodeURIComponent(course.title)}`}>
                          <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl">
                            🚀 Enroll Now
                          </button>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* LOGGED IN EMPTY STATE */}
            {filteredCourses.length === 0 && (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">No courses found</h3>
                <p className="text-black mb-6">
                  Try adjusting your search or filter criteria
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('')
                    setSelectedCategory('All')
                  }}
                  className="bg-blue-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-600 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </main>
      </div>
    )
  }

  // NOT LOGGED IN VERSION
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50">
      <Header hideSearch={true} />
      
      <main className="pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* HERO SECTION */}
          <div className="text-center mb-12 mt-20">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Explore Our <span className="text-orange-500">Railway Courses</span>
            </h1>
            <p className="text-xl text-black max-w-3xl mx-auto">
              Advance your railway career with expert-led courses designed for professionals at every level
            </p>
          </div>

          {/* SEARCH & FILTERS */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
            <div className="flex flex-col lg:flex-row gap-6 items-center">
              
              {/* SEARCH BAR */}
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Search courses, instructors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 pl-12 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent bg-gray-50 focus:bg-white transition-all duration-200 text-black"
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-black">
                  🔍
                </div>
              </div>

              {/* CATEGORY FILTERS */}
              <div className="flex gap-2 flex-wrap">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      selectedCategory === category
                        ? 'bg-orange-500 text-white shadow-lg'
                        : 'bg-gray-100 text-black hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* RESULTS COUNT */}
          <div className="mb-6">
            <p className="text-black">
              Showing <span className="font-semibold text-black">{filteredCourses.length}</span> courses
              {selectedCategory !== 'All' && (
                <span> in <span className="font-semibold text-orange-500">{selectedCategory}</span></span>
              )}
            </p>
          </div>

          {/* COURSES GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-orange-200"
              >
                {/* IMAGE */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-sm text-black text-xs font-medium px-3 py-1 rounded-full">
                      {course.level}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="bg-black/70 text-white text-xs px-2 py-1 rounded">
                      {course.duration}
                    </span>
                  </div>
                </div>

                {/* CONTENT */}
                <div className="p-6">
                  {/* CATEGORY */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-orange-100 text-orange-600 text-xs font-medium px-3 py-1 rounded-full">
                      📚 {course.category}
                    </span>
                  </div>

                  {/* TITLE */}
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                    {course.title}
                  </h3>

                  {/* DESCRIPTION */}
                  <p className="text-black text-sm mb-4 line-clamp-2">
                    {course.description}
                  </p>

                  {/* INSTRUCTOR */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {course.instructor.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span className="text-sm text-black font-medium">{course.instructor}</span>
                  </div>

                  {/* STATS */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-400">⭐</span>
                        <span className="text-sm font-medium text-black">{course.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-gray-400">👥</span>
                        <span className="text-sm text-black">{course.students}</span>
                      </div>
                    </div>
                    <span className="text-lg font-bold text-green-600">FREE</span>
                  </div>

                  {/* ACTION BUTTON */}
                  <div className="pt-4 border-t border-gray-100">
                    <Link href="/signup">
                      <button className="w-full border-2 border-orange-500 text-orange-600 py-3 rounded-xl font-semibold hover:bg-orange-50 transition-colors duration-200">
                        👁️ View Course
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* EMPTY STATE */}
          {filteredCourses.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">No courses found</h3>
              <p className="text-black mb-6">
                Try adjusting your search or filter criteria
              </p>
              <button
                onClick={() => {
                  setSearchTerm('')
                  setSelectedCategory('All')
                }}
                className="bg-orange-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-orange-600 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}