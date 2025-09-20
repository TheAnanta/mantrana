'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface Testimonial {
  id: string
  name: string
  text: string
  rating: number
  location?: string
  service?: string
  date: string
  status: 'pending' | 'approved' | 'rejected'
  featured?: boolean
}

export default function TestimonialsPage() {
  const router = useRouter()
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'featured'>('all')
  const [showNewTestimonialModal, setShowNewTestimonialModal] = useState(false)
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null)

  useEffect(() => {
    // Auth check
    const isAuthenticated = localStorage.getItem('admin_authenticated')
    if (!isAuthenticated) {
      router.push('/admin/login')
      return
    }

    // Load sample testimonials
    setTestimonials([
      {
        id: '1',
        name: 'Sarah M.',
        text: 'Mohana\'s guidance helped me overcome my anxiety and find peace within myself. The sessions were transformative and I learned practical tools that I use daily.',
        rating: 5,
        location: 'Mumbai',
        service: 'Individual Therapy',
        date: '2024-11-15',
        status: 'approved',
        featured: true,
      },
      {
        id: '2',
        name: 'Raj K.',
        text: 'Professional, compassionate, and incredibly insightful. My life coaching sessions have changed my perspective completely. I\'m now pursuing my dream career.',
        rating: 5,
        location: 'Delhi',
        service: 'Life Coaching',
        date: '2024-10-20',
        status: 'approved',
        featured: false,
      },
      {
        id: '3',
        name: 'Anonymous Client',
        text: 'The therapy sessions helped me work through difficult family issues. I feel more confident in setting boundaries now.',
        rating: 4,
        location: 'Bangalore',
        service: 'Individual Therapy',
        date: '2024-12-01',
        status: 'pending',
        featured: false,
      },
    ])
  }, [router])

  const filteredTestimonials = testimonials.filter(testimonial => {
    switch (filter) {
      case 'pending':
        return testimonial.status === 'pending'
      case 'approved':
        return testimonial.status === 'approved'
      case 'featured':
        return testimonial.featured
      default:
        return true
    }
  })

  const updateTestimonialStatus = (id: string, status: 'approved' | 'rejected') => {
    setTestimonials(prev => 
      prev.map(t => t.id === id ? { ...t, status } : t)
    )
  }

  const toggleFeatured = (id: string) => {
    setTestimonials(prev => 
      prev.map(t => t.id === id ? { ...t, featured: !t.featured } : t)
    )
  }

  const getStatusColor = (status: Testimonial['status']) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'rejected': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Testimonials</h1>
          <p className="text-gray-600">Manage client testimonials and reviews</p>
        </div>
        <button
          onClick={() => setShowNewTestimonialModal(true)}
          className="bg-moss text-white px-4 py-2 rounded-lg hover:bg-moss/90 transition-colors"
        >
          + Add Testimonial
        </button>
      </div>

      {/* Filters */}
      <div className="flex space-x-4">
        {['all', 'pending', 'approved', 'featured'].map((filterOption) => (
          <button
            key={filterOption}
            onClick={() => setFilter(filterOption as any)}
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
          <div className="text-2xl font-bold text-gray-900">{testimonials.length}</div>
          <div className="text-sm text-gray-600">Total Testimonials</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-soft">
          <div className="text-2xl font-bold text-green-600">{testimonials.filter(t => t.status === 'approved').length}</div>
          <div className="text-sm text-gray-600">Approved</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-soft">
          <div className="text-2xl font-bold text-yellow-600">{testimonials.filter(t => t.status === 'pending').length}</div>
          <div className="text-sm text-gray-600">Pending Review</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-soft">
          <div className="text-2xl font-bold text-moss">{testimonials.filter(t => t.featured).length}</div>
          <div className="text-sm text-gray-600">Featured</div>
        </div>
      </div>

      {/* Testimonials List */}
      <div className="bg-white rounded-lg shadow-soft overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">
            {filteredTestimonials.length} testimonials
          </h3>
        </div>
        
        <div className="divide-y divide-gray-200">
          {filteredTestimonials.map((testimonial) => (
            <div key={testimonial.id} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <h4 className="text-lg font-medium text-gray-900">
                      {testimonial.name}
                    </h4>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(testimonial.status)}`}>
                      {testimonial.status}
                    </span>
                    {testimonial.featured && (
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-moss text-white">
                        Featured
                      </span>
                    )}
                  </div>
                  
                  {/* Rating */}
                  <div className="flex mb-3">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className={`w-4 h-4 ${i < testimonial.rating ? 'text-amaranth' : 'text-gray-300'} fill-current`} viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  
                  <p className="text-gray-700 mb-3 italic">"{testimonial.text}"</p>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    {testimonial.service && <span>{testimonial.service}</span>}
                    {testimonial.location && <span>{testimonial.location}</span>}
                    <span>{new Date(testimonial.date).toLocaleDateString()}</span>
                  </div>
                </div>
                
                <div className="flex flex-col space-y-2 ml-4">
                  {testimonial.status === 'pending' && (
                    <>
                      <button
                        onClick={() => updateTestimonialStatus(testimonial.id, 'approved')}
                        className="text-green-600 hover:text-green-700 text-sm font-medium"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => updateTestimonialStatus(testimonial.id, 'rejected')}
                        className="text-red-600 hover:text-red-700 text-sm font-medium"
                      >
                        Reject
                      </button>
                    </>
                  )}
                  {testimonial.status === 'approved' && (
                    <button
                      onClick={() => toggleFeatured(testimonial.id)}
                      className="text-moss hover:text-moss/80 text-sm font-medium"
                    >
                      {testimonial.featured ? 'Unfeature' : 'Feature'}
                    </button>
                  )}
                  <button
                    onClick={() => setEditingTestimonial(testimonial)}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    Edit
                  </button>
                  <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
          
          {filteredTestimonials.length === 0 && (
            <div className="p-6 text-center">
              <p className="text-gray-500">No testimonials found for the selected filter.</p>
            </div>
          )}
        </div>
      </div>

      {/* New Testimonial Modal */}
      {showNewTestimonialModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Testimonial</h3>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Client Name
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-moss focus:border-moss"
                  placeholder="Enter client name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Testimonial Text
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-moss focus:border-moss"
                  rows={4}
                  placeholder="Enter the testimonial text..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rating
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-moss focus:border-moss">
                  <option value="5">5 Stars</option>
                  <option value="4">4 Stars</option>
                  <option value="3">3 Stars</option>
                  <option value="2">2 Stars</option>
                  <option value="1">1 Star</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Service
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-moss focus:border-moss">
                  <option value="">Select a service</option>
                  <option value="Individual Therapy">Individual Therapy</option>
                  <option value="Life Coaching">Life Coaching</option>
                  <option value="Couples Therapy">Couples Therapy</option>
                  <option value="Group Workshop">Group Workshop</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location (optional)
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-moss focus:border-moss"
                  placeholder="Client's city"
                />
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="featured"
                  className="h-4 w-4 text-moss focus:ring-moss border-gray-300 rounded"
                />
                <label htmlFor="featured" className="ml-2 block text-sm text-gray-900">
                  Feature this testimonial
                </label>
              </div>
            </form>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowNewTestimonialModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // Here you would save the testimonial
                  setShowNewTestimonialModal(false)
                }}
                className="px-4 py-2 bg-moss text-white rounded-lg hover:bg-moss/90 transition-colors"
              >
                Add Testimonial
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}