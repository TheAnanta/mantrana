import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'

export const metadata = {
  title: 'About Mantrana | Mohana Rupa - Professional Therapist & Coach',
  description: 'Learn about Mohana Rupa\'s journey, philosophy, and professional approach to therapy, counselling, and coaching. Discover the meaning behind Mantrana.',
}

export default function AboutPage() {
  return (
    <main>
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-lavender via-white to-azure">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
              About <span className="text-moss">Mantrana</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
              The Philosophy of Guidance & Inner Clarity
            </p>
          </div>
        </div>
      </section>

      {/* Personal Journey Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="bg-gradient-to-br from-azure to-lavender rounded-3xl h-96 lg:h-128 shadow-soft"></div>
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-8">
                Meet Mohana Rupa
              </h2>
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p>
                  With over a decade of experience in mental health and wellness, I am passionate about 
                  helping individuals navigate life's challenges and discover their inner strength. My journey 
                  began with a personal understanding of the transformative power of therapy and self-discovery.
                </p>
                <p>
                  I believe that every person has the capacity for growth, healing, and positive change. 
                  Through compassionate guidance and evidence-based approaches, I support clients in 
                  developing the tools they need to thrive.
                </p>
                <p>
                  <em>Mantrana</em>, meaning "guidance" in Sanskrit, represents my commitment to providing 
                  meaningful direction that leads to lasting positive transformation and inner peace.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              My Philosophy
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              The principles that guide my practice and approach to healing
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-soft text-center">
              <div className="w-16 h-16 bg-moss/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl text-moss">🌱</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Growth Mindset</h3>
              <p className="text-gray-600 leading-relaxed">
                Every challenge is an opportunity for growth. I believe in the inherent capacity 
                of individuals to heal and evolve.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-soft text-center">
              <div className="w-16 h-16 bg-moss/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl text-moss">🤝</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Collaborative Approach</h3>
              <p className="text-gray-600 leading-relaxed">
                Healing happens in partnership. Together, we create a safe space for 
                exploration and transformation.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-soft text-center">
              <div className="w-16 h-16 bg-moss/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl text-moss">💝</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Holistic Wellness</h3>
              <p className="text-gray-600 leading-relaxed">
                True healing addresses mind, body, and spirit. I consider all aspects 
                of your well-being in our work together.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Credentials Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-8">
                Qualifications & Experience
              </h2>
              <div className="space-y-6">
                <div className="border-l-4 border-moss pl-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Education</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Master's in Clinical Psychology</li>
                    <li>• Certified Cognitive Behavioral Therapist</li>
                    <li>• Professional Life Coach Certification</li>
                    <li>• Mindfulness-Based Therapy Training</li>
                  </ul>
                </div>
                
                <div className="border-l-4 border-amaranth pl-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Professional Experience</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• 10+ years in private practice</li>
                    <li>• 500+ clients supported</li>
                    <li>• Workshop facilitator and speaker</li>
                    <li>• Mental health advocate</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-8">
                Professional Affiliations
              </h2>
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="font-bold text-gray-900 mb-2">Indian Association of Clinical Psychologists</h3>
                  <p className="text-gray-600">Licensed practicing member</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="font-bold text-gray-900 mb-2">International Coach Federation</h3>
                  <p className="text-gray-600">Certified professional coach</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="font-bold text-gray-900 mb-2">Mindfulness-Based Therapy Institute</h3>
                  <p className="text-gray-600">Certified practitioner</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-gradient-to-r from-moss to-citron">
        <div className="container-custom text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-8">
            Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { title: 'Compassion', description: 'Every interaction is rooted in kindness and understanding' },
              { title: 'Integrity', description: 'Honest, ethical practice with complete confidentiality' },
              { title: 'Excellence', description: 'Continuous learning and evidence-based approaches' },
              { title: 'Empowerment', description: 'Building your inner strength and self-reliance' },
            ].map((value, index) => (
              <div key={index} className="text-center">
                <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                <p className="text-white/90 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-white">
        <div className="container-custom text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Ready to Begin Your Journey?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12 leading-relaxed">
            Take the first step towards healing and personal growth. I'm here to support you 
            every step of the way.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/book" className="btn-pill btn-primary text-lg px-10 py-5">
              Book a Session
            </Link>
            <Link href="/contact" className="btn-pill btn-secondary text-lg px-10 py-5">
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}