import { initializeApp, getApps } from 'firebase/app'
import { getDatabase } from 'firebase/database'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'demo-api-key',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'demo-project.firebaseapp.com',
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL || 'https://demo-project-default-rtdb.firebaseio.com/',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'demo-project',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'demo-project.appspot.com',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '123456789',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '1:123456789:web:abcdef123456'
}

// Initialize Firebase only if it hasn't been initialized
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]

// Initialize services
export const database = getDatabase(app)
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()

export default app