'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Header from '../components/landing/Header'
import Footer from '../components/landing/Footer'
import Link from 'next/link'

export default function SearchPage() {
  const [user, setUser] = useState<any>(null)
  const [enrolledCourses, setEnrolledCourses] = useState<string[]>([])
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''

  const allCourses = [
    {
      title: "Railway Safety Management",
      instructor: "Dr. Rajesh Kumar",
      rating: 4.8,
      students: "12,345",
      image: "/Gemini_Generated_Image_vydyqvydyqvydyqv.png",
      category: "Safety & Operations",
    },
    {
      title: "Signal & Interlocking Systems",
      instructor: "Eng. Priya Sharma",
      rating: 4.9,
      students: "8,765",
      image: "/Gemini_Generated_Image_k4vd1ak4vd1ak4vd.png",
      category: "Signaling",
    },
    {
      title: "Track Maintenance & Engineering",
      instructor: "Chief Eng. Amit Singh",
      rating: 4.7,
      students: "9,876",
      image: "/Gemini_Generated_Image_d2atv1d2atv1d2at.png",
      category: "Engineering",
    },
    {
      title: "Complete Web Development",
      instructor: "John Smith",
      rating: 4.8,
      students: "12,345",
      image: "/OIP (4).jpg",
      category: "Web Development",
    },
    {
      title: "Data Science Fundamentals",
      instructor: "Sarah Johnson",
      rating: 4.9,
      students: "8,765",
      image: "/OIP (5).jpg",
      category: "Data Science",
    }
  ]

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    }
    const enrolled = localStorage.getItem('enrolledCourses')
    if (enrolled) {
      setEnrolledCourses(JSON.parse(enrolled))
    }
  }, [])

  const filteredCourses = allCourses.filter(course =>
    course.title.toLowerCase().includes(query.toLowerCase()) ||
    course.category.toLowerCase().includes(query.toLowerCase()) ||
    course.instructor.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Search Results</h1>
            <p className="text-gray-600">
              {filteredCourses.length} results for "{query}"
            </p>
          </div>

          {filteredCourses.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCourses.map((course, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
                >
                  <img
                    src={course.image}
                    alt={course.title}
                    className="h-48 w-full object-cover"
                  />

                  <div className="p-6">
                    <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded mb-3 inline-block">
                      {course.category}
                    </span>

                    <h3 className="text-xl font-semibold mb-2">
                      {course.title}
                    </h3>

                    <p className="text-gray-600 mb-3">
                      by {course.instructor}
                    </p>

                    <div className="flex justify-between items-center mb-4">
                      <span className="text-yellow-500">★ {course.rating}</span>
                      <span className="text-gray-500">
                        {course.students} students
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-green-600 font-bold text-lg">
                        FREE
                      </span>
                      {user ? (
                        enrolledCourses.includes(course.title) ? (
                          <Link href={`/learn?course=${encodeURIComponent(course.title)}`}>
                            <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
                              Continue
                            </button>
                          </Link>
                        ) : (
                          <Link href={`/enroll?course=${encodeURIComponent(course.title)}`}>
                            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                              Enroll Now
                            </button>
                          </Link>
                        )
                      ) : (
                        <Link href="/signup">
                          <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded hover:bg-blue-600 hover:text-white transition">
                            View Course
                          </button>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h2 className="text-2xl font-semibold mb-2">No courses found</h2>
              <p className="text-gray-600 mb-6">
                Try searching with different keywords or browse all courses
              </p>
              <Link href="/courses">
                <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
                  Browse All Courses
                </button>
              </Link>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}