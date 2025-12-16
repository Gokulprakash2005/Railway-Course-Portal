'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useState, useEffect, Suspense } from 'react'

function PDFViewerContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pdfUrl = searchParams.get('pdf')
  const title = searchParams.get('title') || 'Course Material'
  const course = searchParams.get('course')
  const lesson = searchParams.get('lesson')
  const module = searchParams.get('module')

  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (!pdfUrl) {
      router.push('/courses')
    }
  }, [pdfUrl, router])

  const handleComplete = () => {
    // Mark module as completed and return to learn page
    if (course && lesson && module) {
      const userData = localStorage.getItem('user')
      if (userData) {
        const user = JSON.parse(userData)
        const progressKey = `progress_${user.email}_${course.replace(/\s+/g, '_')}`
        const savedProgress = localStorage.getItem(progressKey)
        const progress = savedProgress ? JSON.parse(savedProgress) : { 
          currentLesson: 0,
          currentModule: 0,
          completedModules: [] 
        }
        
        const moduleId = `${lesson}-${module}`
        if (!progress.completedModules.includes(moduleId)) {
          progress.completedModules.push(moduleId)
          localStorage.setItem(progressKey, JSON.stringify(progress))
        }
      }
      
      router.push(`/learn?course=${encodeURIComponent(course)}`)
    }
  }

  if (!pdfUrl) {
    return <div>Loading...</div>
  }

  return (
    <div className="h-screen w-screen bg-gray-900 overflow-hidden">
      <style jsx>{`
        iframe {
          -webkit-overflow-scrolling: touch;
        }
        @media (max-width: 768px) {
          iframe {
            zoom: 0.75;
          }
        }
      `}</style>
      {/* Header */}
      <div className="bg-white shadow-sm p-3 lg:p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 min-h-16">
        <div className="flex-1 min-w-0">
          <h1 className="text-lg lg:text-xl font-semibold truncate">{title}</h1>
          {course && <p className="text-xs lg:text-sm text-gray-600 truncate">{course}</p>}
        </div>
        <div className="flex flex-wrap gap-2 lg:gap-3">
          <a
            href={pdfUrl}
            download
            className="bg-blue-600 text-white px-3 lg:px-4 py-2 rounded hover:bg-blue-700 text-xs lg:text-sm whitespace-nowrap"
          >
            📥 Download
          </a>
          <button
            onClick={handleComplete}
            className="bg-green-600 text-white px-3 lg:px-4 py-2 rounded hover:bg-green-700 text-xs lg:text-sm whitespace-nowrap"
          >
            ✓ Complete
          </button>
          <button
            onClick={() => router.back()}
            className="bg-gray-600 text-white px-3 lg:px-4 py-2 rounded hover:bg-gray-700 text-xs lg:text-sm"
          >
            ← Back
          </button>
        </div>
      </div>

      {/* Full-page PDF Viewer */}
      <div className="h-[calc(100vh-5rem)] sm:h-[calc(100vh-4rem)] w-full bg-gray-800 overflow-auto">
        <iframe
          src={pdfUrl}
          className="w-full h-full border-0"
          title={title}
          onLoad={() => setIsLoaded(true)}
          style={{
            transform: 'scale(1)',
            transformOrigin: 'top left',
            overflow: 'auto'
          }}
        >
          <div className="flex items-center justify-center h-full text-white p-4">
            <div className="text-center">
              <p className="mb-4 text-sm lg:text-base">Your browser does not support PDF viewing.</p>
              <a
                href={pdfUrl}
                download
                className="bg-blue-600 text-white px-4 lg:px-6 py-2 lg:py-3 rounded hover:bg-blue-700 text-sm lg:text-base"
              >
                📥 Download PDF
              </a>
            </div>
          </div>
        </iframe>
      </div>
    </div>
  )
}

export default function PDFViewerPage() {
  return (
    <Suspense fallback={<div className="h-screen w-screen bg-gray-900 flex items-center justify-center"><div className="text-white text-lg">Loading PDF viewer...</div></div>}>
      <PDFViewerContent />
    </Suspense>
  )
}