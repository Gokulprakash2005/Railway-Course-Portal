'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

function CertificateContent() {
  const [user, setUser] = useState<any>(null)
  const searchParams = useSearchParams()

  const courseTitle = searchParams.get('course') || 'Your Course Name'

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) setUser(JSON.parse(userData))
  }, [])

  const currentDate = new Date().toLocaleDateString('en-IN', {
    month: 'long',
    year: 'numeric',
  })

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center py-10 print:bg-white">
      <div className="relative bg-white w-[1100px] h-[780px] shadow-2xl print:shadow-none overflow-hidden">

        {/* RIGHT BLUE STRIP */}
        <div className="absolute top-0 right-0 h-full w-[90px] bg-[#0b4ea2]" />
        <div className="absolute top-0 right-[90px] h-full w-[14px] bg-[#f5b301]" />

        {/* CONTENT */}
        <div className="relative z-10 px-20 py-14 h-full flex flex-col justify-between">

          {/* HEADER */}
          <div>
            <div className="flex items-center gap-4 mb-6">
              <Image src="/logo.png" alt="Logo" width={90} height={90} />
              <h1 className="text-3xl font-semibold text-[#0b4ea2]">
                Railway Learning
              </h1>
            </div>

            <h2 className="text-4xl font-serif font-bold mb-6">
              CERTIFICATE OF COMPLETION
            </h2>

            <p className="text-lg text-gray-700 mb-8">
              Presented to
            </p>

            <h3 className="text-4xl font-bold text-[#0b4ea2] mb-6">
              {user?.name || 'YOUR NAME'}
            </h3>

            <p className="text-lg text-gray-700 mb-4">
              For successfully completing an online course
            </p>

            <p className="text-2xl font-semibold mb-6">
              {courseTitle}
            </p>

            <p className="text-gray-600">
              Course completed on {currentDate}
            </p>
          </div>

          {/* FOOTER */}
          <div className="flex justify-between items-end mt-10">
            <div>
              <div className="border-t border-black w-56 mb-2" />
              <p className="font-semibold">Authorized Signatory</p>
              <p className="text-sm text-gray-600">
                Railway Training Authority
              </p>
            </div>

            <div className="text-right" style={{marginRight: '50px'}}>
              <Image
                src="/logo.png"
                alt="QR"
                width={80}
                height={80}
                className="mb-2"
              />
              <p className="text-xs text-gray-600">
                Verified Certificate
              </p>
            </div>
          </div>

        </div>
      </div>


    </div>
  )
}

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-200 flex items-center justify-center"><div className="text-lg">Loading certificate...</div></div>}>
      <CertificateContent />
    </Suspense>
  )
}
