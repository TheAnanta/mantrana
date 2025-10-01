import { NextRequest, NextResponse } from 'next/server'
import { getAvailableSlots } from '@/lib/firebase-utils'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const date = searchParams.get('date')
    const service = searchParams.get('service')

    if (!date) {
      return NextResponse.json(
        { error: 'Date parameter is required' },
        { status: 400 }
      )
    }

    if (!service) {
      return NextResponse.json(
        { error: 'Service parameter is required' },
        { status: 400 }
      )
    }

    // Validate date format
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/
    if (!dateRegex.test(date)) {
      return NextResponse.json(
        { error: 'Invalid date format. Use YYYY-MM-DD' },
        { status: 400 }
      )
    }

    // Validate that date is not in the past
    const requestedDate = new Date(date)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    if (requestedDate < today) {
      return NextResponse.json(
        { error: 'Cannot get slots for past dates' },
        { status: 400 }
      )
    }

    const slots = await getAvailableSlots(date, service)

    return NextResponse.json({
      success: true,
      date,
      service,
      slots
    })

  } catch (error) {
    console.error('Error fetching available slots:', error)
    return NextResponse.json(
      { error: 'Failed to fetch available slots' },
      { status: 500 }
    )
  }
}