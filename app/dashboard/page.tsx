'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Dashboard() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('user')
    window.location.href = '/'
  }

  interface Course {
    title: string
    instructor: string
    progress: number
    image: string
    category: string
    completed: boolean
  }

  const [courses, setCourses] = useState<Course[]>([])

  useEffect(() => {
    if (!user?.email) return
    
    // Get enrolled courses for this user
    const enrolledCourses = JSON.parse(localStorage.getItem(`enrolledCourses_${user.email}`) || '[]')
    
    const allCourses = [
      {
        title: "25kV Vacuum Circuit Breaker Maintenance",
        instructor: "Sr. Electrical Eng. Suresh Patel",
        progress: 0,
        image: "/Gemini_Generated_Image_evhen0evhen0evhe.png",
        category: "Electrical Systems",
        completed: false
      },
      {
        title: "Railway Safety Management",
        instructor: "Dr. Rajesh Kumar",
        progress: 0,
        image: "/Gemini_Generated_Image_vydyqvydyqvydyqv.png",
        category: "Safety & Operations",
        completed: false
      },
      {
        title: "Signal & Interlocking Systems",
        instructor: "Eng. Priya Sharma",
        progress: 0,
        image: "/Gemini_Generated_Image_k4vd1ak4vd1ak4vd.png",
        category: "Signaling",
        completed: false
      },
      {
        title: "Track Maintenance & Engineering",
        instructor: "Chief Eng. Amit Singh",
        progress: 0,
        image: "/Gemini_Generated_Image_d2atv1d2atv1d2at.png",
        category: "Engineering",
        completed: false
      }
    ]
    
    // Filter to show only enrolled courses with progress
    const userCourses: Course[] = allCourses.filter(course => 
      enrolledCourses.includes(course.title)
    ).map(course => {
      const progressKey = `progress_${user.email}_${course.title.replace(/\s+/g, '_')}`
      const savedProgress = localStorage.getItem(progressKey)
      if (savedProgress) {
        const progress = JSON.parse(savedProgress)
        const totalModules = getCourseModuleCount(course.title)
        const completedCount = progress.completedModules?.length || 0
        const progressPercent = Math.min((completedCount / totalModules) * 100, 100)
        return {
          ...course,
          progress: Math.round(progressPercent),
          completed: progressPercent === 100
        }
      }
      return course
    })
    
    setCourses(userCourses)
  }, [user])

  const getCourseModuleCount = (courseTitle: string) => {
    if (courseTitle === '25kV Vacuum Circuit Breaker Maintenance') {
      return 6 // 3 sections × 2 modules each
    }
    return 6 // Default module count
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Simple Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <img src="/logo.png" alt="Logo" className="w-8 h-8" />
              <span className="font-bold text-lg sm:text-xl text-black">Southern Railway</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <Link href="/courses" className="hidden sm:block text-black hover:text-gray-800 font-medium">
                Browse Courses
              </Link>
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  {user?.name?.charAt(0)?.toUpperCase()}
                </div>
                <span className="hidden sm:block text-black font-medium">{user?.name}</span>
              </div>
              <button
                onClick={handleLogout}
                className="text-black hover:text-red-500 font-medium text-sm sm:text-base"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <main className="py-4 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">Welcome back, {user?.name}!</h1>
            <p className="text-black">Continue your learning journey</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            <div className="lg:col-span-2">
              <h2 className="text-lg sm:text-xl font-semibold mb-4">My Learning</h2>
              <div className="space-y-4">
                {courses.length === 0 ? (
                  <div className="bg-white rounded-lg p-6 text-center">
                    <div className="text-gray-400 text-4xl mb-4">📚</div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No Enrolled Courses</h3>
                    <p className="text-black mb-4">Start your learning journey by enrolling in courses</p>
                    <Link href="/courses">
                      <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                        Browse Courses
                      </button>
                    </Link>
                  </div>
                ) : (
                  courses.map((course, index) => (
                  <div key={index} className="bg-white rounded-lg p-4 sm:p-6 shadow-sm">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      <img src={course.image} alt={course.title} className="w-16 h-16 rounded object-cover" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-sm sm:text-base">{course.title}</h3>
                          {course.completed && (
                            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                              ✓ Completed
                            </span>
                          )}
                        </div>
                        <p className="text-xs sm:text-sm text-black">by {course.instructor}</p>
                        <div className="mt-2">
                          <div className="flex justify-between text-xs sm:text-sm mb-1">
                            <span>Progress</span>
                            <span>{course.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className={`h-2 rounded-full transition-all ${
                              course.completed ? 'bg-green-600' : 'bg-blue-600'
                            }`} style={{width: `${course.progress}%`}}></div>
                          </div>
                        </div>
                      </div>
                      {course.completed ? (
                        <Link href={`/assessment?course=${encodeURIComponent(course.title)}`}>
                          <button className="bg-green-600 text-white px-3 sm:px-4 py-2 rounded hover:bg-green-700 text-sm w-full sm:w-auto">
                            Take Assessment
                          </button>
                        </Link>
                      ) : course.progress > 0 ? (
                        <Link href={`/learn?course=${encodeURIComponent(course.title)}`}>
                          <button className="bg-blue-600 text-white px-3 sm:px-4 py-2 rounded hover:bg-blue-700 text-sm w-full sm:w-auto">
                            Continue
                          </button>
                        </Link>
                      ) : (
                        <Link href={`/learn?course=${encodeURIComponent(course.title)}`}>
                          <button className="bg-gray-600 text-white px-3 sm:px-4 py-2 rounded hover:bg-gray-700 text-sm w-full sm:w-auto">
                            Start Course
                          </button>
                        </Link>
                      )}
                    </div>
                  </div>
                  ))
                )}
              </div>
            </div>

            <div>
              <h2 className="text-lg sm:text-xl font-semibold mb-4">Quick Stats</h2>
              <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm sm:text-base text-black">Courses Enrolled</span>
                    <span className="font-semibold text-sm sm:text-base text-black">{courses.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm sm:text-base text-black">Courses Completed</span>
                    <span className="font-semibold text-sm sm:text-base text-black">{courses.filter(c => c.completed).length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm sm:text-base text-black">Average Progress</span>
                    <span className="font-semibold text-sm sm:text-base text-black">
                      {courses.length > 0 ? Math.round(courses.reduce((sum, c) => sum + c.progress, 0) / courses.length) : 0}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

    </div>
  )
}