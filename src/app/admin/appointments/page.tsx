'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { subscribeToAppointments, updateAppointment } from '@/lib/firebase-utils'
import { Appointment } from '@/types'

export default function AppointmentsPage() {
  const router = useRouter()
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [filter, setFilter] = useState<'all' | 'today' | 'upcoming' | 'completed'>('all')
  const [showNewAppointmentModal, setShowNewAppointmentModal] = useState(false)
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Auth check
    const isAuthenticated = localStorage.getItem('admin_authenticated')
    if (!isAuthenticated) {
      router.push('/admin/login')
      return
    }

    // Subscribe to real-time appointment updates
    const unsubscribe = subscribeToAppointments((appointmentData) => {
      setAppointments(appointmentData)
      setLoading(false)
    })

    return unsubscribe
  }, [router])

  const handleStatusUpdate = async (appointmentId: string, newStatus: Appointment['status']) => {
    try {
      await updateAppointment(appointmentId, { status: newStatus })
    } catch (error) {
      console.error('Failed to update appointment status:', error)
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-b-2 border-moss mx-auto mb-4"></div>
          <p className="text-gray-600">Loading appointments...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Appointments</h1>
          <p className="text-gray-600">Manage your client appointments and schedule</p>
        </div>
        <div className="text-sm text-gray-500">
          Real-time updates enabled ⚡
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-4 shadow-soft">
          <div className="text-2xl font-bold text-gray-900">{appointments.length}</div>
          <div className="text-sm text-gray-600">Total Appointments</div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-soft">
          <div className="text-2xl font-bold text-blue-600">
            {appointments.filter(a => a.status === 'scheduled').length}
          </div>
          <div className="text-sm text-gray-600">Scheduled</div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-soft">
          <div className="text-2xl font-bold text-green-600">
            {appointments.filter(a => a.status === 'completed').length}
          </div>
          <div className="text-sm text-gray-600">Completed</div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-soft">
          <div className="text-2xl font-bold text-gray-600">
            {appointments.filter(a => {
              const today = new Date().toISOString().split('T')[0]
              return a.date === today && a.status === 'scheduled'
            }).length}
          </div>
          <div className="text-sm text-gray-600">Today</div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex space-x-4">
        {[
          { key: 'all', label: 'All' },
          { key: 'today', label: 'Today' },
          { key: 'upcoming', label: 'Upcoming' },
          { key: 'completed', label: 'Completed' }
        ].map(filterOption => (
          <button
            key={filterOption.key}
            onClick={() => setFilter(filterOption.key as any)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === filterOption.key
                ? 'bg-moss text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {filterOption.label}
          </button>
        ))}
      </div>

      {/* Appointments List */}
      <div className="bg-white rounded-lg shadow-soft">
        {filteredAppointments.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📅</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No appointments found</h3>
            <p className="text-gray-600">
              {filter === 'all' ? 'No appointments have been booked yet.' : `No ${filter} appointments found.`}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Client
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Service
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAppointments.map((appointment) => (
                  <tr key={appointment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {appointment.clientName}
                        </div>
                        <div className="text-sm text-gray-500">{appointment.clientEmail}</div>
                        <div className="text-sm text-gray-500">{appointment.clientPhone}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{appointment.service}</div>
                      <div className="text-sm text-gray-500">{appointment.duration} minutes</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{formatDate(appointment.date)}</div>
                      <div className="text-sm text-gray-500">{formatTime(appointment.time)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(appointment.status)}`}>
                        {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        {appointment.status === 'scheduled' && (
                          <>
                            <button
                              onClick={() => handleStatusUpdate(appointment.id, 'completed')}
                              className="text-green-600 hover:text-green-900"
                            >
                              Complete
                            </button>
                            <button
                              onClick={() => handleStatusUpdate(appointment.id, 'cancelled')}
                              className="text-red-600 hover:text-red-900"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => handleStatusUpdate(appointment.id, 'no-show')}
                              className="text-gray-600 hover:text-gray-900"
                            >
                              No Show
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => setSelectedAppointment(appointment)}
                          className="text-moss hover:text-moss/80"
                        >
                          View
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Appointment Details Modal */}
      {selectedAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Appointment Details</h2>
              <button
                onClick={() => setSelectedAppointment(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Client Name</label>
                  <p className="text-sm text-gray-900">{selectedAppointment.clientName}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <p className="text-sm text-gray-900">{selectedAppointment.clientEmail}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone</label>
                  <p className="text-sm text-gray-900">{selectedAppointment.clientPhone}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Service</label>
                  <p className="text-sm text-gray-900">{selectedAppointment.service}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Date</label>
                  <p className="text-sm text-gray-900">{formatDate(selectedAppointment.date)}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Time</label>
                  <p className="text-sm text-gray-900">{formatTime(selectedAppointment.time)}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Duration</label>
                  <p className="text-sm text-gray-900">{selectedAppointment.duration} minutes</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(selectedAppointment.status)}`}>
                    {selectedAppointment.status.charAt(0).toUpperCase() + selectedAppointment.status.slice(1)}
                  </span>
                </div>
              </div>

              {selectedAppointment.notes && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                  <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-lg">
                    {selectedAppointment.notes}
                  </p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Created</label>
                  <p className="text-sm text-gray-500">
                    {new Date(selectedAppointment.createdAt).toLocaleString()}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Last Updated</label>
                  <p className="text-sm text-gray-500">
                    {new Date(selectedAppointment.updatedAt).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-end space-x-4">
              <button
                onClick={() => setSelectedAppointment(null)}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}