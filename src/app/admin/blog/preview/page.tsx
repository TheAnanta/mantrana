'use client'

import { useEffect, useState } from 'react'
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import Link from "next/link"
import AISummaryToggle from "@/components/AISummaryToggle"

interface PreviewData {
  title: string
  content: string
  excerpt: string
  category: string
  image: string
  publishedAt: string
  readTime: string
  author: {
    name: string
    role: string
    bio: string
  }
}

export default function BlogPreviewPage() {
  const [post, setPost] = useState<PreviewData | null>(null)

  useEffect(() => {
    const data = localStorage.getItem('blog_preview_data')
    if (data) {
      try {
        setPost(JSON.parse(data))
      } catch (e) {
        console.error("Failed to parse preview data", e)
      }
    }
  }, [])

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white font-montserrat">
        <div className="flex flex-col items-center">
          <div className="animate-spin h-10 w-10 border-b-2 border-teal mb-4"></div>
          <p className="text-charcoal/60 font-bold text-xs uppercase tracking-widest">Generating Preview...</p>
        </div>
      </div>
    )
  }

  return (
    <main className="font-montserrat">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-8 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-teal rounded-full animate-pulse" />
                    <span className="text-[10px] font-bold text-charcoal/30 uppercase tracking-[0.2em] leading-none">
                        Preview Mode
                    </span>
                </div>
                <button 
                    onClick={() => window.close()}
                    className="text-[10px] font-bold text-charcoal/40 hover:text-charcoal uppercase tracking-widest transition-all"
                >
                    Close Preview
                </button>
            </div>

            {/* Breadcrumb */}
            <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
              <span>Home</span>
              <span>/</span>
              <span>Blog</span>
              <span>/</span>
              <span className="text-charcoal truncate max-w-[200px]">{post.title}</span>
            </nav>

            {/* Category and Meta */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-sm font-medium text-teal bg-teal/10 px-3 py-1 rounded-full">
                {post.category}
              </span>
              <span className="text-sm text-gray-500">{post.publishedAt}</span>
              <span className="text-sm text-gray-500">•</span>
              <span className="text-sm text-gray-500">{post.readTime}</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-charcoal mb-8 leading-tight font-awesome-serif">
              {post.title}
            </h1>

            {/* Author */}
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-teal/10 rounded-full flex items-center justify-center mr-4">
                <span className="text-teal font-semibold">MR</span>
              </div>
              <div>
                <p className="font-medium text-charcoal">{post.author.name}</p>
                <p className="text-sm text-gray-500">{post.author.role}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      {post.image && (
        <section>
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <div className="h-96 lg:h-[500px] rounded-3xl overflow-hidden border border-charcoal/5">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Article Content */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div
              className="prose prose-lg prose-stone max-w-none 
                prose-headings:text-charcoal prose-headings:font-bold prose-headings:font-awesome-serif
                prose-p:text-charcoal/80 prose-p:leading-relaxed prose-p:mb-6 prose-p:text-lg
                prose-li:text-charcoal/80 prose-li:leading-relaxed prose-li:mb-2
                prose-blockquote:font-awesome-serif prose-blockquote:italic prose-blockquote:border-teal
                prose-img:rounded-2xl prose-img:border prose-img:border-charcoal/5"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
