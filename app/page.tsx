'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Header from './components/landing/Header'
import Hero from './components/landing/Hero'
import Features from './components/landing/Features'
import PopularCourses from './components/landing/PopularCourses'
import Footer from './components/landing/Footer'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    const user = localStorage.getItem('user')
    if (user) {
      router.push('/courses')
    }
  }, [])

  return (
    <div >
      <Header />
    
        <Hero />
        <PopularCourses />
        <Features />      
        <Footer />
      </div>
    
  )
}