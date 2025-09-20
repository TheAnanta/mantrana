'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { subscribeToUserAppointments } from '@/lib/firebase-utils'
import { Appointment } from '@/types'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function AccountPage() {
  const { user, loading, logout } = useAuth()
  const router = useRouter()
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [appointmentsLoading, setAppointmentsLoading] = useState(true)

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
      return
    }

    if (user) {
      // Subscribe to user's appointments
      const unsubscribe = subscribeToUserAppointments(user.uid, (userAppointments) => {
        setAppointments(userAppointments)
        setAppointmentsLoading(false)
      })

      return unsubscribe
    }
  }, [user, loading, router])

  const handleLogout = async () => {
    try {
      await logout()
      router.push('/')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const getStatusColor = (status: Appointment['status']) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800'
      case 'completed': return 'bg-green-100 text-green-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      case 'no-show': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':')
    const hour = parseInt(hours)
    const ampm = hour >= 12 ? 'PM' : 'AM'
    const hour12 = hour % 12 || 12
    return `${hour12}:${minutes} ${ampm}`
  }

  if (loading || appointmentsLoading) {
    return (
      <main className="min-h-screen">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin h-8 w-8 border-b-2 border-moss mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your account...</p>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  if (!user) {
    return null
  }

  return (
    <main className="min-h-screen">
      <Header />
      
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Profile Header */}
          <div className="bg-white rounded-lg shadow-soft p-8 mb-8">
            <div className="flex items-center space-x-6">
              {user.photoURL && (
                <img
                  src={user.photoURL}
                  alt={user.displayName}
                  className="w-20 h-20 rounded-full"
                />
              )}
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Welcome back, {user.displayName}!
                </h1>
                <p className="text-gray-600 mb-4">{user.email}</p>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>

          {/* Appointments Section */}
          <div className="bg-white rounded-lg shadow-soft p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">My Appointments</h2>
              <button
                onClick={() => router.push('/book')}
                className="bg-moss text-white px-6 py-2 rounded-lg hover:bg-moss/90 transition-colors"
              >
                Book New Session
              </button>
            </div>

            {appointments.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">📅</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No appointments yet</h3>
                <p className="text-gray-600 mb-6">Book your first session to get started on your wellness journey.</p>
                <button
                  onClick={() => router.push('/book')}
                  className="bg-moss text-white px-6 py-3 rounded-lg hover:bg-moss/90 transition-colors"
                >
                  Book Your First Session
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {appointments.map((appointment) => (
                  <div key={appointment.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          {appointment.service}
                        </h3>
                        <p className="text-gray-600">
                          {formatDate(appointment.date)} at {formatTime(appointment.time)}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          Duration: {appointment.duration} minutes
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(appointment.status)}`}>
                        {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                      </span>
                    </div>

                    {appointment.notes && (
                      <div className="mt-4">
                        <p className="text-sm font-medium text-gray-700 mb-1">Notes:</p>
                        <p className="text-sm text-gray-600">{appointment.notes}</p>
                      </div>
                    )}

                    <div className="mt-4 text-xs text-gray-400">
                      Booked on {new Date(appointment.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}