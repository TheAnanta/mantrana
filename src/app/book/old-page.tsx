import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'

export const metadata = {
  title: 'Book a Session | Mantrana by Mohana Rupa',
  description: 'Book your therapy, counselling, or coaching session with Mohana Rupa. Choose from individual sessions or packages. Free consultation available.',
}

export default function BookPage() {
  const services = [
    {
      title: 'Individual Therapy',
      duration: '50 minutes',
      price: '₹2,500',
      description: 'One-on-one therapy session for personal growth and mental wellness.',
      features: ['Personalized approach', 'Confidential environment', 'Follow-up resources'],
    },
    {
      title: 'Life Coaching',
      duration: '60 minutes',
      price: '₹3,000',
      description: 'Goal-oriented coaching for career and personal development.',
      features: ['Action-oriented approach', 'Goal setting framework', 'Progress tracking'],
    },
    {
      title: 'Consultation Call',
      duration: '15 minutes',
      price: 'Free',
      description: 'Discovery call to discuss your needs and answer questions.',
      features: ['No commitment', 'Ask questions', 'Learn about services'],
      popular: true,
    },
  ]

  const packages = [
    {
      name: '3-Session Package',
      price: '₹6,750',
      originalPrice: '₹7,500',
      sessions: '3 sessions',
      savings: '10% discount',
      description: 'Perfect for focused work on specific goals',
    },
    {
      name: '5-Session Package',
      price: '₹10,000',
      originalPrice: '₹12,500',
      sessions: '5 sessions',
      savings: '20% discount',
      description: 'Comprehensive support for deeper transformation',
      popular: true,
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
              Book Your <span className="text-moss">Session</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed mb-8">
              Take the first step towards healing, growth, and inner clarity
            </p>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 max-w-md mx-auto">
              <p className="text-moss font-medium mb-2">✨ Special Offer</p>
              <p className="text-gray-700">Free 15-minute consultation call for all new clients</p>
            </div>
          </div>
        </div>
      </section>

      {/* Service Selection */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Choose Your Service
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Select the service that best matches your needs. Not sure? Start with a free consultation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
            {services.map((service, index) => (
              <div key={index} className={`bg-white rounded-2xl p-8 shadow-soft border-2 transition-all duration-300 hover:shadow-medium relative ${
                service.popular ? 'border-moss' : 'border-gray-200 hover:border-moss/50'
              }`}>
                {service.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-moss text-white px-4 py-2 rounded-full text-sm font-medium">
                      Recommended
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{service.title}</h3>
                  <div className="text-3xl font-bold text-moss mb-1">{service.price}</div>
                  <div className="text-gray-500">{service.duration}</div>
                </div>
                
                <p className="text-gray-600 mb-6 text-center">{service.description}</p>
                
                <ul className="space-y-2 mb-8">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      <span className="text-moss mr-2">✓</span>
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button className={`btn-pill w-full text-center ${
                  service.popular ? 'btn-primary' : 'btn-secondary'
                }`}>
                  Book {service.title}
                </button>
              </div>
            ))}
          </div>

          {/* Package Options */}
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-6">Or Choose a Package</h3>
            <p className="text-lg text-gray-600 mb-8">Save money with our session packages</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {packages.map((pkg, index) => (
              <div key={index} className={`bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-soft border-2 transition-all duration-300 hover:shadow-medium ${
                pkg.popular ? 'border-moss ring-2 ring-moss/20' : 'border-gray-200'
              }`}>
                {pkg.popular && (
                  <div className="text-center mb-4">
                    <span className="bg-moss text-white px-4 py-2 rounded-full text-sm font-medium">
                      Best Value
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                  <div className="mb-2">
                    <span className="text-3xl font-bold text-moss">{pkg.price}</span>
                    <span className="text-lg text-gray-400 line-through ml-2">{pkg.originalPrice}</span>
                  </div>
                  <div className="text-green-600 font-medium">{pkg.savings}</div>
                  <div className="text-gray-500 mt-1">{pkg.sessions}</div>
                </div>
                
                <p className="text-gray-600 mb-6 text-center">{pkg.description}</p>
                
                <button className={`btn-pill w-full text-center ${
                  pkg.popular ? 'btn-primary' : 'btn-secondary'
                }`}>
                  Choose {pkg.name}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Process */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Simple Booking Process
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Getting started is easy and straightforward
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                step: '1',
                title: 'Choose Service',
                description: 'Select the service or package that best fits your needs',
                icon: '📅',
              },
              {
                step: '2',
                title: 'Schedule Time',
                description: 'Pick a convenient date and time from available slots',
                icon: '⏰',
              },
              {
                step: '3',
                title: 'Secure Payment',
                description: 'Complete payment securely and receive confirmation',
                icon: '✅',
              },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-moss/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl">{item.icon}</span>
                </div>
                <div className="bg-moss text-white text-sm font-bold rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <div className="bg-white rounded-2xl p-8 shadow-soft max-w-md mx-auto">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Need Help Choosing?</h3>
              <p className="text-gray-600 mb-6">Not sure which service is right for you? Let's talk!</p>
              <button className="btn-pill btn-primary w-full">
                Schedule Free Consultation
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Payment & Security */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-8">
                Secure & Convenient Payment
              </h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-moss/10 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="text-moss text-xl">🔒</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">Secure Payments</h3>
                    <p className="text-gray-600">All transactions are encrypted and secure using industry-standard security protocols.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-moss/10 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="text-moss text-xl">💳</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">Multiple Payment Options</h3>
                    <p className="text-gray-600">Pay with credit/debit cards, UPI, net banking, or digital wallets.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-moss/10 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="text-moss text-xl">↩️</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">Flexible Cancellation</h3>
                    <p className="text-gray-600">24-hour cancellation policy with full refund for emergencies.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-moss to-citron rounded-3xl p-8 text-white text-center">
              <div className="text-4xl mb-6">🛡️</div>
              <h3 className="text-2xl font-bold mb-4">Your Privacy Matters</h3>
              <p className="text-white/90 mb-6">
                All sessions are completely confidential and conducted in a secure, 
                HIPAA-compliant environment.
              </p>
              <Link href="/privacy" className="btn-pill bg-white text-moss hover:bg-gray-50">
                View Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact for Questions */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Have Questions?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12 leading-relaxed">
            I'm here to help you feel comfortable and confident about taking this important step.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/contact" className="btn-pill btn-primary text-lg px-10 py-5">
              Get in Touch
            </Link>
            <Link href="https://wa.me/919876543210" className="btn-pill btn-secondary text-lg px-10 py-5">
              WhatsApp Chat
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}