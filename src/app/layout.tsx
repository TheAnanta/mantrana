import type { Metadata } from "next";
import { AuthProvider } from "@/contexts/AuthContext";
import { Analytics } from "@vercel/analytics/react";
import AnnouncementBar from "@/components/AnnouncementBar";
import "./globals.css";

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
      <body className="font-gilroy min-h-screen bg-white">
        <AnnouncementBar />
        <AuthProvider>{children}</AuthProvider>

        <Analytics />
      </body>
    </html>
  );
}
