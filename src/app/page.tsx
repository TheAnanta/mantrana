import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'

// Hero Section Component
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-white">
      <div className="absolute inset-0 bg-lavender/40"></div>
      <div className="relative container-custom text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Welcome to{' '}
            <span className="text-moss">Mantrana</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-4 font-medium">
            by Mohana Rupa
          </p>
          <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Counsellor • Therapist • Coach
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/book" className="btn-pill btn-primary text-lg px-10 py-5">
              Book a Session
            </Link>
            <Link href="/about" className="btn-pill btn-secondary text-lg px-10 py-5">
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

// About Preview Section
function AboutSection() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Who is Mohana Rupa?
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              A dedicated professional therapist, counsellor, and coach with years of experience 
              in helping individuals find their path to mental wellness and personal growth. 
              Mohana believes in the power of guidance and inner clarity to transform lives.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              <em>Mantrana</em> represents the philosophy of providing meaningful guidance 
              that leads to lasting positive change and inner peace.
            </p>
            <Link href="/about" className="btn-pill btn-primary">
              Read My Story
            </Link>
          </div>
          <div className="bg-azure/40 rounded-3xl h-96 lg:h-128 shadow-soft"></div>
        </div>
      </div>
    </section>
  )
}

// Services Section
function ServicesSection() {
  const services = [
    {
      title: 'Individual Therapy',
      description: 'Personalized therapy sessions for stress, anxiety, depression, and personal growth.',
      icon: '🧠',
    },
    {
      title: 'Life Coaching',
      description: 'Goal-oriented coaching for career growth, relationships, and self-development.',
      icon: '🎯',
    },
    {
      title: 'Group Workshops',
      description: 'Interactive workshops on mindfulness, emotional wellness, and relationship skills.',
      icon: '👥',
    },
    {
      title: 'Specialized Programs',
      description: 'Long-term support programs tailored to your specific needs and goals.',
      icon: '📋',
    },
  ]

  return (
    <section className="section-padding bg-azure/35">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Our Services
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Comprehensive mental health and wellness services designed to support 
            your journey towards healing and personal growth.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-soft hover:shadow-medium transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-4xl mb-6">{service.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h3>
              <p className="text-gray-600 leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link href="/services" className="btn-pill btn-primary">
            Explore All Services
          </Link>
        </div>
      </div>
    </section>
  )
}

// Testimonials Section
function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Sarah M.',
      text: 'Mohana\'s guidance helped me overcome my anxiety and find peace within myself. The sessions were transformative.',
      rating: 5,
    },
    {
      name: 'Raj K.',
      text: 'Professional, compassionate, and incredibly insightful. My life coaching sessions have changed my perspective completely.',
      rating: 5,
    },
    {
      name: 'Priya S.',
      text: 'The workshops are amazing! I learned practical tools for managing stress and building better relationships.',
      rating: 5,
    },
  ]

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            What Clients Say
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Real stories from people who have experienced positive transformation 
            through our services.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-lavender/40 rounded-2xl p-8 shadow-soft">
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-amaranth fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed italic">"{testimonial.text}"</p>
              <p className="font-semibold text-gray-900">— {testimonial.name}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link href="/testimonials" className="btn-pill btn-secondary">
            Read More Testimonials
          </Link>
        </div>
      </div>
    </section>
  )
}

// Blog Preview Section
function BlogSection() {
  const blogPosts = [
    {
      title: 'Understanding Anxiety: A Guide to Managing Daily Stress',
      excerpt: 'Learn practical techniques to manage anxiety and create a more peaceful daily routine.',
      category: 'Mental Health',
      readTime: '5 min read',
      slug: 'understanding-anxiety-managing-daily-stress',
    },
    {
      title: 'The Power of Mindfulness in Relationships',
      excerpt: 'Discover how mindfulness practices can improve communication and deepen connections.',
      category: 'Relationships',
      readTime: '7 min read',
      slug: 'power-of-mindfulness-in-relationships',
    },
    {
      title: 'Building Resilience: Tools for Life\'s Challenges',
      excerpt: 'Explore strategies to build emotional resilience and navigate life\'s ups and downs.',
      category: 'Personal Growth',
      readTime: '6 min read',
      slug: 'building-resilience-tools-for-challenges',
    },
  ]

  return (
    <section className="section-padding bg-lavender/35">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Latest Insights
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Helpful articles and insights on mental health, personal growth, 
            and wellness to support your journey.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <Link key={index} href={`/blog/${post.slug}`}>
              <article className="bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-medium transition-all duration-300 transform hover:-translate-y-2 cursor-pointer">
                <div className="bg-azure/45 h-48 relative">
                  <div className="absolute bottom-4 left-4">
                    <span className="text-xs font-medium text-moss bg-white/90 px-3 py-1 rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-gray-500">Recent</span>
                    <span className="text-sm text-gray-500">{post.readTime}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight hover:text-moss transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </article>
            </Link>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link href="/blog" className="btn-pill btn-primary">
            Read All Articles
          </Link>
        </div>
      </div>
    </section>
  )
}

// CTA Section
function CTASection() {
  return (
    <section className="section-padding bg-moss/35">
      <div className="container-custom text-center">
        <div className="bg-moss rounded-3xl p-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Begin Your Journey Today
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-12 leading-relaxed">
            Take the first step towards healing, growth, and inner clarity. 
            Book a session or start with a free consultation call.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/book" className="btn-pill bg-white text-moss hover:bg-gray-50 text-lg px-10 py-5">
              Book a Session
            </Link>
            <Link href="/contact" className="btn-pill border-2 border-white text-white hover:bg-white hover:text-moss text-lg px-10 py-5">
              Get in Touch
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function HomePage() {
  return (
    <main>
      <Header />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <TestimonialsSection />
      <BlogSection />
      <CTASection />
      <Footer />
    </main>
  )
}