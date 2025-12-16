export default function Features() {
  const cardStyles = `
    .animated-card {
      position: relative;
      overflow: hidden;
      transition: all 0.5s ease-in-out;
    }
    
    .animated-card::before {
      content: '';
      position: absolute;
      inset: 0px;
      border: 2px solid #bd9f67;
      opacity: 0;
      transform: rotate(10deg);
      transition: all 0.5s ease-in-out;
      border-radius: 1rem;
    }
    
    .animated-card::after {
      content: '';
      position: absolute;
      right: 0;
      top: 0;
      height: 100%;
      width: 100%;
      opacity: 0;
      transition: all 0.5s ease-in-out;
    }
    
    .animated-card:hover {
      transform: scale(1.05);
      border-radius: 0.5rem;
    }
    
    .animated-card:hover::before {
      inset: 15px;
      opacity: 1;
      transform: rotate(0);
    }
    
    .animated-card:hover::after {
      animation: trail 1s ease-in-out;
    }
    
    @keyframes trail {
      0% {
        background: linear-gradient(90deg, rgba(189, 159, 103, 0) 90%, rgb(189, 159, 103) 100%);
        opacity: 0;
      }
      30% {
        background: linear-gradient(90deg, rgba(189, 159, 103, 0) 70%, rgb(189, 159, 103) 100%);
        opacity: 1;
      }
      70% {
        background: linear-gradient(90deg, rgba(189, 159, 103, 0) 70%, rgb(189, 159, 103) 100%);
        opacity: 1;
      }
      95% {
        background: linear-gradient(90deg, rgba(189, 159, 103, 0) 90%, rgb(189, 159, 103) 100%);
        opacity: 0;
      }
    }
  `
  const features = [
    {
      title: "Railway Expertise",
      description: "Learn from certified railway professionals and industry veterans with decades of experience",
      icon: "🚂",
      color: "bg-blue-50 text-blue-600"
    },
    {
      title: "Flexible Learning",
      description: "Self-paced courses designed for working railway professionals with 24/7 access",
      icon: "📚",
      color: "bg-green-50 text-green-600"
    },
    {
      title: "Official Certification",
      description: "Earn recognized certificates from Southern Railway to advance your career",
      icon: "🏅",
      color: "bg-orange-50 text-orange-600"
    },
    {
      title: "Practical Training",
      description: "Hands-on simulations and real-world scenarios for comprehensive learning",
      icon: "⚙️",
      color: "bg-purple-50 text-purple-600"
    },
    {
      title: "Safety First",
      description: "Comprehensive safety protocols and emergency procedures training",
      icon: "🛡️",
      color: "bg-red-50 text-red-600"
    },
    {
      title: "Career Growth",
      description: "Structured learning paths for promotions and skill development",
      icon: "📈",
      color: "bg-indigo-50 text-indigo-600"
    }
  ]

  return (
    <>
      <style jsx>{cardStyles}</style>
      <section className="py-20 bg-orange-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Southern Railway Learning</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive railway training designed by experts, for experts. Advance your career with industry-leading courses.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="animated-card group hover:shadow-2xl transition-all duration-500 p-8 rounded-2xl border border-gray-200 bg-white">
                <div className={`w-16 h-16 rounded-2xl ${feature.color} flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-300 relative z-10`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 relative z-10">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed relative z-10">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}