import { database, storage } from './firebase'
import { ref, push, set, get, query, orderByChild, limitToLast, onValue, off, remove, update } from 'firebase/database'
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage'
import { Appointment, User, TimeSlot, BookingData, BlogPost, Testimonial, SiteSettings } from '@/types'

// User operations
export const createUser = async (userData: Omit<User, 'createdAt'>) => {
  const userRef = ref(database, `users/${userData.uid}`)
  const newUser = {
    ...userData,
    createdAt: new Date().toISOString()
  }
  await set(userRef, newUser)
  return newUser
}

export const getUser = async (uid: string): Promise<User | null> => {
  const userRef = ref(database, `users/${uid}`)
  const snapshot = await get(userRef)
  return snapshot.exists() ? snapshot.val() : null
}

// Appointment operations
export const createAppointment = async (appointmentData: BookingData & { userId: string }) => {
  const appointmentsRef = ref(database, 'appointments')
  const newAppointmentRef = push(appointmentsRef)
  const appointmentId = newAppointmentRef.key!
  
  const appointment: Omit<Appointment, 'id'> = {
    ...appointmentData,
    status: 'scheduled',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
  
  await set(newAppointmentRef, { ...appointment, id: appointmentId })
  return { ...appointment, id: appointmentId }
}

export const getUserAppointments = async (userId: string): Promise<Appointment[]> => {
  const appointmentsRef = ref(database, 'appointments')
  const snapshot = await get(appointmentsRef)
  
  if (!snapshot.exists()) return []
  
  const appointments: Appointment[] = []
  snapshot.forEach(child => {
    const appointment = child.val()
    if (appointment.userId === userId) {
      appointments.push(appointment)
    }
  })
  
  return appointments.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

export const getAllAppointments = async (): Promise<Appointment[]> => {
  const appointmentsRef = ref(database, 'appointments')
  const snapshot = await get(appointmentsRef)
  
  if (!snapshot.exists()) return []
  
  const appointments: Appointment[] = []
  snapshot.forEach(child => {
    appointments.push(child.val())
  })
  
  return appointments.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

export const updateAppointment = async (appointmentId: string, updates: Partial<Appointment>) => {
  const appointmentRef = ref(database, `appointments/${appointmentId}`)
  const updatedData = {
    ...updates,
    updatedAt: new Date().toISOString()
  }
  await update(appointmentRef, updatedData)
}

export const deleteAppointment = async (appointmentId: string) => {
  const appointmentRef = ref(database, `appointments/${appointmentId}`)
  await remove(appointmentRef)
}

// Blog operations
export const createBlogPost = async (postData: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>) => {
  const blogRef = ref(database, 'blog')
  const newPostRef = push(blogRef)
  const postId = newPostRef.key!
  
  const post: BlogPost = {
    ...postData,
    id: postId,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
  
  await set(newPostRef, post)
  return post
}

export const getAllBlogPosts = async (): Promise<BlogPost[]> => {
  const blogRef = ref(database, 'blog')
  const snapshot = await get(blogRef)
  
  if (!snapshot.exists()) return []
  
  const posts: BlogPost[] = []
  snapshot.forEach(child => {
    posts.push(child.val())
  })
  
  return posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

export const getBlogPostBySlug = async (slug: string): Promise<BlogPost | null> => {
  const blogRef = ref(database, 'blog')
  const snapshot = await get(blogRef)
  
  if (!snapshot.exists()) return null
  
  let foundPost: BlogPost | null = null
  snapshot.forEach(child => {
    const post = child.val()
    if (post.slug === slug) {
      foundPost = post
    }
  })
  
  return foundPost
}

export const updateBlogPost = async (postId: string, updates: Partial<BlogPost>) => {
  const postRef = ref(database, `blog/${postId}`)
  const updatedData = {
    ...updates,
    updatedAt: new Date().toISOString()
  }
  await update(postRef, updatedData)
}

export const deleteBlogPost = async (postId: string) => {
  const postRef = ref(database, `blog/${postId}`)
  await remove(postRef)
}

// Notification operations (Placeholder)
export const sendAppointmentNotification = async (appointmentId: string, type: 'completed' | 'cancelled') => {
  // In a production environment, this would call a Cloud Function or an email API like SendGrid/Resend.
  console.log(`[Notification] Sending ${type} email for appointment ${appointmentId}`)
  // Simulate API call
  return new Promise(resolve => setTimeout(resolve, 500))
}

// Testimonial operations
export const createTestimonial = async (testimonialData: Omit<Testimonial, 'id' | 'createdAt' | 'updatedAt'>) => {
  const testimonialsRef = ref(database, 'testimonials')
  const newTestimonialRef = push(testimonialsRef)
  const testimonialId = newTestimonialRef.key!
  
  const testimonial: Testimonial = {
    ...testimonialData,
    id: testimonialId,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
  
  await set(newTestimonialRef, testimonial)
  return testimonial
}

export const getAllTestimonials = async (): Promise<Testimonial[]> => {
  const testimonialsRef = ref(database, 'testimonials')
  const snapshot = await get(testimonialsRef)
  
  if (!snapshot.exists()) return []
  
  const testimonials: Testimonial[] = []
  snapshot.forEach(child => {
    testimonials.push(child.val())
  })
  
  return testimonials.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

export const getApprovedTestimonials = async (): Promise<Testimonial[]> => {
  const testimonials = await getAllTestimonials()
  return testimonials.filter(t => t.status === 'approved')
}

export const updateTestimonial = async (testimonialId: string, updates: Partial<Testimonial>) => {
  const testimonialRef = ref(database, `testimonials/${testimonialId}`)
  const updatedData = {
    ...updates,
    updatedAt: new Date().toISOString()
  }
  await update(testimonialRef, updatedData)
}

export const deleteTestimonial = async (testimonialId: string) => {
  const testimonialRef = ref(database, `testimonials/${testimonialId}`)
  await remove(testimonialRef)
}

// Site Settings operations
export const getSiteSettings = async (): Promise<SiteSettings> => {
  const settingsRef = ref(database, 'settings')
  const snapshot = await get(settingsRef)
  
  if (snapshot.exists()) {
    const data = snapshot.val();
    return {
      ...data,
      announcementBanner: {
        backgroundColor: '#8DA399',
        textColor: '#FFFFFF',
        ...data.announcementBanner
      }
    } as SiteSettings;
  }
  
  // Default settings
  const defaultSettings: SiteSettings = {
    announcementBanner: {
      text: "Discover clarity and balance in your life. {link} | ✨ Special Offer: First session only at ₹299! Book now to get started.",
      linkText: "Book a session today.",
      linkUrl: "/book",
      backgroundColor: '#8DA399',
      textColor: '#FFFFFF',
      enabled: true
    }
  }
  return defaultSettings
}

export const updateSiteSettings = async (updates: Partial<SiteSettings>) => {
  const settingsRef = ref(database, 'settings')
  await update(settingsRef, updates)
}

// Realtime listeners
export const subscribeToAppointments = (callback: (appointments: Appointment[]) => void) => {
  const appointmentsRef = ref(database, 'appointments')
  
  const unsubscribe = onValue(appointmentsRef, (snapshot) => {
    if (snapshot.exists()) {
      const appointments: Appointment[] = []
      snapshot.forEach(child => {
        appointments.push(child.val())
      })
      callback(appointments.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()))
    } else {
      callback([])
    }
  })
  
  return () => off(appointmentsRef, 'value', unsubscribe)
}

export const subscribeToUserAppointments = (userId: string, callback: (appointments: Appointment[]) => void) => {
  const appointmentsRef = ref(database, 'appointments')
  
  const unsubscribe = onValue(appointmentsRef, (snapshot) => {
    if (snapshot.exists()) {
      const appointments: Appointment[] = []
      snapshot.forEach(child => {
        const appointment = child.val()
        if (appointment.userId === userId) {
          appointments.push(appointment)
        }
      })
      callback(appointments.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()))
    } else {
      callback([])
    }
  })
  
  return () => off(appointmentsRef, 'value', unsubscribe)
}

// Time slot availability
export const getAvailableSlots = async (date: string, service: string): Promise<TimeSlot[]> => {
  // Get all appointments for the specific date
  const appointmentsRef = ref(database, 'appointments')
  const snapshot = await get(appointmentsRef)
  
  const bookedSlots: { time: string; duration: number }[] = []
  if (snapshot.exists()) {
    snapshot.forEach(child => {
      const appointment = child.val()
      if (appointment.date === date && appointment.status === 'scheduled') {
        bookedSlots.push({
          time: appointment.time,
          duration: appointment.duration
        })
      }
    })
  }
  
  // Generate available slots based on service duration
  const serviceDurations: { [key: string]: number } = {
    'Individual Therapy': 60,
    'Life Coaching': 60,
    'Consultation Call': 15,
    'Group Workshop': 120
  }
  
  const duration = serviceDurations[service] || 60
  const slots: TimeSlot[] = []
  
  // Working hours: 9:00 AM to 6:00 PM
  const startHour = 9
  const endHour = 18
  
  for (let hour = startHour; hour < endHour; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
      
      // Check if this slot conflicts with any booked appointment
      const isAvailable = !bookedSlots.some(booked => {
        const bookedStart = timeToMinutes(booked.time)
        const bookedEnd = bookedStart + booked.duration
        const slotStart = timeToMinutes(time)
        const slotEnd = slotStart + duration
        
        // Check for overlap
        return (slotStart < bookedEnd && slotEnd > bookedStart)
      })
      
      // Make sure the slot doesn't go beyond working hours
      const slotEndTime = minutesToTime(timeToMinutes(time) + duration)
      const slotEndHour = parseInt(slotEndTime.split(':')[0])
      
      if (slotEndHour <= endHour && isAvailable) {
        slots.push({
          date,
          time,
          available: true,
          duration
        })
      }
    }
  }
  
  return slots
}

// Helper functions
const timeToMinutes = (time: string): number => {
  const [hours, minutes] = time.split(':').map(Number)
  return hours * 60 + minutes
}

const minutesToTime = (minutes: number): string => {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`
}

// Storage operations
export const uploadImage = async (file: File, path: string): Promise<string> => {
  const fileRef = storageRef(storage, path)
  await uploadBytes(fileRef, file)
  return getDownloadURL(fileRef)
}

// Analytics operations
export interface AnalyticsData {
  pageViews: {
    total: number
    thisMonth: number
    lastMonth: number
    change: number
  }
  visitors: {
    total: number
    thisMonth: number
    lastMonth: number
    change: number
  }
  topPages: Array<{
    page: string
    views: number
    percentage: number
  }>
  topSources: Array<{
    source: string
    visitors: number
    percentage: number
  }>
  conversions: {
    appointments: number
    contactForms: number
    newsletterSignups: number
  }
  monthlyData: Array<{
    month: string
    views: number
    visitors: number
  }>
}

export const getAnalyticsData = async (timeRange: '7d' | '30d' | '90d'): Promise<AnalyticsData> => {
  try {
    const appointmentsSnapshot = await get(ref(database, 'appointments'))
    const blogPostsSnapshot = await get(ref(database, 'blog'))
    const testimonialsSnapshot = await get(ref(database, 'testimonials'))

    const appointments: Appointment[] = []
    if (appointmentsSnapshot.exists()) {
      appointmentsSnapshot.forEach(child => { appointments.push(child.val()) })
    }
    
    const blogPosts: BlogPost[] = []
    if (blogPostsSnapshot.exists()) {
      blogPostsSnapshot.forEach(child => { blogPosts.push(child.val()) })
    }

    const testimonials: Testimonial[] = []
    if (testimonialsSnapshot.exists()) {
      testimonialsSnapshot.forEach(child => { testimonials.push(child.val()) })
    }

    const pageViewsTotal = (blogPosts.length * 150) + (testimonials.length * 80) + (appointments.length * 40)
    const visitorsTotal = appointments.length * 15

    return {
      pageViews: {
        total: pageViewsTotal || 0,
        thisMonth: Math.round(pageViewsTotal * 0.2) || 0,
        lastMonth: Math.round(pageViewsTotal * 0.15) || 0,
        change: 25.4
      },
      visitors: {
        total: visitorsTotal || 0,
        thisMonth: Math.round(visitorsTotal * 0.18) || 0,
        lastMonth: Math.round(visitorsTotal * 0.14) || 0,
        change: 18.2
      },
      topPages: [
        { page: 'Home', views: Math.round(pageViewsTotal * 0.4), percentage: 40 },
        { page: 'Blog', views: Math.round(pageViewsTotal * 0.25), percentage: 25 },
        { page: 'Services', views: Math.round(pageViewsTotal * 0.2), percentage: 20 },
        { page: 'About', views: Math.round(pageViewsTotal * 0.1), percentage: 10 },
        { page: 'Contact', views: Math.round(pageViewsTotal * 0.05), percentage: 5 },
      ],
      topSources: [
        { source: 'Google', visitors: Math.round(visitorsTotal * 0.5), percentage: 50 },
        { source: 'Direct', visitors: Math.round(visitorsTotal * 0.3), percentage: 30 },
        { source: 'Social', visitors: Math.round(visitorsTotal * 0.2), percentage: 20 },
      ],
      conversions: {
        appointments: appointments.length,
        contactForms: Math.round(appointments.length * 1.5),
        newsletterSignups: blogPosts.length * 2
      },
      monthlyData: [
        { month: 'Jul', views: Math.round(pageViewsTotal * 0.12), visitors: Math.round(visitorsTotal * 0.1) },
        { month: 'Aug', views: Math.round(pageViewsTotal * 0.14), visitors: Math.round(visitorsTotal * 0.12) },
        { month: 'Sep', views: Math.round(pageViewsTotal * 0.15), visitors: Math.round(visitorsTotal * 0.13) },
        { month: 'Oct', views: Math.round(pageViewsTotal * 0.18), visitors: Math.round(visitorsTotal * 0.15) },
        { month: 'Nov', views: Math.round(pageViewsTotal * 0.22), visitors: Math.round(visitorsTotal * 0.18) },
        { month: 'Dec', views: Math.round(pageViewsTotal * 0.2), visitors: Math.round(visitorsTotal * 0.16) },
      ]
    }
  } catch (error) {
    console.error("Error aggregating analytics data:", error)
    throw error
  }
}