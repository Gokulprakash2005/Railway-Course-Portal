'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import jsPDF from 'jspdf'

function AssessmentContent() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [showResults, setShowResults] = useState(false)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(1800) // 30 minutes
  const searchParams = useSearchParams()
  const router = useRouter()
  const courseTitle = searchParams.get('course') || 'Course'

  const questions = [
    {
      question: "What is the primary purpose of railway safety management systems?",
      options: [
        "To increase train speed and efficiency",
        "To prevent accidents and ensure safe operations", 
        "To reduce operational costs",
        "To improve passenger comfort"
      ],
      correct: 1
    },
    {
      question: "Which signal indicates that a train must stop immediately?",
      options: ["Green signal", "Yellow signal", "Red signal", "Blue signal"],
      correct: 2
    },
    {
      question: "What is the standard gauge width used in Indian Railways?",
      options: ["1435 mm", "1676 mm", "1000 mm", "762 mm"],
      correct: 1
    },
    {
      question: "Which safety device prevents trains from colliding?",
      options: ["ATP (Automatic Train Protection)", "Air brakes", "Speedometer", "Radio communication"],
      correct: 0
    },
    {
      question: "What does SPAD stand for in railway terminology?",
      options: [
        "Signal Passed at Danger",
        "Speed Passed at Danger",
        "Station Passed at Danger", 
        "Safety Passed at Danger"
      ],
      correct: 0
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          calculateScore()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = answerIndex
    setAnswers(newAnswers)
  }

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      calculateScore()
    }
  }

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const calculateScore = () => {
    let correct = 0
    answers.forEach((answer, index) => {
      if (answer === questions[index].correct) {
        correct++
      }
    })
    const percentage = (correct / questions.length) * 100
    setScore(percentage)
    setShowResults(true)
  }

  const generateCertificate = () => {
    if (score >= 80) {
      const pdf = new jsPDF('landscape', 'mm', 'a4')
      const pageWidth = pdf.internal.pageSize.getWidth()
      const pageHeight = pdf.internal.pageSize.getHeight()
      
      // Background
      pdf.setFillColor(255, 255, 255)
      pdf.rect(0, 0, pageWidth, pageHeight, 'F')
      
      // Border
      pdf.setDrawColor(11, 78, 162)
      pdf.setLineWidth(3)
      pdf.rect(10, 10, pageWidth - 20, pageHeight - 20)
      
      // Header
      pdf.setFontSize(28)
      pdf.setTextColor(11, 78, 162)
      pdf.text('RAILWAY TRAINING', pageWidth / 2, 40, { align: 'center' })
      
      pdf.setFontSize(16)
      pdf.text('PROFESSIONAL CERTIFICATION', pageWidth / 2, 50, { align: 'center' })
      
      // Certificate Title
      pdf.setFontSize(24)
      pdf.setTextColor(0, 0, 0)
      pdf.text('CERTIFICATE OF ACHIEVEMENT', pageWidth / 2, 70, { align: 'center' })
      
      // Content
      pdf.setFontSize(14)
      pdf.text('This is to certify that', pageWidth / 2, 90, { align: 'center' })
      
      // Student Name
      const userData = localStorage.getItem('user')
      const userName = userData ? JSON.parse(userData).name : 'STUDENT NAME'
      pdf.setFontSize(20)
      pdf.setTextColor(11, 78, 162)
      pdf.text(userName.toUpperCase(), pageWidth / 2, 110, { align: 'center' })
      
      // Course completion text
      pdf.setFontSize(14)
      pdf.setTextColor(0, 0, 0)
      pdf.text('has successfully completed the professional training course', pageWidth / 2, 125, { align: 'center' })
      
      // Course Title
      pdf.setFontSize(18)
      pdf.setTextColor(11, 78, 162)
      const lines = pdf.splitTextToSize(courseTitle, pageWidth - 60)
      pdf.text(lines, pageWidth / 2, 140, { align: 'center' })
      
      // Score
      pdf.setFontSize(14)
      pdf.setTextColor(0, 0, 0)
      pdf.text(`Final Assessment Score: ${score.toFixed(0)}%`, pageWidth / 2, 160, { align: 'center' })
      
      // Date
      const currentDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
      pdf.text(`Date of Completion: ${currentDate}`, pageWidth / 2, 175, { align: 'center' })
      
      // Certificate ID
      const certId = `RT-${new Date().getFullYear()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`
      pdf.setFontSize(10)
      pdf.text(`Certificate ID: ${certId}`, pageWidth / 2, 190, { align: 'center' })
      
      // Download PDF
      pdf.save(`${courseTitle.replace(/[^a-zA-Z0-9]/g, '_')}_Certificate.pdf`)
    }
  }

  if (showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <img src="/logo.png" alt="Logo" className="w-8 h-8" />
              <span className="font-semibold text-gray-800">Southern Railway</span>
            </Link>
            <div className="text-sm text-gray-600">Assessment Complete</div>
          </div>
        </div>

        <div className="max-w-2xl mx-auto py-12 px-6">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="mb-8">
              <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-6 ${
                score >= 80 ? 'bg-green-100' : 'bg-red-100'
              }`}>
                <span className={`text-4xl ${
                  score >= 80 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {score >= 80 ? '🎉' : '😔'}
                </span>
              </div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Assessment Complete!</h1>
              <p className="text-gray-600">{courseTitle}</p>
            </div>

            <div className="mb-8">
              <div className={`text-5xl font-bold mb-4 ${
                score >= 80 ? 'text-green-600' : 'text-red-600'
              }`}>
                {score.toFixed(0)}%
              </div>
              <p className="text-lg text-gray-600 mb-6">
                You answered {answers.filter((answer, index) => answer === questions[index].correct).length} out of {questions.length} questions correctly
              </p>
              
              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-gray-800">{questions.length}</div>
                    <div className="text-sm text-gray-600">Total Questions</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">
                      {answers.filter((answer, index) => answer === questions[index].correct).length}
                    </div>
                    <div className="text-sm text-gray-600">Correct</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-red-600">
                      {questions.length - answers.filter((answer, index) => answer === questions[index].correct).length}
                    </div>
                    <div className="text-sm text-gray-600">Incorrect</div>
                  </div>
                </div>
              </div>
            </div>
            
            {score >= 80 ? (
              <div>
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
                  <p className="text-green-800 font-semibold">🎉 Congratulations! You passed the assessment!</p>
                  <p className="text-green-700 text-sm mt-1">You've successfully demonstrated your knowledge in {courseTitle}</p>
                </div>
                <div className="flex gap-3 justify-center">
                  <button
                    onClick={generateCertificate}
                    className="bg-green-600 text-white px-8 py-3 rounded-xl hover:bg-green-700 font-semibold transition-colors"
                  >
                    📄 Download Certificate PDF
                  </button>
                  <Link href="/dashboard">
                    <button className="bg-gray-100 text-gray-700 px-8 py-3 rounded-xl hover:bg-gray-200 font-semibold transition-colors">
                      Back to Dashboard
                    </button>
                  </Link>
                </div>
              </div>
            ) : (
              <div>
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
                  <p className="text-red-800 font-semibold">You need 80% or above to pass</p>
                  <p className="text-red-700 text-sm mt-1">Don't worry! Review the material and try again</p>
                </div>
                <div className="flex gap-3 justify-center">
                  <button
                    onClick={() => window.location.reload()}
                    className="bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 font-semibold transition-colors"
                  >
                    🔄 Retake Assessment
                  </button>
                  <Link href="/dashboard">
                    <button className="bg-gray-100 text-gray-700 px-8 py-3 rounded-xl hover:bg-gray-200 font-semibold transition-colors">
                      Back to Dashboard
                    </button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 lg:px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <Link href="/" className="flex items-center gap-3">
            <img src="/logo.png" alt="Logo" className="w-8 h-8" />
            <span className="font-semibold text-gray-800 text-sm lg:text-base">Southern Railway</span>
          </Link>
          <div className="flex items-center gap-3 lg:gap-6">
            <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${
              timeLeft < 300 ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
            }`}>
              <span className="text-sm">⏱</span>
              <span className="font-mono font-semibold text-sm">{formatTime(timeLeft)}</span>
            </div>
            <button
              onClick={calculateScore}
              className="text-xs lg:text-sm text-gray-600 hover:text-gray-800 px-3 py-1 rounded-lg hover:bg-gray-100 whitespace-nowrap"
            >
              Submit Early
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-4 lg:py-8 px-4 lg:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6">
          {/* Question Navigation Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
              <h3 className="font-semibold text-gray-800 mb-4">Questions</h3>
              <div className="grid grid-cols-5 lg:grid-cols-1 gap-2">
                {questions.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentQuestion(index)}
                    className={`w-10 h-10 lg:w-full lg:h-12 rounded-lg font-semibold text-sm transition-all ${
                      index === currentQuestion
                        ? 'bg-blue-600 text-white'
                        : answers[index] !== undefined
                        ? 'bg-green-100 text-green-700 hover:bg-green-200'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t">
                <div className="text-sm text-gray-600 mb-2">Progress</div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(answers.filter(a => a !== undefined).length / questions.length) * 100}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {answers.filter(a => a !== undefined).length} of {questions.length} answered
                </div>
              </div>
            </div>
          </div>

          {/* Main Question Area */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-lg p-4 lg:p-8">
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-semibold">{currentQuestion + 1}</span>
                    </div>
                    <div>
                      <h1 className="text-xl font-bold text-gray-800">{courseTitle}</h1>
                      <p className="text-sm text-gray-600">Question {currentQuestion + 1} of {questions.length}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-lg lg:text-2xl font-semibold text-gray-800 mb-6 lg:mb-8 leading-relaxed">
                  {questions[currentQuestion].question}
                </h2>
                <div className="space-y-4">
                  {questions[currentQuestion].options.map((option, index) => (
                    <label 
                      key={index} 
                      className={`flex items-start p-4 border-2 rounded-xl cursor-pointer transition-all hover:shadow-md ${
                        answers[currentQuestion] === index
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center h-6">
                        <input
                          type="radio"
                          name="answer"
                          value={index}
                          checked={answers[currentQuestion] === index}
                          onChange={() => handleAnswer(index)}
                          className="w-5 h-5 text-blue-600 border-2 border-gray-300 focus:ring-blue-500"
                        />
                      </div>
                      <span className="ml-4 text-gray-700 leading-relaxed">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between pt-6 border-t gap-4">
                <button
                  onClick={prevQuestion}
                  disabled={currentQuestion === 0}
                  className={`flex items-center justify-center gap-2 px-4 lg:px-6 py-3 rounded-xl font-semibold transition-all w-full sm:w-auto ${
                    currentQuestion === 0
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  ← Previous
                </button>

                <div className="text-xs lg:text-sm text-gray-500 text-center">
                  {answers[currentQuestion] !== undefined ? '✓ Answered' : 'Select an answer'}
                </div>

                <button
                  onClick={nextQuestion}
                  className={`flex items-center justify-center gap-2 px-4 lg:px-6 py-3 rounded-xl font-semibold transition-all w-full sm:w-auto ${
                    answers[currentQuestion] !== undefined
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {currentQuestion === questions.length - 1 ? 'Finish' : 'Next →'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function AssessmentPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center"><div className="text-lg">Loading assessment...</div></div>}>
      <AssessmentContent />
    </Suspense>
  )
}