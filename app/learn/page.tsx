'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'

function LearnContent() {
  const [user, setUser] = useState<any>(null)
  const [currentLesson, setCurrentLesson] = useState(0)
  const [currentModule, setCurrentModule] = useState(0)
  const [completedModules, setCompletedModules] = useState<string[]>([])
  const [moduleCompleted, setModuleCompleted] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const searchParams = useSearchParams()
  const router = useRouter()
  const courseTitle = searchParams.get('course') || 'Course'
  const progressKey = `progress_${courseTitle.replace(/\s+/g, '_')}`

  const getCourseContent = (courseTitle: string) => {
    if (courseTitle === '25kV Vacuum Circuit Breaker Maintenance') {
      return [
        {
          title: "25kV Vacuum Circuit Breaker Fundamentals",
          modules: [
            {
              title: "Circuit Breaker Operation & Components",
              type: "video",
              content: "https://youtu.be/a3lZukx0Cdc?si=ByWXqDPKnWATZ0h9",
              duration: "12 min"
            },
            {
              title: "Maintenance Instruction Manual TI-MI-0054",
              type: "pdf",
              content: "/VAC CB TI-MI-0054 Rev 1.pdf",
              duration: "15 min"
            }
          ]
        },
        {
          title: "Maintenance Procedures & Safety",
          modules: [
            {
              title: "Preventive Maintenance Techniques",
              type: "video",
              content: "https://youtu.be/a3lZukx0Cdc?si=ByWXqDPKnWATZ0h9",
              duration: "18 min"
            },
            {
              title: "Safety Protocols for 25kV Systems",
              type: "pdf",
              content: "/VAC CB TI-MI-0054 Rev 1.pdf",
              duration: "10 min"
            }
          ]
        },
        {
          title: "Troubleshooting & Diagnostics",
          modules: [
            {
              title: "Common Faults & Solutions",
              type: "video",
              content: "https://youtu.be/a3lZukx0Cdc?si=ByWXqDPKnWATZ0h9",
              duration: "20 min"
            },
            {
              title: "Diagnostic Procedures Manual",
              type: "pdf",
              content: "/VAC CB TI-MI-0054 Rev 1.pdf",
              duration: "8 min"
            }
          ]
        }
      ]
    }
    
    // Default course content for other courses
    return [
      {
        title: "Introduction to Railway Safety",
        modules: [
          {
            title: "Safety Overview",
            type: "video",
            content: "https://youtu.be/a3lZukx0Cdc?si=ByWXqDPKnWATZ0h9",
            duration: "10 min"
          },
          {
            title: "Safety Guidelines Document",
            type: "pdf",
            content: "/VAC CB TI-MI-0054 Rev 1.pdf",
            duration: "5 min"
          }
        ]
      },
      {
        title: "Risk Assessment Procedures",
        modules: [
          {
            title: "Risk Analysis Methods",
            type: "video",
            content: "https://youtu.be/a3lZukx0Cdc?si=ByWXqDPKnWATZ0h9",
            duration: "15 min"
          },
          {
            title: "Assessment Forms & Documentation",
            type: "pdf",
            content: "/VAC CB TI-MI-0054 Rev 1.pdf",
            duration: "5 min"
          }
        ]
      },
      {
        title: "Emergency Response Protocols",
        modules: [
          {
            title: "Emergency Procedures",
            type: "video",
            content: "https://youtu.be/a3lZukx0Cdc?si=ByWXqDPKnWATZ0h9",
            duration: "20 min"
          },
          {
            title: "Response Manual",
            type: "pdf",
            content: "/VAC CB TI-MI-0054 Rev 1.pdf",
            duration: "5 min"
          }
        ]
      }
    ]
  }

  const lessons = getCourseContent(courseTitle)

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    } else {
      router.push('/login')
    }

    const savedProgress = localStorage.getItem(progressKey)
    if (savedProgress) {
      const progress = JSON.parse(savedProgress)
      setCurrentLesson(progress.currentLesson || 0)
      setCurrentModule(progress.currentModule || 0)
      // Filter out any invalid or duplicate module IDs
      const validModules = (progress.completedModules || []).filter((id: string, index: number, arr: string[]) => {
        const [lessonIdx, moduleIdx] = id.split('-').map(Number)
        return arr.indexOf(id) === index && // Remove duplicates
               lessonIdx < lessons.length && 
               moduleIdx < lessons[lessonIdx]?.modules.length
      })
      setCompletedModules(validModules)
    }
  }, [progressKey, router])

  const handleModuleComplete = () => {
    setModuleCompleted(true)
  }

  const markModuleComplete = () => {
    if (moduleCompleted) {
      const moduleId = `${currentLesson}-${currentModule}`
      // Only add if not already completed
      const newCompletedModules = completedModules.includes(moduleId) 
        ? completedModules 
        : [...completedModules, moduleId]
      
      setCompletedModules(newCompletedModules)
      setModuleCompleted(false)
      
      if (currentModule < lessons[currentLesson].modules.length - 1) {
        setCurrentModule(currentModule + 1)
      } else if (currentLesson < lessons.length - 1) {
        setCurrentLesson(currentLesson + 1)
        setCurrentModule(0)
      }
      
      const progress = {
        currentLesson: currentModule < lessons[currentLesson].modules.length - 1 ? currentLesson : Math.min(currentLesson + 1, lessons.length - 1),
        currentModule: currentModule < lessons[currentLesson].modules.length - 1 ? currentModule + 1 : 0,
        completedModules: newCompletedModules
      }
      localStorage.setItem(progressKey, JSON.stringify(progress))
    }
  }

  const startAssessment = () => {
    const totalModules = lessons.reduce((sum, lesson) => sum + lesson.modules.length, 0)
    if (validCompletedCount === totalModules) {
      router.push(`/assessment?course=${encodeURIComponent(courseTitle)}`)
    }
  }

  const lesson = lessons[currentLesson]
  const module = lesson.modules[currentModule]
  const moduleId = `${currentLesson}-${currentModule}`
  const totalModules = lessons.reduce((sum, lesson) => sum + lesson.modules.length, 0)
  // Ensure completed modules count doesn't exceed total
  const validCompletedCount = Math.min(completedModules.length, totalModules)
  const progressPercentage = (validCompletedCount / totalModules) * 100

  return (
    <div className="min-h-screen bg-gray-50">
      {/* TOP HEADER */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Dashboard
              </Link>
              <div className="h-6 w-px bg-gray-300"></div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">{courseTitle}</h1>
                <p className="text-sm text-gray-600">by Dr. Rajesh Kumar</p>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="text-sm text-gray-600">
                <span className="font-semibold text-gray-900">{validCompletedCount}</span> of {totalModules} completed
              </div>
              <div className="flex items-center gap-2">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-700">{Math.round(progressPercentage)}%</span>
              </div>
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex gap-6 p-6">
        {/* SIDEBAR */}
        <div className={`${sidebarOpen ? 'w-80' : 'w-0'} transition-all duration-300 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden`}>
          <div className="p-6 border-b border-gray-200">
            <h2 className="font-bold text-lg text-gray-900 mb-2">Course Content</h2>
            <div className="text-sm text-gray-600">
              {lessons.length} sections • {totalModules} lectures
            </div>
          </div>
          
          <div className="overflow-y-auto max-h-[calc(100vh-200px)]">
            {lessons.map((lessonItem, lessonIndex) => (
              <div key={lessonIndex} className="border-b border-gray-100 last:border-b-0">
                <div className="p-4 bg-gray-50">
                  <h3 className="font-semibold text-sm text-gray-900">{lessonItem.title}</h3>
                  <div className="text-xs text-gray-600 mt-1">
                    {lessonItem.modules.length} lectures
                  </div>
                </div>
                
                {lessonItem.modules.map((moduleItem, moduleIndex) => {
                  const modId = `${lessonIndex}-${moduleIndex}`
                  const isActive = lessonIndex === currentLesson && moduleIndex === currentModule
                  const isCompleted = completedModules.includes(modId)
                  
                  return (
                    <div
                      key={moduleIndex}
                      onClick={() => {
                        setCurrentLesson(lessonIndex)
                        setCurrentModule(moduleIndex)
                        setModuleCompleted(false)
                        const progress = {
                          currentLesson: lessonIndex,
                          currentModule: moduleIndex,
                          completedModules
                        }
                        localStorage.setItem(progressKey, JSON.stringify(progress))
                      }}
                      className={`p-4 cursor-pointer border-l-4 transition-colors ${
                        isActive 
                          ? 'bg-blue-50 border-blue-500 text-blue-900' 
                          : 'border-transparent hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0">
                          {isCompleted ? (
                            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                          ) : (
                            <div className="w-6 h-6 border-2 border-gray-500 rounded-full flex items-center justify-center">
                              {moduleItem.type === 'video' ? (
                                <svg className="w-3 h-3 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                </svg>
                              ) : (
                                <svg className="w-3 h-3 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                                </svg>
                              )}
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className={`text-sm font-medium truncate ${isActive ? 'text-blue-900' : 'text-gray-900'}`}>{moduleItem.title}</div>
                          <div className={`text-xs ${isActive ? 'text-blue-700' : 'text-gray-600'}`}>{moduleItem.duration}</div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            ))}
            
            {validCompletedCount === totalModules && (
              <div className="p-6 bg-gradient-to-r from-green-50 to-blue-50 border-t border-gray-200">
                <div className="text-center mb-4">
                  <div className="text-2xl mb-2">🎉</div>
                  <h3 className="font-semibold text-gray-900 mb-1">Course Complete!</h3>
                  <p className="text-sm text-gray-600">Ready for your final assessment</p>
                </div>
                <button
                  onClick={startAssessment}
                  className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 rounded-xl hover:from-green-700 hover:to-blue-700 font-semibold transition-all duration-200 shadow-lg"
                >
                  Take Final Assessment
                </button>
              </div>
            )}
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="flex-1">
          {/* CONTENT AREA */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="aspect-video bg-black">
              {module.type === 'video' ? (
                module.content.includes('youtube.com') || module.content.includes('youtu.be') ? (
                  <iframe
                    className="w-full h-full"
                    src={module.content.replace('youtu.be/', 'youtube.com/embed/').replace('watch?v=', 'embed/').split('?')[0]}
                    title={module.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    onLoad={() => setTimeout(() => setModuleCompleted(true), 3000)}
                  ></iframe>
                ) : (
                  <video
                    controls
                    className="w-full h-full"
                    onEnded={handleModuleComplete}
                  >
                    <source src={module.content} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-10 h-10 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{module.title}</h3>
                    <p className="text-gray-600 mb-6">Click below to view the PDF materials</p>
                    <a
                      href={`/pdf-viewer?pdf=${encodeURIComponent(module.content)}&title=${encodeURIComponent(module.title)}&course=${encodeURIComponent(courseTitle)}&lesson=${currentLesson}&module=${currentModule}`}
                      className="bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 font-semibold inline-block transition-colors duration-200 shadow-lg"
                    >
                      📖 Open PDF
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* LESSON INFO & CONTROLS */}
            <div className="p-6 border-t border-gray-200">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-gray-900 mb-1">{lesson.title}</h2>
                  <p className="text-gray-600 mb-3">{module.title}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                      {module.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Lesson {currentLesson + 1}.{currentModule + 1}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  {module.type === 'video' ? (
                    <button
                      onClick={markModuleComplete}
                      disabled={!moduleCompleted}
                      className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                        moduleCompleted
                          ? 'bg-green-600 text-white hover:bg-green-700 shadow-lg'
                          : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {moduleCompleted ? '✓ Mark Complete' : 'Complete video to continue'}
                    </button>
                  ) : (
                    <div className="text-sm text-gray-600 bg-blue-50 px-4 py-2 rounded-lg">
                      📖 View PDF to mark as complete
                    </div>
                  )}
                </div>
              </div>
              
              {/* NAVIGATION */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <button
                  onClick={() => {
                    if (currentModule > 0) {
                      setCurrentModule(currentModule - 1)
                    } else if (currentLesson > 0) {
                      setCurrentLesson(currentLesson - 1)
                      setCurrentModule(lessons[currentLesson - 1].modules.length - 1)
                    }
                  }}
                  disabled={currentLesson === 0 && currentModule === 0}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                    currentLesson === 0 && currentModule === 0
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  ← Previous
                </button>
                
                <div className="text-sm text-gray-600">
                  {currentLesson + 1}.{currentModule + 1} of {lessons.length}.{lessons.reduce((sum, lesson) => sum + lesson.modules.length, 0)}
                </div>
                
                <button
                  onClick={() => {
                    if (currentModule < lessons[currentLesson].modules.length - 1) {
                      setCurrentModule(currentModule + 1)
                    } else if (currentLesson < lessons.length - 1) {
                      setCurrentLesson(currentLesson + 1)
                      setCurrentModule(0)
                    }
                  }}
                  disabled={currentLesson === lessons.length - 1 && currentModule === lessons[currentLesson].modules.length - 1}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                    currentLesson === lessons.length - 1 && currentModule === lessons[currentLesson].modules.length - 1
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Next →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function LearnPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center"><div className="text-lg">Loading course...</div></div>}>
      <LearnContent />
    </Suspense>
  )
}