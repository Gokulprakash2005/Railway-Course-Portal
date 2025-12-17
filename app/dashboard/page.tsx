'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Course {
  title: string
  instructor: string
  progress: number
  image: string
  category: string
  completed: boolean
}

export default function Dashboard() {
  const [user, setUser] = useState<any>(null)
  const [courses, setCourses] = useState<Course[]>([])
  const [activeTab, setActiveTab] = useState('inProgress')

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) setUser(JSON.parse(userData))
  }, [])

  useEffect(() => {
    if (!user?.email) return

    const enrolledCourses = JSON.parse(
      localStorage.getItem(`enrolledCourses_${user.email}`) || '[]'
    )

    const allCourses: Course[] = [
      {
        title: '25kV Vacuum Circuit Breaker Maintenance',
        instructor: 'Sr. Electrical Eng. Suresh Patel',
        progress: 100,
        image: '/Gemini_Generated_Image_evhen0evhen0evhe.png',
        category: 'Electrical',
        completed: true,
      },
      {
        title: 'Railway Safety Management',
        instructor: 'Dr. Rajesh Kumar',
        progress: 17,
        image: '/Gemini_Generated_Image_vydyqvydyqvydyqv.png',
        category: 'Safety',
        completed: false,
      },
      {
        title: 'Signal & Interlocking Systems',
        instructor: 'Eng. Priya Sharma',
        progress: 17,
        image: '/Gemini_Generated_Image_k4vd1ak4vd1ak4vd.png',
        category: 'Signaling',
        completed: false,
      },
      {
        title: 'Track Maintenance & Engineering',
        instructor: 'Chief Eng. Amit Singh',
        progress: 0,
        image: '/Gemini_Generated_Image_d2atv1d2atv1d2at.png',
        category: 'Engineering',
        completed: false,
      },
    ]

    setCourses(allCourses.filter(c => enrolledCourses.includes(c.title)))
  }, [user])

  const handleLogout = () => {
    localStorage.removeItem('user')
    window.location.href = '/'
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* COURSERA-STYLE HEADER */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <img src="/logo.png" alt="Logo" className="h-8 w-8" />
              <span className="ml-3 text-xl font-bold text-blue-600">Southern Railway</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/courses" className="text-gray-700 hover:text-blue-600 font-medium">
                Explore
              </Link>
              <span className="text-blue-600 font-medium border-b-2 border-blue-600 pb-4">My Learning</span>
            </nav>
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">{user?.name?.charAt(0)?.toUpperCase()}</span>
              </div>
              <button onClick={handleLogout} className="text-gray-500 hover:text-gray-700">
                Sign out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* COURSERA-STYLE CONTENT */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Learning</h1>
          <p className="text-gray-600">Welcome back, {user?.name}. Ready to continue learning?</p>
        </div>

        {/* TABS */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            <button 
              onClick={() => setActiveTab('inProgress')}
              className={`border-b-2 py-2 px-1 text-sm font-medium ${
                activeTab === 'inProgress' 
                  ? 'border-blue-600 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              In Progress ({courses.filter(c => !c.completed).length})
            </button>
            <button 
              onClick={() => setActiveTab('completed')}
              className={`border-b-2 py-2 px-1 text-sm font-medium ${
                activeTab === 'completed' 
                  ? 'border-blue-600 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Completed ({courses.filter(c => c.completed).length})
            </button>
          </nav>
        </div>

        {/* COURSE CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses
            .filter(course => activeTab === 'completed' ? course.completed : !course.completed)
            .map((course, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="relative">
                <img className="w-full h-40 object-cover" src={course.image} alt={course.title} />
                {course.completed && (
                  <div className="absolute top-3 right-3 bg-green-600 text-white text-xs px-2 py-1 rounded">
                    ✓ Complete
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">{course.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{course.instructor}</p>
                
                <div className="mb-4">
                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                    <span>{course.progress}% complete</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div 
                      className={`h-1.5 rounded-full ${
                        course.completed ? 'bg-green-600' : 'bg-blue-600'
                      }`}
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>

                {course.completed ? (
                  <button className="w-full py-2 px-4 rounded text-sm font-medium bg-green-600 text-white cursor-default">
                    Completed
                  </button>
                ) : (
                  <Link href={`/learn?course=${encodeURIComponent(course.title)}`}>
                    <button className={`w-full py-2 px-4 rounded text-sm font-medium ${
                      course.progress > 0
                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                        : 'border border-blue-600 text-blue-600 hover:bg-blue-50'
                    } transition-colors`}>
                      {course.progress > 0 ? 'Continue' : 'Start Course'}
                    </button>
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* EMPTY STATE */}
        {courses.filter(course => activeTab === 'completed' ? course.completed : !course.completed).length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📚</div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              {activeTab === 'completed' ? 'No completed courses yet' : 'No courses in progress'}
            </h3>
            <p className="text-gray-600 mb-6">
              {activeTab === 'completed' 
                ? 'Complete some courses to see them here' 
                : 'Start your learning journey by exploring our courses'
              }
            </p>
            <Link href="/courses">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700">
                Browse Courses
              </button>
            </Link>
          </div>
        )}

        {/* EXPLORE MORE SECTION */}
        <div className="mt-16 bg-gradient-to-r from-blue-50 to-indigo-100 rounded-xl p-8 border border-blue-200">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">🚀 Ready to Learn More?</h3>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              Expand your railway expertise with our comprehensive course catalog. 
              From safety protocols to advanced engineering, we have courses for every skill level.
            </p>
            <Link href="/courses">
              <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg">
                Explore All Courses →
              </button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}