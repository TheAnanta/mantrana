'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
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
      case 'scheduled': return 'bg-emerald/10 text-emerald border border-emerald/20'
      case 'completed': return 'bg-teal/10 text-teal border border-teal/20'
      case 'cancelled': return 'bg-red-50 text-red-600 border border-red-100'
      case 'no-show': return 'bg-charcoal/5 text-charcoal/40 border border-charcoal/10'
      default: return 'bg-charcoal/5 text-charcoal/40 border border-charcoal/10'
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
    <main className="min-h-screen bg-background">
      <Header />
      
      <section className="py-24 pt-40">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Profile Header */}
          <div className="bg-white rounded-[30px] shadow-soft p-10 mb-10 border border-charcoal/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald/5 rounded-full -mr-16 -mt-16" />
            
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8 relative z-10">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName || 'User'}
                  className="w-24 h-24 rounded-full border-4 border-emerald/10 shadow-lg"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-teal/10 flex items-center justify-center border-4 border-teal/5 shadow-inner">
                  <span className="text-3xl font-bold text-teal">{user.displayName?.[0] || 'U'}</span>
                </div>
              )}
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-4xl font-bold text-charcoal mb-2 font-awesome-serif uppercase tracking-wider">
                  Welcome back, {user.displayName?.split(' ')[0]}!
                </h1>
                <p className="text-charcoal/60 font-montserrat font-medium mb-6">{user.email}</p>
                <div className="flex flex-wrap justify-center md:justify-start gap-4">
                  <button
                    onClick={handleLogout}
                    className="bg-red-50 text-red-600 px-6 py-2.5 rounded-full hover:bg-red-100 transition-all font-montserrat font-bold text-xs uppercase tracking-widest border border-red-100"
                  >
                    Sign Out
                  </button>
                  <Link
                    href="/book"
                    className="bg-emerald text-white px-6 py-2.5 rounded-full hover:bg-emerald/90 transition-all font-montserrat font-bold text-xs uppercase tracking-widest shadow-lg shadow-emerald/20 inline-block"
                  >
                    New Booking
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Appointments Section */}
          <div className="bg-white rounded-[30px] shadow-soft p-10 border border-charcoal/5">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-4">
              <h2 className="text-2xl font-bold text-charcoal font-awesome-serif uppercase tracking-wide">My Appointments</h2>
              <div className="h-0.5 flex-1 bg-charcoal/5 mx-6 hidden sm:block" />
              <p className="text-xs font-bold text-charcoal/30 font-montserrat uppercase tracking-widest">
                {appointments.length} Sessions Total
              </p>
            </div>

            {appointments.length === 0 ? (
              <div className="text-center py-16 bg-background rounded-[20px] border border-dashed border-charcoal/10">
                <div className="text-charcoal/20 text-6xl mb-6">📅</div>
                <h3 className="text-2xl font-bold text-charcoal mb-3 font-awesome-serif">No appointments yet</h3>
                <p className="text-charcoal/60 font-montserrat font-medium mb-10 max-w-sm mx-auto">Your wellness journey is waiting to begin. Take the first step today.</p>
                <button
                  onClick={() => router.push('/book')}
                  className="bg-charcoal text-white px-10 py-5 rounded-2xl hover:bg-black transition-all font-bold text-xs uppercase tracking-widest shadow-lg shadow-charcoal/20"
                >
                  Book Your First Session
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {appointments.map((appointment) => (
                  <div key={appointment.id} className="group bg-white border border-charcoal/5 hover:border-emerald/30 rounded-[20px] p-8 transition-all hover:shadow-xl hover:translate-y-[-2px] relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-1.5 h-full bg-emerald opacity-0 group-hover:opacity-100 transition-opacity" />
                    
                    <div className="flex flex-col md:flex-row justify-between items-start mb-6 gap-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-charcoal font-awesome-serif uppercase tracking-wide">
                            {appointment.service}
                          </h3>
                        </div>
                        <div className="flex items-center text-charcoal/60 font-montserrat font-semibold text-sm">
                          <svg className="w-4 h-4 mr-2 text-emerald" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span>{formatDate(appointment.date)}</span>
                          <span className="mx-2">•</span>
                          <svg className="w-4 h-4 mr-1 text-emerald" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>{formatTime(appointment.time)}</span>
                        </div>
                      </div>
                      <span className={`px-4 py-1.5 rounded-full text-[10px] uppercase font-bold tracking-widest shadow-sm ${getStatusColor(appointment.status)}`}>
                        {appointment.status}
                      </span>
                    </div>

                    {appointment.notes && (
                      <div className="mt-4 p-4 bg-background rounded-xl border border-charcoal/5">
                        <p className="text-[10px] font-bold text-charcoal/30 uppercase tracking-widest mb-2 font-montserrat">Your Notes</p>
                        <p className="text-sm text-charcoal/70 font-medium font-montserrat italic">&ldquo;{appointment.notes}&rdquo;</p>
                      </div>
                    )}

                    <div className="mt-6 pt-6 border-t border-charcoal/5 flex justify-between items-center text-[10px] font-bold text-charcoal/20 font-montserrat uppercase tracking-widest">
                      <span>Ref: {appointment.id?.slice(-8).toUpperCase()}</span>
                      <span>Booked on {new Date(appointment.createdAt).toLocaleDateString()}</span>
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