'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  category: string
  status: 'draft' | 'published' | 'scheduled'
  publishedAt?: string
  author: string
  readTime: string
  image?: string
  tags: string[]
}

export default function BlogManagementPage() {
  const router = useRouter()
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [filter, setFilter] = useState<'all' | 'published' | 'draft' | 'scheduled'>('all')
  const [showNewPostModal, setShowNewPostModal] = useState(false)
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null)

  useEffect(() => {
    // Auth check
    const isAuthenticated = localStorage.getItem('admin_authenticated')
    if (!isAuthenticated) {
      router.push('/admin/login')
      return
    }

    // Load sample blog posts
    setPosts([
      {
        id: '1',
        title: 'Understanding Anxiety: A Guide to Managing Daily Stress',
        slug: 'understanding-anxiety-managing-daily-stress',
        excerpt: 'Learn practical techniques to manage anxiety and create a more peaceful daily routine with evidence-based strategies.',
        content: '<p>Anxiety is a natural human emotion, but when it becomes overwhelming...</p>',
        category: 'Mental Health',
        status: 'published',
        publishedAt: '2024-11-15',
        author: 'Mohana Rupa',
        readTime: '5 min read',
        image: '/images/anxiety-stress-management.png',
        tags: ['anxiety', 'stress-management', 'mental-health']
      },
      {
        id: '2',
        title: 'The Power of Mindfulness in Relationships',
        slug: 'power-of-mindfulness-in-relationships',
        excerpt: 'Discover how mindfulness practices can improve communication and deepen connections with your loved ones.',
        content: '<p>Mindfulness isn\'t just for meditation cushions...</p>',
        category: 'Relationships',
        status: 'published',
        publishedAt: '2024-11-12',
        author: 'Mohana Rupa',
        readTime: '7 min read',
        image: '/images/mindfulness-relationships.png',
        tags: ['mindfulness', 'relationships', 'communication']
      },
      {
        id: '3',
        title: 'Building Resilience in Uncertain Times',
        slug: 'building-resilience-uncertain-times',
        excerpt: 'Practical strategies for developing emotional resilience and thriving through life\'s challenges.',
        content: '<p>Draft content about resilience...</p>',
        category: 'Personal Growth',
        status: 'draft',
        author: 'Mohana Rupa',
        readTime: '6 min read',
        tags: ['resilience', 'personal-growth', 'emotional-health']
      },
    ])
  }, [router])

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
          <h1 className="text-2xl font-bold text-gray-900">Blog Posts</h1>
          <p className="text-gray-600">Create and manage your blog content</p>
        </div>
        <button
          onClick={() => setShowNewPostModal(true)}
          className="bg-moss text-white px-4 py-2 rounded-lg hover:bg-moss/90 transition-colors"
        >
          + New Post
        </button>
      </div>

      {/* Filters */}
      <div className="flex space-x-4">
        {(['all', 'published', 'draft', 'scheduled'] as const).map((filterOption) => (
          <button
            key={filterOption}
            onClick={() => setFilter(filterOption)}
            className={`px-4 py-2 rounded-lg font-medium capitalize transition-colors ${
              filter === filterOption
                ? 'bg-moss text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            {filterOption}
          </button>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-soft">
          <div className="text-2xl font-bold text-gray-900">{posts.length}</div>
          <div className="text-sm text-gray-600">Total Posts</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-soft">
          <div className="text-2xl font-bold text-green-600">{posts.filter(p => p.status === 'published').length}</div>
          <div className="text-sm text-gray-600">Published</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-soft">
          <div className="text-2xl font-bold text-gray-600">{posts.filter(p => p.status === 'draft').length}</div>
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
          <h3 className="text-lg font-medium text-gray-900">
            {filteredPosts.length} posts
          </h3>
        </div>
        
        <div className="divide-y divide-gray-200">
          {filteredPosts.map((post) => (
            <div key={post.id} className="p-6 hover:bg-gray-50">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="text-lg font-medium text-gray-900">
                      {post.title}
                    </h4>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(post.status)}`}>
                      {post.status}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-3">{post.excerpt}</p>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                    <span className="bg-moss/10 text-moss px-2 py-1 rounded">{post.category}</span>
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
                  <button
                    onClick={() => setEditingPost(post)}
                    className="text-moss hover:text-moss/80 text-sm font-medium"
                  >
                    Edit
                  </button>
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
                  <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
          
          {filteredPosts.length === 0 && (
            <div className="p-6 text-center">
              <p className="text-gray-500">No posts found for the selected filter.</p>
            </div>
          )}
        </div>
      </div>

      {/* New/Edit Post Modal */}
      {(showNewPostModal || editingPost) && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">
                {editingPost ? 'Edit Post' : 'Create New Post'}
              </h3>
            </div>
            
            <div className="p-6">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Title
                    </label>
                    <input
                      type="text"
                      defaultValue={editingPost?.title || ''}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-moss focus:border-moss"
                      placeholder="Enter post title"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      URL Slug
                    </label>
                    <input
                      type="text"
                      defaultValue={editingPost?.slug || ''}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-moss focus:border-moss"
                      placeholder="url-friendly-title"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Excerpt
                  </label>
                  <textarea
                    defaultValue={editingPost?.excerpt || ''}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-moss focus:border-moss"
                    rows={3}
                    placeholder="Brief description of the post"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <select 
                      defaultValue={editingPost?.category || ''}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-moss focus:border-moss"
                    >
                      <option value="">Select category</option>
                      <option value="Mental Health">Mental Health</option>
                      <option value="Relationships">Relationships</option>
                      <option value="Personal Growth">Personal Growth</option>
                      <option value="Career Growth">Career Growth</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Status
                    </label>
                    <select 
                      defaultValue={editingPost?.status || 'draft'}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-moss focus:border-moss"
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                      <option value="scheduled">Scheduled</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Read Time
                    </label>
                    <input
                      type="text"
                      defaultValue={editingPost?.readTime || ''}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-moss focus:border-moss"
                      placeholder="5 min read"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tags (comma-separated)
                  </label>
                  <input
                    type="text"
                    defaultValue={editingPost?.tags.join(', ') || ''}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-moss focus:border-moss"
                    placeholder="anxiety, mental-health, wellness"
                  />
                </div>
                
                {/* Simple Rich Text Editor */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Content
                  </label>
                  
                  {/* Toolbar */}
                  <div className="border border-gray-300 rounded-t-lg p-2 bg-gray-50 flex space-x-2">
                    <button type="button" className="px-2 py-1 text-sm border border-gray-200 rounded hover:bg-gray-100">
                      <strong>B</strong>
                    </button>
                    <button type="button" className="px-2 py-1 text-sm border border-gray-200 rounded hover:bg-gray-100">
                      <em>I</em>
                    </button>
                    <button type="button" className="px-2 py-1 text-sm border border-gray-200 rounded hover:bg-gray-100">
                      H1
                    </button>
                    <button type="button" className="px-2 py-1 text-sm border border-gray-200 rounded hover:bg-gray-100">
                      H2
                    </button>
                    <button type="button" className="px-2 py-1 text-sm border border-gray-200 rounded hover:bg-gray-100">
                      List
                    </button>
                    <button type="button" className="px-2 py-1 text-sm border border-gray-200 rounded hover:bg-gray-100">
                      Link
                    </button>
                    <button type="button" className="px-2 py-1 text-sm border border-gray-200 rounded hover:bg-gray-100">
                      Image
                    </button>
                  </div>
                  
                  <textarea
                    defaultValue={editingPost?.content || ''}
                    className="w-full px-3 py-3 border border-gray-300 border-t-0 rounded-b-lg focus:outline-none focus:ring-moss focus:border-moss"
                    rows={12}
                    placeholder="Write your blog post content here. You can use HTML tags for formatting."
                  />
                  
                  <div className="mt-2 text-sm text-gray-500">
                    💡 <strong>Tip:</strong> You can use HTML tags like &lt;p&gt;, &lt;h2&gt;, &lt;strong&gt;, &lt;em&gt;, &lt;ul&gt;, &lt;li&gt;, &lt;a&gt; for formatting.
                  </div>
                </div>
              </form>
            </div>
            
            <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
              <button
                onClick={() => {
                  setShowNewPostModal(false)
                  setEditingPost(null)
                }}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // Here you would save the post
                  setShowNewPostModal(false)
                  setEditingPost(null)
                }}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Save Draft
              </button>
              <button
                onClick={() => {
                  // Here you would publish the post
                  setShowNewPostModal(false)
                  setEditingPost(null)
                }}
                className="px-4 py-2 bg-moss text-white rounded-lg hover:bg-moss/90 transition-colors"
              >
                Publish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}