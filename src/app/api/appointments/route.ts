import { NextRequest, NextResponse } from 'next/server'
import { createAppointment } from '@/lib/firebase-utils'
import { BookingData } from '@/types'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, ...bookingData }: BookingData & { userId: string } = body

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      )
    }

    // Validate required fields
    const requiredFields = ['service', 'date', 'time', 'duration', 'clientName', 'clientEmail', 'clientPhone']
    for (const field of requiredFields) {
      if (!bookingData[field as keyof BookingData]) {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        )
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(bookingData.clientEmail)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Validate phone format (basic validation)
    const phoneRegex = /^[\+]?[1-9][\d]{8,14}$/
    if (!phoneRegex.test(bookingData.clientPhone.replace(/[\s\-\(\)]/g, ''))) {
      return NextResponse.json(
        { error: 'Invalid phone number format' },
        { status: 400 }
      )
    }

    // Validate date (must be in the future)
    const appointmentDate = new Date(bookingData.date)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    if (appointmentDate < today) {
      return NextResponse.json(
        { error: 'Appointment date must be in the future' },
        { status: 400 }
      )
    }

    // Create the appointment
    const appointment = await createAppointment({ userId, ...bookingData })

    return NextResponse.json(
      { 
        success: true, 
        appointment,
        message: 'Appointment booked successfully!'
      },
      { status: 201 }
    )

  } catch (error) {
    console.error('Error creating appointment:', error)
    return NextResponse.json(
      { error: 'Failed to create appointment' },
      { status: 500 }
    )
  }
}