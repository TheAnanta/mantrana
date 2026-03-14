'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { getAllBlogPosts, deleteBlogPost } from '@/lib/firebase-utils'
import { BlogPost } from '@/types'

export default function BlogManagementPage() {
  const router = useRouter()
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [filter, setFilter] = useState<'all' | 'published' | 'draft' | 'scheduled'>('all')
  const [loading, setLoading] = useState(true)

  const fetchPosts = async () => {
    setLoading(true)
    try {
      const allPosts = await getAllBlogPosts()
      setPosts(allPosts)
    } catch (error) {
      console.error("Failed to fetch posts:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // Auth check
    const isAuthenticated = localStorage.getItem('admin_authenticated')
    if (!isAuthenticated) {
      router.push('/admin/login')
      return
    }

    fetchPosts()
  }, [router])

  const handleDelete = async (postId: string) => {
    if (confirm('Are you sure you want to delete this post?')) {
      try {
        await deleteBlogPost(postId)
        fetchPosts()
      } catch (error) {
        console.error("Failed to delete post:", error)
      }
    }
  }

  const filteredPosts = posts.filter(post => {
    switch (filter) {
      case 'published':
        return post.status === 'published'
      case 'draft':
        return post.status === 'draft'
      case 'scheduled':
        return post.status === 'scheduled'
      default:
        return true
    }
  })

  const getStatusColor = (status: BlogPost['status']) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800'
      case 'draft': return 'bg-gray-100 text-gray-800'
      case 'scheduled': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-charcoal font-awesome-serif">Blog Posts</h1>
          <p className="text-charcoal/60">Create and manage your blog content</p>
        </div>
        <Link
          href="/admin/blog/new"
          className="bg-teal text-white px-6 py-2 rounded-full font-bold text-xs uppercase tracking-widest shadow-lg shadow-teal/20 hover:bg-emerald transition-all"
        >
          + New Post
        </Link>
      </div>

      {/* Filters */}
      <div className="flex space-x-4">
        {(['all', 'published', 'draft', 'scheduled'] as const).map((filterOption) => (
          <button
            key={filterOption}
            onClick={() => setFilter(filterOption)}
            className={`px-4 py-2 rounded-lg font-medium capitalize transition-colors ${filter === filterOption
              ? 'bg-teal text-white'
              : 'bg-white text-charcoal border border-teal/20 hover:bg-teal/5'
              }`}
          >
            {filterOption}
          </button>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-soft">
          <div className="text-2xl font-bold text-charcoal">{posts.length}</div>
          <div className="text-sm text-gray-600">Total Posts</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-soft">
          <div className="text-2xl font-bold text-green-600">{posts.filter(p => p.status === 'published').length}</div>
          <div className="text-sm text-gray-600">Published</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-soft">
          <div className="text-2xl font-bold text-charcoal">{posts.filter(p => p.status === 'draft').length}</div>
          <div className="text-sm text-gray-600">Drafts</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-soft">
          <div className="text-2xl font-bold text-blue-600">{posts.filter(p => p.status === 'scheduled').length}</div>
          <div className="text-sm text-gray-600">Scheduled</div>
        </div>
      </div>

      {/* Posts List */}
      <div className="bg-white rounded-lg shadow-soft overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-charcoal font-awesome-serif">
            {filteredPosts.length} posts
          </h3>
        </div>

        <div className="divide-y divide-gray-200">
          {filteredPosts.map((post) => (
            <div key={post.id} className="p-6 hover:bg-gray-50">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="text-lg font-medium text-charcoal">
                      {post.title}
                    </h4>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(post.status)}`}>
                      {post.status}
                    </span>
                  </div>

                  <p className="text-gray-600 mb-3">{post.excerpt}</p>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-charcoal/40">
                    <span className="bg-teal/10 text-teal px-2 py-1 rounded">{post.category}</span>
                    <span>{post.readTime}</span>
                    {post.publishedAt && <span>Published: {new Date(post.publishedAt).toLocaleDateString()}</span>}
                  </div>

                  {post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {post.tags.map(tag => (
                        <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex flex-col space-y-2 ml-4">
                  <Link
                    href={`/admin/blog/edit/${post.id}`}
                    className="text-teal hover:text-teal/80 text-sm font-bold uppercase tracking-widest text-right"
                  >
                    Edit
                  </Link>
                  {post.status === 'published' && (
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                      View
                    </button>
                  )}
                  {post.status === 'draft' && (
                    <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                      Publish
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="text-red-600 hover:text-red-700 text-sm font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}

          {filteredPosts.length === 0 && (
            <div className="p-6 text-center">
              <p className="text-charcoal/40">No posts found for the selected filter.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}