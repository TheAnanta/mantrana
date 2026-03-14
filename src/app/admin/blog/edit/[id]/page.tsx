'use client'

import { useState, useEffect, use } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { getBlogPost, updateBlogPost, uploadImage } from '@/lib/firebase-utils'
import { BlogPost } from '@/types'
import BlogEditor from '@/components/admin/blog/Editor'
import { ArrowLeft, Save, Globe, Eye, Image as ImageIcon, X, ChevronRight, Settings, Layout } from 'lucide-react'

interface EditPostPageProps {
  params: Promise<{ id: string }>
}

export default function EditPostPage({ params }: EditPostPageProps) {
  const router = useRouter()
  const { id } = use(params)
  
  const [loading, setLoading] = useState(true)
  const [content, setContent] = useState('')
  const [title, setTitle] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [category, setCategory] = useState('')
  const [status, setStatus] = useState<'draft' | 'published' | 'scheduled'>('draft')
  const [existingImage, setExistingImage] = useState('')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  useEffect(() => {
    // Auth check
    const isAuthenticated = localStorage.getItem('admin_authenticated')
    if (!isAuthenticated) {
      router.push('/admin/login')
      return
    }

    const fetchPost = async () => {
      try {
        const post = await getBlogPost(id)
        if (post) {
          setTitle(post.title)
          setContent(post.content)
          setExcerpt(post.excerpt)
          setCategory(post.category)
          setStatus(post.status)
          setExistingImage(post.image || '')
        }
      } catch (error) {
        console.error("Failed to fetch post:", error)
        alert("Failed to load post data.")
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [id, router])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '')
  }

  const handlePreview = () => {
    const previewData = {
      title,
      content,
      excerpt,
      category,
      image: imagePreview || existingImage || '',
      publishedAt: new Date().toLocaleDateString(),
      readTime: `${Math.ceil(content.split(' ').length / 200)} min read`,
      author: {
        name: 'Mohana Rupa',
        role: 'Licensed Therapist & Coach',
        bio: 'Mohana Rupa is a licensed therapist and certified life coach...'
      }
    }
    localStorage.setItem('blog_preview_data', JSON.stringify(previewData))
    window.open('/admin/blog/preview', '_blank')
  }

  const handleSave = async () => {
    if (!title) {
      alert('Please enter a title')
      return
    }

    try {
      setUploading(true)
      let imageUrl = existingImage

      if (imageFile) {
        imageUrl = await uploadImage(imageFile, `blog/${Date.now()}_${imageFile.name}`)
      }

      const postData = {
        title,
        slug: generateSlug(title),
        excerpt,
        content,
        category,
        status,
        readTime: `${Math.ceil(content.split(' ').length / 200)} min read`,
        image: imageUrl,
        tags: [],
        author: 'Mohana Rupa',
      }

      await updateBlogPost(id, postData)
      router.push('/admin/blog')
    } catch (error) {
      console.error("Failed to update post:", error)
      alert("Failed to update post. Please check console for details.")
    } finally {
      setUploading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white font-montserrat">
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="h-16 w-16 border-4 border-teal/10 border-t-teal rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="w-2 h-2 bg-teal rounded-full animate-pulse"></span>
            </div>
          </div>
          <p className="mt-8 text-charcoal/30 font-bold text-[10px] uppercase tracking-[0.3em]">
            Restoring your story...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white flex flex-col selection:bg-teal/20 selection:text-teal font-montserrat">
      {/* Top Navigation Bar */}
      <header className="h-20 border-b border-charcoal/5 flex items-center justify-between px-8 bg-white/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="flex items-center space-x-6">
          <Link 
            href="/admin/blog"
            className="group flex items-center space-x-2 text-charcoal/40 hover:text-charcoal transition-all font-bold text-xs uppercase tracking-widest"
          >
            <div className="p-2.5 bg-charcoal/5 group-hover:bg-charcoal/10 rounded-full transition-all">
              <ArrowLeft size={18} />
            </div>
            <span className="hidden sm:inline">Back to Posts</span>
          </Link>
          <div className="h-6 w-[1px] bg-charcoal/10" />
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-teal" />
            <span className="text-[10px] font-bold text-charcoal/30 uppercase tracking-[0.2em] leading-none">
              Editing Mode
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button 
            onClick={handlePreview}
            className="flex items-center px-4 py-2.5 text-xs font-bold text-charcoal/40 hover:text-charcoal transition-all uppercase tracking-widest"
          >
            <Eye size={16} className="mr-2" />
            Preview
          </button>
          
          <div className="w-[1px] h-4 bg-charcoal/10 mx-2" />
          
          <button
            onClick={handleSave}
            disabled={uploading}
            className="inline-flex items-center bg-teal text-white px-8 py-3 rounded-full font-bold text-[10px] uppercase tracking-[0.2em] shadow-[0_8px_30px_rgb(141,163,153,0.3)] hover:shadow-[0_12px_40px_rgb(141,163,153,0.4)] hover:-translate-y-0.5 transition-all disabled:opacity-50"
          >
            {uploading ? (
              <span className="flex items-center">
                <span className="animate-spin h-3 w-3 border-2 border-white/30 border-t-white rounded-full mr-3" />
                Updating...
              </span>
            ) : (
              <>
                <Save size={14} className="mr-2.5" />
                {status === 'published' ? 'Update Post' : 'Save Changes'}
              </>
            )}
          </button>

          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className={`p-3 rounded-full transition-all ml-4 ${isSidebarOpen ? 'bg-charcoal text-white' : 'bg-charcoal/5 text-charcoal/40 hover:bg-charcoal/10'}`}
            title="Post Settings"
          >
            <Settings size={20} />
          </button>
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden relative">
        {/* Editor Area */}
        <div className={`flex-1 overflow-y-auto transition-all duration-500 ease-in-out ${isSidebarOpen ? 'mr-96' : 'mr-0'}`}>
          <div className="max-w-4xl mx-auto pt-24 pb-48 px-8 sm:px-12">
            <div className="mb-16">
              <textarea
                placeholder="The Title of Your Story..."
                className="w-full text-5xl md:text-7xl font-bold font-awesome-serif text-charcoal placeholder:text-charcoal/5 border-none outline-none resize-none bg-transparent leading-[1.1] mb-6 tracking-tight selection:bg-teal/10"
                rows={2}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <div className="h-px w-24 bg-teal/20" />
            </div>
            
            <BlogEditor 
              content={content} 
              onChange={setContent} 
            />
          </div>
        </div>

        {/* Post Settings Sidebar */}
        <aside 
          className={`fixed top-20 right-0 bottom-0 w-96 border-l border-charcoal/5 bg-white transition-all duration-500 ease-in-out transform shadow-[-20px_0_60px_rgb(0,0,0,0.02)] z-30 ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
          <div className="h-full flex flex-col font-montserrat">
            <div className="p-8 border-b border-charcoal/5 flex items-center justify-between">
              <h3 className="text-[11px] font-bold text-charcoal/30 uppercase tracking-[0.25em]">Article Meta</h3>
              <Layout size={16} className="text-charcoal/20" />
            </div>

            <div className="flex-1 overflow-y-auto p-10 space-y-12">
              <div className="space-y-8">
                <div>
                  <label className="block text-[10px] font-bold text-charcoal/40 uppercase tracking-widest mb-3">Publish Status</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button 
                      onClick={() => setStatus('draft')}
                      className={`px-4 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${status === 'draft' ? 'bg-charcoal text-white' : 'bg-charcoal/5 text-charcoal/40 hover:bg-charcoal/10'}`}
                    >
                      Draft
                    </button>
                    <button 
                      onClick={() => setStatus('published')}
                      className={`px-4 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${status === 'published' ? 'bg-teal text-white shadow-lg shadow-teal/20' : 'bg-charcoal/5 text-charcoal/40 hover:bg-charcoal/10'}`}
                    >
                      Publish
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-charcoal/40 uppercase tracking-widest mb-3">Category</label>
                  <div className="relative group">
                    <select 
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full bg-charcoal/5 border-none rounded-2xl px-6 py-4 text-xs font-bold text-charcoal focus:ring-2 focus:ring-teal/20 outline-none transition-all appearance-none cursor-pointer"
                    >
                      <option value="Mental Health">Mental Health</option>
                      <option value="Relationships">Relationships</option>
                      <option value="Personal Growth">Personal Growth</option>
                      <option value="Career Growth">Career Growth</option>
                    </select>
                    <ChevronRight size={14} className="absolute right-6 top-1/2 -translate-y-1/2 text-charcoal/20 rotate-90 pointer-events-none transition-all group-hover:text-charcoal/40" />
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <h3 className="text-[10px] font-bold text-charcoal/40 uppercase tracking-widest mb-4">Post Cover</h3>
                <div className="relative group">
                  {(imagePreview || existingImage) ? (
                    <div className="relative aspect-[16/10] rounded-3xl overflow-hidden border border-charcoal/5 bg-charcoal/5 shadow-inner">
                      <img src={imagePreview || existingImage} alt="Preview" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-charcoal/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center backdrop-blur-sm">
                        <button 
                          onClick={() => { setImageFile(null); setImagePreview(null); setExistingImage(''); }}
                          className="p-3 bg-white text-charcoal rounded-full shadow-2xl hover:bg-red-500 hover:text-white transition-all transform hover:scale-110"
                        >
                          <X size={20} />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center aspect-[16/10] rounded-3xl border-2 border-dashed border-charcoal/10 hover:border-teal/40 hover:bg-teal/5 transition-all cursor-pointer group/upload">
                      <div className="p-4 bg-charcoal/5 text-charcoal/20 rounded-full mb-4 group-hover/upload:bg-teal/10 group-hover/upload:text-teal transition-all">
                        <ImageIcon size={32} />
                      </div>
                      <span className="text-[10px] font-bold text-charcoal/30 uppercase tracking-[0.2em] group-hover/upload:text-teal transition-all">Replace Cover</span>
                      <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                    </label>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-charcoal/40 uppercase tracking-widest mb-3">Post Meta Description</label>
                <textarea 
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="Summarize your story for search engines..."
                  className="w-full bg-charcoal/5 border-none rounded-3xl px-6 py-6 text-xs font-medium text-charcoal placeholder:text-charcoal/20 focus:ring-2 focus:ring-teal/20 outline-none transition-all resize-none h-40 font-montserrat"
                />
              </div>
            </div>
            
            <div className="p-10 border-t border-charcoal/5">
               <div className="flex items-center space-x-3 text-charcoal/20">
                 <div className="w-8 h-8 rounded-full bg-charcoal/5 border border-charcoal/5 flex items-center justify-center text-[10px] font-bold">MR</div>
                 <div className="flex flex-col">
                   <span className="text-[10px] font-bold text-charcoal/40 uppercase tracking-widest">Post Author</span>
                   <span className="text-xs font-bold text-charcoal/60">Mohana Rupa</span>
                 </div>
               </div>
            </div>
          </div>
        </aside>
      </main>
    </div>
  )
}
