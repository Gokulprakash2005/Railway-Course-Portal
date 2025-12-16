'use client'

import { useState, useEffect, useRef, createContext, useContext } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const MouseEnterContext = createContext<
  [boolean, React.Dispatch<React.SetStateAction<boolean>>] | undefined
>(undefined)

const CardContainer = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isMouseEntered, setIsMouseEntered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const { left, top, width, height } = containerRef.current.getBoundingClientRect()
    const x = (e.clientX - left - width / 2) / 15
    const y = (e.clientY - top - height / 2) / 15
    containerRef.current.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`
  }

  const handleMouseEnter = () => {
    setIsMouseEntered(true)
  }

  const handleMouseLeave = () => {
    if (!containerRef.current) return
    setIsMouseEntered(false)
    containerRef.current.style.transform = `rotateY(0deg) rotateX(0deg)`
  }

  return (
    <MouseEnterContext.Provider value={[isMouseEntered, setIsMouseEntered]}>
      <div style={{ perspective: '1000px' }}>
        <div
          ref={containerRef}
          onMouseEnter={handleMouseEnter}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className={cn('transition-all duration-200 ease-linear', className)}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {children}
        </div>
      </div>
    </MouseEnterContext.Provider>
  )
}

const useMouseEnter = () => {
  const context = useContext(MouseEnterContext)
  if (context === undefined) {
    throw new Error('useMouseEnter must be used within a MouseEnterProvider')
  }
  return context
}

export default function PopularCourses() {
  const [user, setUser] = useState<any>(null)
  const [enrolledCourses, setEnrolledCourses] = useState<string[]>([])

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

  const courses = [
    {
      title: '25kV Vacuum Circuit Breaker Maintenance',
      instructor: 'Sr. Electrical Eng. Suresh Patel',
      rating: 4.9,
      students: '15,432',
      image: '/Gemini_Generated_Image_evhen0evhen0evhe.png',
      category: 'Electrical Systems',
    },
    {
      title: 'Railway Safety Management',
      instructor: 'Dr. Rajesh Kumar',
      rating: 4.8,
      students: '12,345',
      image: '/Gemini_Generated_Image_vydyqvydyqvydyqv.png',
      category: 'Safety & Operations',
    },
    {
      title: 'Signal & Interlocking Systems',
      instructor: 'Eng. Priya Sharma',
      rating: 4.9,
      students: '8,765',
      image: '/Gemini_Generated_Image_k4vd1ak4vd1ak4vd.png',
      category: 'Signaling',
    },
  ]

  return (
    <section className="bg-orange-50 py-16">
      <div className="max-w-7xl mx-auto px-6">

        {/* iGOT STYLE CONTAINER */}
        <div className="bg-[#fde7cf] rounded-2xl p-10">

          {/* HEADER */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-semibold text-gray-800">
              Popular Courses
            </h2>
            <Link
              href="/courses"
              className="text-blue-600 text-sm hover:underline"
            >
              Show all →
            </Link>
          </div>

          {/* COURSES */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

            {courses.map((course, index) => (
              <CardContainer key={index} className="">
                <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  {/* IMAGE */}
                  <div className="relative h-40">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                    {/* STATIC DURATION BADGE (UI ONLY) */}
                    <span className="absolute top-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                      ⏱ 1h+
                    </span>
                  </div>

                  {/* CONTENT */}
                  <div className="p-4">
                    {/* CATEGORY PILL */}
                    <span className="inline-flex items-center gap-1 text-xs border border-orange-400 text-orange-500 px-3 py-1 rounded-full mb-2">
                      📘 {course.category}
                    </span>

                    <h3 className="text-sm font-semibold text-gray-800 mb-1">
                      {course.title}
                    </h3>

                    <p className="text-xs text-black mb-3">
                      by {course.instructor}
                    </p>

                    {/* FOOTER */}
                    <div className="flex items-center justify-between">
                      <span className="text-green-600 font-semibold text-sm">
                        FREE
                      </span>

                      {user ? (
                        enrolledCourses.includes(course.title) ? (
                          <Link
                            href={`/learn?course=${encodeURIComponent(course.title)}`}
                            className="text-sm text-blue-600 hover:underline"
                          >
                            Continue →
                          </Link>
                        ) : (
                          <Link
                            href={`/enroll?course=${encodeURIComponent(course.title)}`}
                            className="text-sm text-blue-600 hover:underline"
                          >
                            Enroll →
                          </Link>
                        )
                      ) : (
                        <Link
                          href="/signup"
                          className="text-sm text-blue-600 hover:underline"
                        >
                          View →
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </CardContainer>
            ))}

          </div>
        </div>
      </div>
    </section>
  )
}
