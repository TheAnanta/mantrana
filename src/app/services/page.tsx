import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'

export const metadata = {
  title: 'Professional Services | Mantrana by Mohana Rupa',
  description: 'Comprehensive therapy, counselling, and coaching services. Individual therapy, life coaching, group workshops, and specialized programs for mental wellness.',
}

export default function ServicesPage() {
  const services = [
    {
      id: 'individual-therapy',
      title: 'Individual Therapy & Counselling',
      icon: '🧠',
      description: 'Personalized one-on-one sessions to address your specific mental health needs and personal growth goals.',
      features: [
        'Anxiety and stress management',
        'Depression support and treatment',
        'Trauma recovery and healing',
        'Relationship and family issues',
        'Sleep disorders and insomnia',
        'Self-esteem and confidence building',
      ],
      approach: 'Using evidence-based approaches including Cognitive Behavioral Therapy (CBT), Mindfulness-Based Therapy, and Person-Centered Therapy.',
      duration: '50-minute sessions',
      frequency: 'Weekly or bi-weekly',
    },
    {
      id: 'life-coaching',
      title: 'Life Coaching',
      icon: '🎯',
      description: 'Goal-oriented coaching to help you achieve personal and professional success while maintaining balance.',
      features: [
        'Career development and transitions',
        'Goal setting and achievement',
        'Work-life balance optimization',
        'Leadership and communication skills',
        'Personal productivity enhancement',
        'Life purpose and direction clarification',
      ],
      approach: 'Solution-focused coaching methodology combined with positive psychology principles and practical action planning.',
      duration: '60-minute sessions',
      frequency: 'Bi-weekly or monthly',
    },
    {
      id: 'group-workshops',
      title: 'Group Workshops',
      icon: '👥',
      description: 'Interactive group sessions focusing on specific themes and skill development in a supportive environment.',
      features: [
        'Mindfulness and meditation practices',
        'Stress management techniques',
        'Emotional intelligence development',
        'Communication and relationship skills',
        'Anxiety management workshops',
        'Personal growth seminars',
      ],
      approach: 'Experiential learning through group discussions, practical exercises, and peer support.',
      duration: '2-3 hour workshops',
      frequency: 'Monthly sessions',
    },
    {
      id: 'specialized-programs',
      title: 'Specialized Programs',
      icon: '📋',
      description: 'Comprehensive, multi-session programs designed for specific needs and deeper transformation.',
      features: [
        '8-week Anxiety Recovery Program',
        '12-week Life Transformation Coaching',
        'Couples therapy and relationship counseling',
        'Teen and adolescent counseling',
        'Workplace wellness programs',
        'Corporate mental health training',
      ],
      approach: 'Structured programs combining multiple therapeutic modalities with ongoing support and progress tracking.',
      duration: 'Varies by program',
      frequency: 'Program-specific',
    },
  ]

  const packages = [
    {
      name: 'Single Session',
      price: '₹2,500',
      description: 'Perfect for trying our services or addressing specific immediate concerns.',
      features: ['50-minute session', 'Follow-up resources', 'Session recording available'],
    },
    {
      name: '3-Session Package',
      price: '₹6,750',
      originalPrice: '₹7,500',
      description: 'Ideal for focused work on specific goals or short-term support.',
      features: ['Three 50-minute sessions', 'Progress tracking', 'Email support between sessions', '10% discount'],
      popular: true,
    },
    {
      name: '5-Session Package',
      price: '₹10,000',
      originalPrice: '₹12,500',
      description: 'Comprehensive support for deeper exploration and lasting change.',
      features: ['Five 50-minute sessions', 'Detailed progress reports', 'Priority scheduling', '20% discount'],
    },
  ]

  return (
    <main>
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-lavender via-white to-azure">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
              Professional <span className="text-moss">Services</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
              Comprehensive mental health and wellness solutions tailored to your unique journey
            </p>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Our Service Categories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Each service is designed with your healing and growth in mind, offering professional 
              support for every stage of your wellness journey.
            </p>
          </div>

          <div className="space-y-16">
            {services.map((service, index) => (
              <div key={service.id} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}>
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <div className="flex items-center mb-6">
                    <div className="text-4xl mr-4">{service.icon}</div>
                    <h3 className="text-3xl lg:text-4xl font-bold text-gray-900">{service.title}</h3>
                  </div>
                  <p className="text-lg text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                  
                  <div className="mb-6">
                    <h4 className="text-xl font-bold text-gray-900 mb-3">What's Included:</h4>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-moss mr-2">•</span>
                          <span className="text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-gray-50 rounded-xl p-6 mb-6">
                    <h4 className="text-lg font-bold text-gray-900 mb-2">Approach</h4>
                    <p className="text-gray-600">{service.approach}</p>
                  </div>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-6">
                    <div><strong>Duration:</strong> {service.duration}</div>
                    <div><strong>Frequency:</strong> {service.frequency}</div>
                  </div>
                  
                  <Link href="/book" className="btn-pill btn-primary">
                    Book This Service
                  </Link>
                </div>
                
                <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                  <div className="bg-gradient-to-br from-azure to-lavender rounded-3xl h-64 lg:h-96 shadow-soft"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Service Packages
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Choose the package that best fits your needs and budget. All packages include 
              ongoing support and resources.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {packages.map((pkg, index) => (
              <div key={index} className={`bg-white rounded-2xl p-8 shadow-soft relative ${
                pkg.popular ? 'ring-2 ring-moss shadow-medium transform scale-105' : ''
              }`}>
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-moss text-white px-4 py-2 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                  <div className="mb-3">
                    <span className="text-3xl font-bold text-moss">{pkg.price}</span>
                    {pkg.originalPrice && (
                      <span className="text-lg text-gray-400 line-through ml-2">{pkg.originalPrice}</span>
                    )}
                  </div>
                  <p className="text-gray-600">{pkg.description}</p>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-moss mr-2">✓</span>
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link href="/book" className={`btn-pill w-full text-center block ${
                  pkg.popular ? 'btn-primary' : 'btn-secondary'
                }`}>
                  Choose This Package
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Our simple, supportive process ensures you get the help you need
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Initial Consultation',
                description: 'Free 15-minute discovery call to understand your needs and answer questions.',
              },
              {
                step: '02',
                title: 'Personalized Plan',
                description: 'We create a tailored approach based on your goals and preferences.',
              },
              {
                step: '03',
                title: 'Begin Sessions',
                description: 'Start your journey with regular sessions and ongoing support.',
              },
              {
                step: '04',
                title: 'Track Progress',
                description: 'Monitor your growth and adjust the approach as needed.',
              },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-moss text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-6">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-moss to-citron">
        <div className="container-custom text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Start Your Healing Journey?
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-12 leading-relaxed">
            Take the first step towards better mental health and personal growth. 
            Book your session today or start with a free consultation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/book" className="btn-pill bg-white text-moss hover:bg-gray-50 text-lg px-10 py-5">
              Book a Session
            </Link>
            <Link href="/contact" className="btn-pill border-2 border-white text-white hover:bg-white hover:text-moss text-lg px-10 py-5">
              Free Consultation
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}