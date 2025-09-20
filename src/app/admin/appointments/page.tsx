'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface Appointment {
  id: string
  clientName: string
  clientEmail: string
  clientPhone: string
  service: string
  date: string
  time: string
  status: 'scheduled' | 'completed' | 'cancelled' | 'no-show'
  notes?: string
  duration: number // in minutes
}

export default function AppointmentsPage() {
  const router = useRouter()
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [filter, setFilter] = useState<'all' | 'today' | 'upcoming' | 'completed'>('all')
  const [showNewAppointmentModal, setShowNewAppointmentModal] = useState(false)
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)

  useEffect(() => {
    // Auth check
    const isAuthenticated = localStorage.getItem('admin_authenticated')
    if (!isAuthenticated) {
      router.push('/admin/login')
      return
    }

    // Load sample appointments
    setAppointments([
      {
        id: '1',
        clientName: 'Sarah M.',
        clientEmail: 'sarah.m@email.com',
        clientPhone: '+91 98765 43210',
        service: 'Individual Therapy',
        date: new Date().toISOString().split('T')[0],
        time: '10:00',
        status: 'scheduled',
        notes: 'First-time client, anxiety issues',
        duration: 60,
      },
      {
        id: '2',
        clientName: 'John D.',
        clientEmail: 'john.d@email.com',
        clientPhone: '+91 98765 43211',
        service: 'Life Coaching',
        date: new Date().toISOString().split('T')[0],
        time: '14:00',
        status: 'scheduled',
        notes: 'Career transition planning',
        duration: 90,
      },
      {
        id: '3',
        clientName: 'Ram & Sita K.',
        clientEmail: 'ram.sita@email.com',
        clientPhone: '+91 98765 43212',
        service: 'Couples Therapy',
        date: new Date().toISOString().split('T')[0],
        time: '16:00',
        status: 'scheduled',
        notes: 'Communication issues',
        duration: 75,
      },
      {
        id: '4',
        clientName: 'Priya S.',
        clientEmail: 'priya.s@email.com',
        clientPhone: '+91 98765 43213',
        service: 'Group Workshop',
        date: '2024-12-10',
        time: '11:00',
        status: 'completed',
        notes: 'Stress management workshop',
        duration: 120,
      },
    ])
  }, [router])

  const getStatusColor = (status: Appointment['status']) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800'
      case 'completed': return 'bg-green-100 text-green-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      case 'no-show': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredAppointments = appointments.filter(appointment => {
    const today = new Date().toISOString().split('T')[0]
    const appointmentDate = appointment.date
    
    switch (filter) {
      case 'today':
        return appointmentDate === today
      case 'upcoming':
        return appointmentDate >= today && appointment.status === 'scheduled'
      case 'completed':
        return appointment.status === 'completed'
      default:
        return true
    }
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Appointments</h1>
          <p className="text-gray-600">Manage your client appointments and schedule</p>
        </div>
        <button
          onClick={() => setShowNewAppointmentModal(true)}
          className="bg-moss text-white px-4 py-2 rounded-lg hover:bg-moss/90 transition-colors"
        >
          + New Appointment
        </button>
      </div>

      {/* Filters */}
      <div className="flex space-x-4">
        {['all', 'today', 'upcoming', 'completed'].map((filterOption) => (
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

      {/* Appointments List */}
      <div className="bg-white rounded-lg shadow-soft overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">
            {filteredAppointments.length} appointments
          </h3>
        </div>
        
        <div className="divide-y divide-gray-200">
          {filteredAppointments.map((appointment) => (
            <div
              key={appointment.id}
              className="p-6 hover:bg-gray-50 cursor-pointer"
              onClick={() => setSelectedAppointment(appointment)}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <h4 className="text-lg font-medium text-gray-900">
                      {appointment.clientName}
                    </h4>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(appointment.status)}`}>
                      {appointment.status}
                    </span>
                  </div>
                  
                  <div className="mt-1 space-y-1">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Service:</span> {appointment.service}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Date & Time:</span> {appointment.date} at {appointment.time}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Duration:</span> {appointment.duration} minutes
                    </p>
                    {appointment.notes && (
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Notes:</span> {appointment.notes}
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button className="text-moss hover:text-moss/80 text-sm font-medium">
                    Edit
                  </button>
                  <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          ))}
          
          {filteredAppointments.length === 0 && (
            <div className="p-6 text-center">
              <p className="text-gray-500">No appointments found for the selected filter.</p>
            </div>
          )}
        </div>
      </div>

      {/* New Appointment Modal */}
      {showNewAppointmentModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Schedule New Appointment</h3>
            
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
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-moss focus:border-moss"
                  placeholder="client@email.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-moss focus:border-moss"
                  placeholder="+91 98765 43210"
                />
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
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-moss focus:border-moss"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Time
                  </label>
                  <input
                    type="time"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-moss focus:border-moss"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notes (optional)
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-moss focus:border-moss"
                  rows={3}
                  placeholder="Add any notes or special requirements"
                />
              </div>
            </form>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowNewAppointmentModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // Here you would save the appointment
                  setShowNewAppointmentModal(false)
                }}
                className="px-4 py-2 bg-moss text-white rounded-lg hover:bg-moss/90 transition-colors"
              >
                Schedule Appointment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}