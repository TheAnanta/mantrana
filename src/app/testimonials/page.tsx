import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'

export const metadata = {
  title: 'Testimonials | Mantrana by Mohana Rupa',
  description: 'Read testimonials and success stories from clients who have experienced transformation through therapy, counseling, and coaching with Mohana Rupa.',
}

interface Testimonial {
  id: string
  name: string
  text: string
  rating: number
  location?: string
  service?: string
  date?: string
  image?: string
}

// Extended testimonials data
const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah M.',
    text: 'Mohana\'s guidance helped me overcome my anxiety and find peace within myself. The sessions were transformative and I learned practical tools that I use daily.',
    rating: 5,
    location: 'Mumbai',
    service: 'Individual Therapy',
    date: 'November 2024',
  },
  {
    id: '2',
    name: 'Raj K.',
    text: 'Professional, compassionate, and incredibly insightful. My life coaching sessions have changed my perspective completely. I\'m now pursuing my dream career.',
    rating: 5,
    location: 'Delhi',
    service: 'Life Coaching',
    date: 'October 2024',
  },
  {
    id: '3',
    name: 'Priya S.',
    text: 'The workshops are amazing! I learned practical tools for managing stress and building better relationships. The group dynamic was so supportive.',
    rating: 5,
    location: 'Bangalore',
    service: 'Group Workshop',
    date: 'September 2024',
  },
  {
    id: '4',
    name: 'Amit P.',
    text: 'After struggling with depression for years, Mohana\'s therapy helped me rediscover joy and purpose. The holistic approach made all the difference.',
    rating: 5,
    location: 'Pune',
    service: 'Individual Therapy',
    date: 'August 2024',
  },
  {
    id: '5',
    name: 'Kavya R.',
    text: 'The relationship counseling sessions saved my marriage. Mohana taught us communication skills that we never knew we needed. Forever grateful.',
    rating: 5,
    location: 'Chennai',
    service: 'Couples Therapy',
    date: 'July 2024',
  },
  {
    id: '6',
    name: 'Rohit M.',
    text: 'Career transition anxiety was overwhelming until I started sessions with Mohana. The coaching helped me navigate my career change with confidence.',
    rating: 5,
    location: 'Hyderabad',
    service: 'Career Coaching',
    date: 'June 2024',
  },
]

export default function TestimonialsPage() {
  return (
    <main>
      <Header />

      {/* Hero Section */}
      <section className="section-padding bg-white pt-32">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Client Success Stories
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Real testimonials from individuals who have experienced positive transformation 
              through our therapy, counseling, and coaching services.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="section-padding bg-lavender/35">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white rounded-2xl p-8 shadow-soft hover:shadow-medium transition-all duration-300">
                {/* Rating */}
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-amaranth fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-gray-700 mb-6 leading-relaxed italic text-lg">
                  "{testimonial.text}"
                </p>

                {/* Client Info */}
                <div className="border-t pt-4">
                  <p className="font-semibold text-gray-900 mb-1">— {testimonial.name}</p>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm text-gray-500">
                    <div className="flex flex-col">
                      {testimonial.location && <span>{testimonial.location}</span>}
                      {testimonial.service && <span className="text-moss font-medium">{testimonial.service}</span>}
                    </div>
                    {testimonial.date && <span className="mt-1 sm:mt-0">{testimonial.date}</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Our Impact
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              These numbers represent real lives transformed through compassionate care and professional guidance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center bg-moss/40 rounded-2xl p-8">
              <div className="text-4xl lg:text-5xl font-bold text-moss mb-4">500+</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Clients Helped</h3>
              <p className="text-gray-600">Individuals who have found their path to wellness and growth</p>
            </div>

            <div className="text-center bg-amaranth/40 rounded-2xl p-8">
              <div className="text-4xl lg:text-5xl font-bold text-amaranth mb-4">98%</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Success Rate</h3>
              <p className="text-gray-600">Clients report significant improvement in their mental wellbeing</p>
            </div>

            <div className="text-center bg-azure/40 rounded-2xl p-8">
              <div className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">5+</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Years Experience</h3>
              <p className="text-gray-600">Dedicated to providing professional therapy and coaching services</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-moss/35">
        <div className="container-custom text-center">
          <div className="bg-moss rounded-3xl p-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-12 leading-relaxed">
              Join hundreds of others who have found healing, growth, and inner clarity. 
              Your transformation story could be next.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/book" className="btn-pill bg-white text-moss hover:bg-gray-50 text-lg px-10 py-5">
                Book a Session
              </Link>
              <Link href="/contact" className="btn-pill border-2 border-white text-white hover:bg-white hover:text-moss text-lg px-10 py-5">
                Ask Questions
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}