import type { Metadata } from "next";
import { AuthProvider } from "@/contexts/AuthContext";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { Montserrat } from "next/font/google";
import localFont from "next/font/local";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const awesomeSerif = localFont({
  src: [
    {
      path: "../../public/fonts/AwesomeSerif-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/AwesomeSerif-MediumRegular.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/AwesomeSerif-SemiBoldRegular.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/AwesomeSerif-BoldRegular.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-awesome-serif",
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
    <html lang="en" className={`${montserrat.variable} ${awesomeSerif.variable}`}>
      <body className="font-montserrat min-h-screen bg-background text-charcoal">
        <AuthProvider>{children}</AuthProvider>

        <Analytics />
      </body>
    </html>
  );
}
