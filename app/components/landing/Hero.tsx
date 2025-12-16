'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

const slides = [
  {
    title: 'Railway Safety & Operations',
    description:
      'Master railway safety protocols, operational procedures, and emergency management systems.',
    button: 'Start Learning',
    image: '/Gemini_Generated_Image_7n00r67n00r67n00.png',
  },
  {
    title: 'Signal & Telecommunication',
    description:
      'Learn advanced signaling systems, communication protocols, and modern railway technology.',
    button: 'Explore Course',
    image: '/Gemini_Generated_Image_788h1u788h1u788h.png',
  },
  {
    title: 'Railway Engineering & Maintenance',
    description:
      'Comprehensive training on track maintenance, rolling stock, and infrastructure management.',
    button: 'Begin Training',
    image: '/Gemini_Generated_Image_k4vd1ak4vd1ak4vd.png',
  },
]

export default function Hero() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const i = setInterval(() => {
      setCurrent((p) => (p + 1) % slides.length)
    }, 5000)
    return () => clearInterval(i)
  }, [])

  const slide = slides[current]

  return (
    <>
      {/* HERO SECTION */}
      <section className="bg-[#fde7cf] pt-34 pb-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

          {/* LEFT TEXT */}
          <div>
            

            <h1 className="text-4xl lg:text-5xl font-semibold text-orange-500 mb-6">
              {slide.title}
            </h1>

            <p className="text-gray-700 text-lg max-w-xl mb-8">
              {slide.description}
            </p>

            <button className="bg-orange-400 text-white px-8 py-3 rounded-full font-medium hover:bg-orange-500">
              {slide.button}
            </button>

            {/* DOTS */}
            <div className="flex gap-3 mt-10">
              {slides.map((_, i) => (
                <span
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2.5 h-2.5 rounded-full cursor-pointer ${
                    i === current ? 'bg-orange-500' : 'bg-orange-200'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* RIGHT IMAGE CARD */}
          <div className="relative bg-white rounded-xl shadow-md overflow-hidden h-[380px]">
            <Image
              src={slide.image}
              alt="slide"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* BOTTOM BLUE STATS BAR */}
      <section className="bg-[#1f4fa3] py-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 text-white">
          <div className="text-center">
            <p className="text-2xl font-semibold">14,464,684</p>
            <p className="text-sm opacity-90 mt-1">
              Total  Onboarded
            </p>
          </div>

          <div className="text-center">
            <p className="text-2xl font-semibold">3,968</p>
            <p className="text-sm opacity-90 mt-1">
              Total Courses
            </p>
          </div>

          <div className="text-center">
            <p className="text-2xl font-semibold">63,652,881</p>
            <p className="text-sm opacity-90 mt-1">
              Total Completions
            </p>
          </div>

          <div className="text-center">
            <p className="text-2xl font-semibold">1,258,439</p>
            <p className="text-sm opacity-90 mt-1">
              Monthly Active Users
            </p>
          </div>

          <div className="text-center">
            <p className="text-2xl font-semibold">99,498</p>
            <p className="text-sm opacity-90 mt-1">
              Certificates Issued Yesterday
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
