'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getAllBlogPosts, createBlogPost, updateBlogPost, deleteBlogPost, uploadImage } from '@/lib/firebase-utils'
import { BlogPost } from '@/types'

export default function BlogManagementPage() {
  const router = useRouter()
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [filter, setFilter] = useState<'all' | 'published' | 'draft' | 'scheduled'>('all')
  const [showNewPostModal, setShowNewPostModal] = useState(false)
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)

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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const insertTag = (tag: string) => {
    const textarea = document.querySelector('textarea[name="content"]') as HTMLTextAreaElement
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const text = textarea.value
    const before = text.substring(0, start)
    const after = text.substring(end)
    const selection = text.substring(start, end)
    
    let newText = ''
    if (tag === 'b') newText = `<strong>${selection || 'bold text'}</strong>`
    if (tag === 'i') newText = `<em>${selection || 'italic text'}</em>`
    if (tag === 'p') newText = `<p>${selection || 'paragraph text'}</p>`
    if (tag === 'h3') newText = `<h3>${selection || 'heading'}</h3>`
    
    textarea.value = before + newText + after
    textarea.focus()
  }

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    
    try {
      setUploading(true)
      let imageUrl = editingPost?.image || ''

      if (imageFile) {
        imageUrl = await uploadImage(imageFile, `blog/${Date.now()}_${imageFile.name}`)
      }

      const postData = {
        title: formData.get('title') as string,
        slug: formData.get('slug') as string,
        excerpt: formData.get('excerpt') as string,
        content: formData.get('content') as string,
        category: formData.get('category') as string,
        status: formData.get('status') as BlogPost['status'],
        readTime: formData.get('readTime') as string,
        image: imageUrl,
        tags: (formData.get('tags') as string).split(',').map(t => t.trim()).filter(t => t !== ''),
        author: 'Mohana Rupa',
      }

      if (editingPost) {
        await updateBlogPost(editingPost.id, postData)
      } else {
        await createBlogPost(postData)
      }
      setShowNewPostModal(false)
      setEditingPost(null)
      setImageFile(null)
      setImagePreview(null)
      fetchPosts()
    } catch (error) {
      console.error("Failed to save post:", error)
    } finally {
      setUploading(false)
    }
  }

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
        <button
          onClick={() => setShowNewPostModal(true)}
          className="bg-teal text-white px-4 py-2 rounded-lg hover:bg-emerald transition-colors"
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
                  <button
                    onClick={() => setEditingPost(post)}
                    className="text-teal hover:text-teal/80 text-sm font-medium"
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

      {/* New/Edit Post Modal */}
      {(showNewPostModal || editingPost) && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-medium text-charcoal font-awesome-serif">
                {editingPost ? 'Edit Post' : 'Create New Post'}
              </h3>
            </div>

            <form onSubmit={handleSave}>
              <div className="p-6">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Title
                      </label>
                      <input
                        name="title"
                        type="text"
                        defaultValue={editingPost?.title || ''}
                        className="w-full px-3 py-2 border border-teal/20 bg-background rounded-lg focus:outline-none focus:ring-teal focus:border-teal"
                        placeholder="Enter post title"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        URL Slug
                      </label>
                      <input
                        name="slug"
                        type="text"
                        defaultValue={editingPost?.slug || ''}
                        className="w-full px-3 py-2 border border-teal/20 bg-background rounded-lg focus:outline-none focus:ring-teal focus:border-teal"
                        placeholder="url-friendly-title"
                        required
                      />
                    </div>
                  </div>

                  {/* Featured Image */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Featured Image
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal/10 file:text-teal hover:file:bg-teal/20"
                      />
                    </div>
                    {(imagePreview || editingPost?.image) && (
                      <div className="relative w-full h-32 rounded-lg overflow-hidden border border-gray-200">
                        <img 
                          src={imagePreview || editingPost?.image} 
                          alt="Preview" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Excerpt
                    </label>
                    <textarea
                      name="excerpt"
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
                        name="category"
                        defaultValue={editingPost?.category || ''}
                        className="w-full px-3 py-2 border border-teal/20 bg-background rounded-lg focus:outline-none focus:ring-teal focus:border-teal"
                        required
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
                        name="status"
                        defaultValue={editingPost?.status || 'draft'}
                        className="w-full px-3 py-2 border border-teal/20 bg-background rounded-lg focus:outline-none focus:ring-teal focus:border-teal"
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
                        name="readTime"
                        type="text"
                        defaultValue={editingPost?.readTime || ''}
                        className="w-full px-3 py-2 border border-teal/20 bg-background rounded-lg focus:outline-none focus:ring-teal focus:border-teal"
                        placeholder="5 min read"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tags (comma-separated)
                    </label>
                    <input
                      name="tags"
                      type="text"
                      defaultValue={editingPost?.tags.join(', ') || ''}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-moss focus:border-moss"
                      placeholder="anxiety, mental-health, wellness"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Content
                    </label>

                    {/* Toolbar */}
                    <div className="border border-gray-300 rounded-t-lg p-2 bg-gray-50 flex space-x-2">
                      <button 
                        type="button" 
                        onClick={() => insertTag('b')}
                        className="px-2 py-1 text-sm border border-gray-200 rounded hover:bg-gray-100 transition-colors"
                        title="Bold"
                      >
                        <strong>B</strong>
                      </button>
                      <button 
                        type="button" 
                        onClick={() => insertTag('i')}
                        className="px-2 py-1 text-sm border border-gray-200 rounded hover:bg-gray-100 transition-colors"
                        title="Italic"
                      >
                        <em>I</em>
                      </button>
                      <button 
                        type="button" 
                        onClick={() => insertTag('h3')}
                        className="px-2 py-1 text-sm border border-gray-200 rounded hover:bg-gray-100 transition-colors"
                        title="Heading"
                      >
                        H3
                      </button>
                      <button 
                        type="button" 
                        onClick={() => insertTag('p')}
                        className="px-2 py-1 text-sm border border-gray-200 rounded hover:bg-gray-100 transition-colors"
                        title="Paragraph"
                      >
                        P
                      </button>
                    </div>

                    <textarea
                      name="content"
                      defaultValue={editingPost?.content || ''}
                      className="w-full px-3 py-3 border border-gray-300 border-t-0 rounded-b-lg focus:outline-none focus:ring-teal focus:border-teal"
                      rows={12}
                      placeholder="Write your blog post content here. You can use HTML tags for formatting."
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => {
                    setShowNewPostModal(false)
                    setEditingPost(null)
                  }}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  className="px-4 py-2 bg-teal text-white rounded-lg hover:bg-teal/90 transition-colors disabled:opacity-50"
                >
                  {uploading ? 'Processing...' : (editingPost ? 'Update Post' : 'Create Post')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}