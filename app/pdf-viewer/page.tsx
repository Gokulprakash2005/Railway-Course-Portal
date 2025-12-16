'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function PDFViewerPage() {
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
      const progressKey = `progress_${course.replace(/\s+/g, '_')}`
      const savedProgress = localStorage.getItem(progressKey)
      const progress = savedProgress ? JSON.parse(savedProgress) : { completedModules: [] }
      
      const moduleId = `${lesson}-${module}`
      if (!progress.completedModules.includes(moduleId)) {
        progress.completedModules.push(moduleId)
        localStorage.setItem(progressKey, JSON.stringify(progress))
      }
      
      router.push(`/learn?course=${encodeURIComponent(course)}`)
    }
  }

  if (!pdfUrl) {
    return <div>Loading...</div>
  }

  return (
    <div className="h-screen w-screen bg-gray-900 overflow-hidden">
      {/* Header */}
      <div className="bg-white shadow-sm p-4 flex justify-between items-center h-16">
        <div>
          <h1 className="text-xl font-semibold">{title}</h1>
          {course && <p className="text-sm text-gray-600">{course}</p>}
        </div>
        <div className="flex gap-3">
          <a
            href={pdfUrl}
            download
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
          >
            Download PDF
          </a>
          <button
            onClick={handleComplete}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm"
          >
            Mark Complete & Return
          </button>
          <button
            onClick={() => router.back()}
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 text-sm"
          >
            Back
          </button>
        </div>
      </div>

      {/* Full-page PDF Viewer */}
      <div className="h-[calc(100vh-4rem)] w-full bg-gray-800">
        <iframe
          src={pdfUrl}
          className="w-full h-full border-0"
          title={title}
          onLoad={() => setIsLoaded(true)}
        >
          <div className="flex items-center justify-center h-full text-white">
            <div className="text-center">
              <p className="mb-4">Your browser does not support PDF viewing.</p>
              <a
                href={pdfUrl}
                download
                className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
              >
                Download PDF
              </a>
            </div>
          </div>
        </iframe>
      </div>
    </div>
  )
}