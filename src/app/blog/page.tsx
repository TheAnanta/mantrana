import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'

export const metadata = {
  title: 'Blog | Mantrana by Mohana Rupa',
  description: 'Insights and articles on mental health, personal growth, and wellness from Mohana Rupa.',
}

interface BlogPost {
  slug: string
  title: string
  excerpt: string
  category: string
  readTime: string
  publishedAt: string
  author: {
    name: string
    role: string
  }
  image: string
}

// Sample blog posts data
const blogPosts: BlogPost[] = [
  {
    slug: 'understanding-anxiety-managing-daily-stress',
    title: 'Understanding Anxiety: A Guide to Managing Daily Stress',
    excerpt: 'Learn practical techniques to manage anxiety and create a more peaceful daily routine with evidence-based strategies.',
    category: 'Mental Health',
    readTime: '5 min read',
    publishedAt: 'Nov 15, 2024',
    author: {
      name: 'Mohana Rupa',
      role: 'Licensed Therapist & Coach'
    },
    image: '/api/placeholder/400/250'
  },
  {
    slug: 'power-of-mindfulness-in-relationships',
    title: 'The Power of Mindfulness in Relationships',
    excerpt: 'Discover how mindfulness practices can improve communication and deepen connections with your loved ones.',
    category: 'Relationships',
    readTime: '7 min read',
    publishedAt: 'Nov 12, 2024',
    author: {
      name: 'Mohana Rupa',
      role: 'Licensed Therapist & Coach'
    },
    image: '/api/placeholder/400/250'
  },
  {
    slug: 'building-resilience-tools-for-challenges',
    title: 'Building Resilience: Tools for Life\'s Challenges',
    excerpt: 'Explore strategies to build emotional resilience and navigate life\'s ups and downs with confidence.',
    category: 'Personal Growth',
    readTime: '6 min read',
    publishedAt: 'Nov 10, 2024',
    author: {
      name: 'Mohana Rupa',
      role: 'Licensed Therapist & Coach'
    },
    image: '/api/placeholder/400/250'
  },
  {
    slug: 'emotional-intelligence-workplace-success',
    title: 'Emotional Intelligence and Workplace Success',
    excerpt: 'How developing emotional intelligence can transform your professional relationships and career growth.',
    category: 'Career Growth',
    readTime: '8 min read',
    publishedAt: 'Nov 8, 2024',
    author: {
      name: 'Mohana Rupa',
      role: 'Licensed Therapist & Coach'
    },
    image: '/api/placeholder/400/250'
  },
  {
    slug: 'healing-trauma-gentle-approaches',
    title: 'Healing from Trauma: Gentle Approaches to Recovery',
    excerpt: 'Understanding trauma responses and exploring gentle, effective methods for healing and recovery.',
    category: 'Mental Health',
    readTime: '10 min read',
    publishedAt: 'Nov 5, 2024',
    author: {
      name: 'Mohana Rupa',
      role: 'Licensed Therapist & Coach'
    },
    image: '/api/placeholder/400/250'
  },
  {
    slug: 'setting-healthy-boundaries',
    title: 'Setting Healthy Boundaries in Relationships',
    excerpt: 'Learn to establish and maintain healthy boundaries that protect your wellbeing while nurturing relationships.',
    category: 'Relationships',
    readTime: '6 min read',
    publishedAt: 'Nov 2, 2024',
    author: {
      name: 'Mohana Rupa',
      role: 'Licensed Therapist & Coach'
    },
    image: '/api/placeholder/400/250'
  }
]

const categories = ['All', 'Mental Health', 'Relationships', 'Personal Growth', 'Career Growth']

export default function BlogPage() {
  return (
    <main>
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
              Latest Insights
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Explore articles and insights on mental health, personal growth, and wellness 
              to support your journey toward healing and inner clarity.
            </p>
          </div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-8 bg-lavender/20">
        <div className="container-custom">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                className="px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 bg-white text-gray-700 hover:bg-moss hover:text-white shadow-soft"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <article className="bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-medium transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                  {/* Featured Image */}
                  <div className="bg-azure/30 h-48 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-azure/50 to-lavender/50"></div>
                    <div className="absolute bottom-4 left-4">
                      <span className="text-xs font-medium text-moss bg-white/90 px-3 py-1 rounded-full">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-gray-500">{post.publishedAt}</span>
                      <span className="text-sm text-gray-500">{post.readTime}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight hover:text-moss transition-colors">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-600 leading-relaxed mb-4">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-moss/10 rounded-full flex items-center justify-center mr-3">
                          <span className="text-moss font-semibold text-sm">MR</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{post.author.name}</p>
                          <p className="text-xs text-gray-500">{post.author.role}</p>
                        </div>
                      </div>
                      
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 bg-azure/10">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Stay Updated
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Get the latest insights and wellness tips delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 rounded-full border border-gray-300 focus:border-moss focus:outline-none"
              />
              <button className="btn-pill btn-primary">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}