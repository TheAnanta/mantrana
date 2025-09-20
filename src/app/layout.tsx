import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Mantrana by Mohana Rupa | Professional Therapy & Counselling',
  description: 'Professional therapy, counselling, and coaching services by Mohana Rupa. Expert guidance for mental wellness, personal growth, and inner clarity.',
  keywords: ['therapy', 'counselling', 'coaching', 'mental health', 'wellness', 'Mohana Rupa', 'Mantrana'],
  authors: [{ name: 'Mohana Rupa' }],
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white">
        {children}
      </body>
    </html>
  )
}