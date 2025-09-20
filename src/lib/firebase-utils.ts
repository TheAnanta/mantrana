import { database } from './firebase'
import { ref, push, set, get, query, orderByChild, limitToLast, onValue, off, remove, update } from 'firebase/database'
import { Appointment, User, TimeSlot, BookingData } from '@/types'

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