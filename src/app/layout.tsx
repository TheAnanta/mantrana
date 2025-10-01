
import type { Metadata } from 'next'
import { AuthProvider } from '@/contexts/AuthContext'
import { Plus_Jakarta_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
});


export const metadata: Metadata = {
  title: "Mantrana by Mohana Rupa | Professional Therapy & Counselling",
  description:
    "Professional therapy, counselling, and coaching services by Mohana Rupa. Expert guidance for mental wellness, personal growth, and inner clarity.",
  keywords: [
    "therapy",
    "counselling",
    "coaching",
    "mental health",
    "wellness",
    "Mohana Rupa",
    "Mantrana",
  ],
  authors: [{ name: "Mohana Rupa" }],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">

        

      <body className={`${plusJakartaSans.className} min-h-screen bg-white`}>
        <AuthProvider>
          {children}
        </AuthProvider>

        <Analytics />
      </body>
    </html>
  );
}
