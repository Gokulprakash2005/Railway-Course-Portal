import Link from 'next/link'

export default function Footer() {
  const footerLinks = {
    courses: [
      { name: "Railway Safety", href: "/courses" },
      { name: "Signal Systems", href: "/courses" },
      { name: "Track Engineering", href: "/courses" },
      { name: "Operations", href: "/courses" }
    ],
    support: [
      { name: "Help Center", href: "/help" },
      { name: "Contact Us", href: "/contact" },
      { name: "Technical Support", href: "/support" },
      { name: "Training Resources", href: "/resources" }
    ],
    company: [
      { name: "About Southern Railway", href: "/about" },
      { name: "Careers", href: "/careers" },
      { name: "News & Updates", href: "/news" },
      { name: "Training Centers", href: "/centers" }
    ],
    legal: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Cookie Policy", href: "/cookies" },
      { name: "Accessibility", href: "/accessibility" }
    ]
  }

  return (
    <footer className="bg-gray-900 text-white">
      {/* MAIN FOOTER */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* BRAND SECTION */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <img src="/logo.png" alt="Logo" className="w-12 h-12 rounded-xl" />
              <div>
                <h3 className="text-xl font-bold">Southern Railway</h3>
                <p className="text-gray-400 text-sm">Learning & Development</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Empowering railway professionals with comprehensive training programs, 
              safety protocols, and career development opportunities across the Southern Railway network.
            </p>
            
            {/* SOCIAL LINKS */}
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                <span className="text-sm">📘</span>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-400 transition-colors">
                <span className="text-sm">🐦</span>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                <span className="text-sm">💼</span>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors">
                <span className="text-sm">📺</span>
              </a>
            </div>
          </div>

          {/* COURSES */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Courses</h4>
            <ul className="space-y-3">
              {footerLinks.courses.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="text-gray-400 hover:text-white transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* SUPPORT */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="text-gray-400 hover:text-white transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COMPANY */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="text-gray-400 hover:text-white transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* NEWSLETTER SECTION */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="mb-4 md:mb-0">
              <h4 className="font-semibold text-lg mb-2">Stay Updated</h4>
              <p className="text-gray-400 text-sm">Get the latest training updates and railway news</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 w-full sm:w-64"
              />
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <div className="mb-4 md:mb-0">
              <p>&copy; 2024 Southern Railway. All rights reserved.</p>
            </div>
            <div className="flex space-x-6">
              {footerLinks.legal.map((link, index) => (
                <Link key={index} href={link.href} className="hover:text-white transition-colors">
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}