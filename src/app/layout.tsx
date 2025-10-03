import type { Metadata } from "next";
import { AuthProvider } from "@/contexts/AuthContext";
import { Plus_Jakarta_Sans, Elsie } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
});

const elsie = Elsie({
  subsets: ["latin"],
  weight: ["400", "900"],
  variable: "--font-elsie",
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
      <body
        className={`${plusJakartaSans.className} ${elsie.variable} min-h-screen bg-white`}
      >
        <AuthProvider>{children}</AuthProvider>

        <Analytics />
      </body>
    </html>
  );
}
