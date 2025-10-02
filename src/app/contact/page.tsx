import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'

export const metadata = {
  title: 'Contact Mantrana | Get in Touch with Mohana Rupa',
  description: 'Contact Mohana Rupa for therapy, counselling, and coaching services. Book a session, ask questions, or schedule a free consultation call.',
}

export default function ContactPage() {
  return (
    <main>
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-lavender via-white to-azure">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
              Get in <span className="text-moss">Touch</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
              Ready to begin your journey? I'm here to help and answer any questions you may have.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Options */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-8">Send a Message</h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-moss focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-moss focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-moss focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-moss focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
                    Service Interest
                  </label>
                  <select
                    id="service"
                    name="service"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-moss focus:border-transparent"
                  >
                    <option value="">Select a service</option>
                    <option value="individual-therapy">Individual Therapy</option>
                    <option value="life-coaching">Life Coaching</option>
                    <option value="group-workshops">Group Workshops</option>
                    <option value="specialized-programs">Specialized Programs</option>
                    <option value="consultation">Free Consultation</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    placeholder="Tell me a bit about what you're looking for or any questions you have..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-moss focus:border-transparent resize-none"
                  ></textarea>
                </div>
                
                <div className="flex items-center">
                  <input
                    id="privacy"
                    name="privacy"
                    type="checkbox"
                    required
                    className="h-4 w-4 text-moss focus:ring-moss border-gray-300 rounded"
                  />
                  <label htmlFor="privacy" className="ml-2 block text-sm text-gray-700">
                    I agree to the{' '}
                    <Link href="/privacy" className="text-moss hover:text-moss/80 underline">
                      Privacy Policy
                    </Link>{' '}
                    and{' '}
                    <Link href="/terms" className="text-moss hover:text-moss/80 underline">
                      Terms of Service
                    </Link>
                  </label>
                </div>
                
                <button
                  type="submit"
                  className="btn-pill btn-primary w-full text-lg py-4"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-8">Contact Information</h2>
              
              <div className="space-y-8 mb-12">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-moss/10 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="text-moss text-xl">📧</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">Email</h3>
                    <p className="text-gray-600">hello@mantrana.com</p>
                    <p className="text-gray-600">info@mantrana.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-moss/10 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="text-moss text-xl">📱</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">Phone</h3>
                    <p className="text-gray-600">+91 8328438589</p>
                    <p className="text-sm text-gray-500">Available Mon-Fri, 9 AM - 6 PM IST</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-moss/10 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="text-moss text-xl">💬</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">WhatsApp</h3>
                    <p className="text-gray-600">+91 8328438589</p>
                    <Link href="https://wa.me/918328438589" className="text-moss hover:text-moss/80 text-sm">
                      Send WhatsApp Message →
                    </Link>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-moss/10 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="text-moss text-xl">📍</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">Location</h3>
                    <p className="text-gray-600">Mumbai, Maharashtra</p>
                    <p className="text-sm text-gray-500">Online sessions available worldwide</p>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-gradient-to-br from-lavender to-azure rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-4">
                  <Link href="/book" className="btn-pill btn-primary w-full text-center block">
                    Book a Session
                  </Link>
                  <Link href="mailto:hello@mantrana.com" className="btn-pill btn-secondary w-full text-center block">
                    Send Email
                  </Link>
                  <Link href="https://wa.me/918328438589" className="btn-pill btn-secondary w-full text-center block">
                    WhatsApp Chat
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Common questions about our services and process
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            {[
              {
                question: 'How do I book my first session?',
                answer: 'You can book your first session through our online booking system, or contact us directly via email or WhatsApp. We also offer a free 15-minute consultation call to discuss your needs.',
              },
              {
                question: 'Are online sessions as effective as in-person?',
                answer: 'Yes, research shows that online therapy can be just as effective as in-person sessions. Our secure platform ensures confidentiality while providing the convenience of accessing support from anywhere.',
              },
              {
                question: 'What should I expect in my first session?',
                answer: 'Your first session will focus on understanding your concerns, goals, and background. We\'ll discuss your expectations and create a personalized treatment plan together.',
              },
              {
                question: 'How long does therapy typically take?',
                answer: 'The duration varies based on individual needs and goals. Some people see improvements in a few sessions, while others benefit from longer-term support. We regularly review progress together.',
              },
              {
                question: 'Do you offer emergency support?',
                answer: 'While I don\'t provide 24/7 crisis support, I do offer emergency contact options for established clients. For immediate crisis support, please contact local emergency services or crisis helplines.',
              },
              {
                question: 'What are your session rates?',
                answer: 'Individual sessions start at ₹2,500. We also offer package deals with discounts for multiple sessions. Free consultation calls are available to discuss your needs and our services.',
              },
            ].map((faq, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-soft">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Office Hours */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-8">
                Office Hours & Availability
              </h2>
              <div className="space-y-6">
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="font-medium text-gray-900">Monday - Friday</span>
                  <span className="text-gray-600">9:00 AM - 6:00 PM IST</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="font-medium text-gray-900">Saturday</span>
                  <span className="text-gray-600">10:00 AM - 4:00 PM IST</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="font-medium text-gray-900">Sunday</span>
                  <span className="text-gray-600">By appointment only</span>
                </div>
              </div>
              <div className="mt-8 p-6 bg-gray-50 rounded-xl">
                <h3 className="font-bold text-gray-900 mb-2">Response Times</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Email inquiries: Within 24 hours</li>
                  <li>• WhatsApp messages: Within 2-4 hours</li>
                  <li>• Booking requests: Same day confirmation</li>
                </ul>
              </div>
            </div>
            <div className="bg-gradient-to-br from-moss to-citron rounded-3xl h-96 shadow-soft flex items-center justify-center">
              <div className="text-center text-white">
                <div className="text-4xl mb-4">⏰</div>
                <h3 className="text-2xl font-bold mb-2">Available for Support</h3>
                <p className="text-white/90">Ready to help you on your journey</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}