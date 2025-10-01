# Firebase Backend Setup Instructions

This project now includes a complete Firebase backend implementation with realtime database for appointment booking and Google authentication.

## Features Implemented

✅ **Firebase Realtime Database Integration**

- Real-time appointment storage and synchronization
- User profile management
- Automatic availability slot calculation

✅ **Google Authentication**

- OAuth 2.0 login with Google
- User session management
- Automatic user profile creation

✅ **Appointment Booking System**

- Dynamic time slot availability checking
- Real-time slot updates
- Multi-service support (Individual Therapy, Life Coaching, Consultation Call)

✅ **User Account Management**

- Personal appointment dashboard
- Real-time appointment status updates
- Appointment history tracking

✅ **Admin Dashboard Enhancement**

- Real-time appointment monitoring
- Status management (scheduled, completed, cancelled, no-show)
- Detailed appointment information

## Setup Instructions

### 1. Firebase Project Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or use an existing one
3. Enable the following services:
   - **Authentication** → Sign-in method → Google (Enable Google sign-in)
   - **Realtime Database** → Create database → Start in test mode

### 2. Environment Configuration

1. Copy `.env.local.example` to `.env.local`
2. Replace the placeholder values with your actual Firebase configuration:

```bash
# Get these values from Firebase Console → Project Settings → General → Your apps
NEXT_PUBLIC_FIREBASE_API_KEY=your_actual_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_DATABASE_URL=https://your_project_id-default-rtdb.firebaseio.com/
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 3. Firebase Security Rules

Set up the following security rules in Firebase Realtime Database:

```json
{
  "rules": {
    "users": {
      "$uid": {
        ".read": "$uid === auth.uid",
        ".write": "$uid === auth.uid"
      }
    },
    "appointments": {
      ".read": "auth != null",
      ".write": "auth != null",
      "$appointmentId": {
        ".validate": "newData.hasChildren(['userId', 'clientName', 'clientEmail', 'service', 'date', 'time', 'status'])"
      }
    }
  }
}
```

### 4. Google OAuth Configuration

1. In Firebase Console → Authentication → Sign-in method → Google
2. Enable Google sign-in
3. Add your domain to authorized domains
4. For production, configure OAuth consent screen in Google Cloud Console

## How It Works

### User Flow

1. **Visit `/book`** → Select service → Choose date & time → Sign in with Google → Complete booking
2. **Visit `/account`** → View all appointments with real-time status updates
3. **Sign out** → Available from header menu

### Admin Flow

1. **Visit `/admin/login`** → Use existing admin credentials
2. **View `/admin/appointments`** → Real-time appointment dashboard
3. **Manage appointments** → Update status, view details

### Real-time Features

- **Slot Availability**: Automatically updates when appointments are booked/cancelled
- **Admin Dashboard**: Live updates when new appointments are made
- **User Account**: Real-time status changes (scheduled → completed, etc.)

## API Endpoints

- `POST /api/appointments` - Create new appointment
- `GET /api/slots?date=YYYY-MM-DD&service=ServiceName` - Get available time slots

## Technical Implementation

### Database Structure

```
mantrana-db/
├── users/
│   └── {userId}/
│       ├── uid: string
│       ├── email: string
│       ├── displayName: string
│       ├── photoURL?: string
│       └── createdAt: string
└── appointments/
    └── {appointmentId}/
        ├── id: string
        ├── userId: string
        ├── clientName: string
        ├── clientEmail: string
        ├── clientPhone: string
        ├── service: string
        ├── date: string (YYYY-MM-DD)
        ├── time: string (HH:MM)
        ├── status: 'scheduled' | 'completed' | 'cancelled' | 'no-show'
        ├── notes?: string
        ├── duration: number (minutes)
        ├── createdAt: string
        └── updatedAt: string
```

### Services Available

- **Individual Therapy** (60 minutes) - ₹2,500
- **Life Coaching** (60 minutes) - ₹3,000
- **Consultation Call** (15 minutes) - Free

### Working Hours

- **Monday to Sunday**: 9:00 AM to 6:00 PM
- **Time Slots**: 30-minute intervals
- **Automatic Conflict Detection**: Prevents double-booking

## Testing

1. Start the development server: `npm run dev`
2. Visit `http://localhost:3000/book`
3. Test the booking flow with Google sign-in
4. Check real-time updates in admin panel

## Production Deployment

1. Set production Firebase configuration in environment variables
2. Configure production domain in Firebase Authentication
3. Update Firebase security rules for production
4. Deploy with `npm run build && npm start`

## Support

The implementation includes error handling, loading states, and user feedback for a complete user experience. All Firebase operations are properly typed with TypeScript for better development experience.
