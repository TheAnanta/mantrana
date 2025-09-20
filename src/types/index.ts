export interface User {
  uid: string
  email: string
  displayName: string
  photoURL?: string
  createdAt: string
}

export interface Appointment {
  id: string
  userId: string
  clientName: string
  clientEmail: string
  clientPhone: string
  service: string
  date: string
  time: string
  status: 'scheduled' | 'completed' | 'cancelled' | 'no-show'
  notes?: string
  duration: number // in minutes
  createdAt: string
  updatedAt: string
}

export interface TimeSlot {
  date: string
  time: string
  available: boolean
  duration: number
}

export interface Service {
  id: string
  title: string
  duration: number // in minutes
  price: string
  description: string
  features: string[]
  popular?: boolean
}

export interface BookingData {
  service: string
  date: string
  time: string
  duration: number
  clientName: string
  clientEmail: string
  clientPhone: string
  notes?: string
}