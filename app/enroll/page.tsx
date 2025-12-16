'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

function EnrollContent() {
  const [user, setUser] = useState<any>(null)
  const router = useRouter()
  const searchParams = useSearchParams()
  const courseTitle = searchParams.get('course') || 'Course'

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    } else {
      router.push('/login')
    }
  }, [])

  const handleEnroll = () => {
    if (!user?.email) return
    
    // Save enrollment to localStorage with user-specific key
    const enrollmentKey = `enrolledCourses_${user.email}`
    const enrolled = localStorage.getItem(enrollmentKey)
    const enrolledCourses = enrolled ? JSON.parse(enrolled) : []
    if (!enrolledCourses.includes(courseTitle)) {
      enrolledCourses.push(courseTitle)
      localStorage.setItem(enrollmentKey, JSON.stringify(enrolledCourses))
    }
    
    alert('Successfully enrolled in the course!')
    router.push(`/learn?course=${encodeURIComponent(courseTitle)}`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* BACK BUTTON HEADER */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors duration-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="font-medium">Back to Courses</span>
          </button>
        </div>
      </div>
      
      <main className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h1 className="text-3xl font-bold mb-6">Enroll in Course</h1>
            
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">{courseTitle}</h2>
              <p className="text-gray-600 mb-4">
                You're about to enroll in this free course. Once enrolled, you'll have lifetime access to all course materials.
              </p>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-green-800 mb-2">What you'll get:</h3>
                <ul className="text-green-700 space-y-1">
                  <li>• Lifetime access to course content</li>
                  <li>• Downloadable resources</li>
                  <li>• Certificate of completion</li>
                  <li>• Access to course community</li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={handleEnroll}
                className="w-full sm:w-auto bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 font-semibold transition-colors"
              >
                Enroll Now - FREE
              </button>
              <button 
                onClick={() => router.back()}
                className="w-full sm:w-auto border border-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      </main>

    </div>
  )
}

export default function EnrollPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center"><div className="text-lg">Loading enrollment...</div></div>}>
      <EnrollContent />
    </Suspense>
  )
}