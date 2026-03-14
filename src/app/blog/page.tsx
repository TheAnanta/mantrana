'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { getAllBlogPosts } from '@/lib/firebase-utils'
import { BlogPost } from '@/types'

const categories = ['All', 'Mental Health', 'Relationships', 'Personal Growth', 'Career Growth']

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('All')

  useEffect(() => {
    async function fetchPosts() {
      try {
        const data = await getAllBlogPosts()
        // Sort by published date
        const sorted = data
          .filter(p => p.status === 'published')
          .sort((a, b) => {
            const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0
            const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0
            return dateB - dateA
          })
        setPosts(sorted)
      } catch (error) {
        console.error("Failed to fetch blog posts:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchPosts()
  }, [])

  const filteredPosts = activeCategory === 'All' 
    ? posts 
    : posts.filter(post => post.category === activeCategory)
  return (
    <main>
      <Header />

      {/* Hero Section */}
      <section className="pt-40 pb-16 bg-background relative overflow-hidden">
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="text-xs tracking-widest font-medium font-montserrat text-black/60 mb-4 uppercase">Journal</div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl text-charcoal mb-6 font-awesome-serif uppercase tracking-widest">
              Latest Insights
            </h1>
            <p className="text-sm md:text-base font-montserrat text-charcoal/80 font-medium leading-relaxed max-w-2xl mx-auto">
              Explore articles and insights on mental health, personal growth, and wellness
              to support your journey toward healing and inner clarity.
            </p>
          </div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-8 bg-background border-b border-charcoal/5">
        <div className="container-custom">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-3 rounded-full text-xs font-montserrat tracking-widest uppercase font-semibold transition-all duration-300 shadow-sm border border-charcoal/5 ${
                  activeCategory === category 
                    ? 'bg-emerald text-white' 
                    : 'bg-white text-charcoal hover:bg-emerald/10'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {loading ? (
              <div className="col-span-full text-center py-12">
                <p className="text-charcoal/40 text-lg font-montserrat">Loading latest insights...</p>
              </div>
            ) : filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="group flex h-full">
                  <article className="bg-white rounded-[20px] overflow-hidden shadow-soft group-hover:shadow-medium transition-all duration-500 border border-charcoal/5 flex flex-col w-full">
                    {/* Featured Image */}
                    <div className="h-56 relative overflow-hidden bg-background">
                      <img
                        src={post.image || '/images/default-blog.png'}
                        alt={post.title}
                        className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-700 ease-in-out"
                      />
                      <div className="absolute top-4 right-4">
                        <span className="text-[10px] font-montserrat tracking-widest uppercase font-bold text-white bg-charcoal/80 backdrop-blur-sm px-4 py-2 rounded-full">
                          {post.category}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-8 flex flex-col flex-1">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-montserrat tracking-widest uppercase text-charcoal/50 font-semibold">
                          {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Draft'}
                        </span>
                        <span className="text-xs font-montserrat tracking-widest uppercase text-charcoal/50 font-semibold">{post.readTime}</span>
                      </div>

                      <h3 className="text-2xl font-awesome-serif text-charcoal mb-4 uppercase tracking-wide group-hover:text-emerald transition-colors leading-snug">
                        {post.title}
                      </h3>

                      <p className="text-sm font-montserrat text-charcoal/70 font-medium leading-relaxed mb-8 flex-1">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center justify-between mt-auto pt-6 border-t border-charcoal/10">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-background rounded-full flex items-center justify-center mr-3 border border-charcoal/10">
                            <span className="text-emerald font-awesome-serif text-lg">MR</span>
                          </div>
                          <div>
                            <p className="text-xs font-montserrat font-bold tracking-widest uppercase text-charcoal">{post.author}</p>
                            <p className="text-[10px] font-montserrat tracking-widest uppercase text-charcoal/50 mt-1">Licensed Therapist & Coach</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-charcoal/40 text-lg font-montserrat">No articles found in this category.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-24 bg-charcoal relative overflow-hidden text-center text-white">
        <img
          src="/images/diwali-backdrop-d.png"
          className="absolute -top-[30%] -left-[10%] w-[500px] opacity-[0.05] pointer-events-none select-none"
          alt="Decorative"
        />
        <img
          src="/images/diwali-backdrop.png"
          className="absolute -bottom-[30%] -right-[10%] w-[500px] opacity-[0.05] pointer-events-none select-none"
          alt="Decorative"
        />
        <div className="container-custom relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <div className="text-xs tracking-widest font-medium font-montserrat text-white/60 mb-4 uppercase">Newsletter</div>
            <h2 className="text-4xl lg:text-5xl font-awesome-serif uppercase tracking-widest mb-6">
              Stay Updated
            </h2>
            <p className="text-sm font-montserrat text-white/80 font-medium mb-10 max-w-lg mx-auto leading-relaxed">
              Get the latest insights and wellness tips delivered straight to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-full border border-white/20 bg-white/5 text-white placeholder:text-white/40 focus:border-white focus:outline-none focus:bg-white/10 font-montserrat text-sm transition-colors"
                required
              />
              <button className="bg-white text-charcoal hover:bg-emerald hover:text-white transition-colors font-semibold text-xs uppercase tracking-widest px-8 py-4 rounded-full">
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