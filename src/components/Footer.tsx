"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getSiteSettings } from "@/lib/firebase-utils";
import { SiteSettings } from "@/types";

export default function Footer() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    async function fetchSettings() {
      try {
        const data = await getSiteSettings();
        setSettings(data);
      } catch (error) {
        console.error("Failed to fetch settings:", error);
      }
    }
    fetchSettings();
  }, []);

  const navigation = {
    main: [
      { name: "Home", href: "/" },
      { name: "About", href: "/about" },
      { name: "Services", href: "/services" },
      { name: "Blog", href: "/blog" },
      { name: "Contact", href: "/contact" },
    ],
    legal: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms & Conditions", href: "/terms" },
      { name: "Refund Policy", href: "/refund" },
    ],
  };

  const socialLinks = settings?.socialLinks || {};

  const social = [
    {
      name: "Instagram",
      href: socialLinks.instagram,
      icon: (
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.315 2c2.43 0 2.715.01 3.67.05 1.03.045 1.735.21 2.357.452.642.25 1.187.582 1.733 1.127.545.546.878 1.09 1.127 1.733.243.622.408 1.327.452 2.357.045.955.055 1.24.055 3.67 0 2.43-.01 2.715-.05 3.67-.045 1.03-.21 1.735-.452 2.357-.25.642-.582 1.187-1.127 1.733-.546.545-1.09.878-1.733 1.127-.622.243-1.327.408-2.357.452-.955.045-1.24.055-3.67.055-2.43 0-2.715-.01-3.67-.05-1.03-.045-1.735-.21-2.357-.452-.642-.25-1.187-.582-1.733-1.127-.545-.546-.878-1.09-1.127-1.733-.243-.622-.408-1.327-.452-2.357-.045-.955-.055-1.24-.055-3.67 0-2.43.01-2.715.05-3.67.045-1.03.21-1.735.452-2.357.25-.642.582-1.187 1.127-1.733.546-.545 1.09-.878 1.733-1.127.622-.243 1.327-.408 2.357-.452.955-.045 1.24-.055 3.67-.055zM12 7.056c-2.73 0-4.944 2.214-4.944 4.944 0 2.73 2.214 4.944 4.944 4.944 2.73 0 4.944-2.214 4.944-4.944 0-2.73-2.214-4.944-4.944-4.944zm0 8.112c-1.75 0-3.168-1.418-3.168-3.168 0-1.75 1.418-3.168 3.168-3.168s3.168 1.418 3.168 3.168c0 1.75-1.418 3.168-3.168 3.168zm7.348-11.415c-.63 0-1.14.51-1.14 1.14s.51 1.14 1.14 1.14 1.14-.51 1.14-1.14-.51-1.14-1.14-1.14z" />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      href: socialLinks.linkedin,
      icon: (
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      ),
    },
    {
      name: "WhatsApp",
      href: socialLinks.whatsapp,
      icon: (
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.417-.003 6.557-5.338 11.892-11.893 11.892-1.997-.001-3.951-.5-5.688-1.448l-6.305 1.652zm6.599-3.835c1.516.899 3.193 1.374 4.904 1.375 5.405 0 9.805-4.399 9.807-9.805.001-2.618-1.02-5.08-2.881-6.941-1.861-1.861-4.326-2.88-6.945-2.88-5.407 0-9.808 4.402-9.81 9.808 0 1.838.513 3.633 1.484 5.21l-.986 3.601 3.693-.968zm12.39-4.51c-.26-.13-1.54-.759-1.778-.847-.239-.087-.413-.13-.587.13-.173.26-.673.847-.824 1.021-.151.173-.304.195-.564.065-.26-.13-1.1-.405-2.096-1.292-.774-.69-1.297-1.541-1.448-1.802-.151-.26-.016-.401.114-.531.117-.117.26-.304.39-.455.13-.151.173-.26.26-.434.087-.173.043-.325-.022-.455-.065-.13-.587-1.412-.804-1.933-.211-.51-.443-.44-.608-.448-.157-.008-.337-.009-.517-.009s-.473.067-.719.337c-.247.27-1.107 1.083-1.107 2.642s1.147 3.056 1.306 3.268c.159.213 2.21 3.376 5.353 4.737.748.324 1.332.518 1.787.662.752.239 1.436.205 1.977.125.602-.09 1.54-.629 1.758-1.237.217-.607.217-1.127.152-1.237-.064-.11-.239-.195-.499-.325z" />
        </svg>
      ),
    },
    {
      name: "Facebook",
      href: socialLinks.facebook,
      icon: (
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.324v-21.35c0-.732-.593-1.325-1.323-1.325z" />
        </svg>
      ),
    },
    {
      name: "Twitter",
      href: socialLinks.twitter,
      icon: (
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
        </svg>
      ),
    },
    {
      name: "YouTube",
      href: socialLinks.youtube,
      icon: (
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="bg-black border-t border-white/10 text-white">
      <div className="container-custom py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="text-3xl font-bold text-white mb-6 font-awesome-serif uppercase tracking-widest">
              Mantrana
            </div>
            <p className="text-white/70 text-sm md:text-base leading-relaxed mb-8 max-w-md font-montserrat font-medium">
              Psychotherapist &amp; Behavioral Specialist. Providing
              compassionate guidance through digital-age challenges, life
              transitions, and inner struggles—helping you find clarity and
              strength.
            </p>
            <div className="text-xs text-white/50 font-montserrat uppercase tracking-wider">
              <p className="mb-2">
                &copy; {new Date().getFullYear()} Mantrana | Therapy by Mohana
                Rupa. All rights reserved.
              </p>
              <p>Thriving in Balance • Guidance • Clarity</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-1">
            <h3 className="text-sm font-semibold text-white/50 mb-6 uppercase tracking-widest font-montserrat">
              Quick Links
            </h3>
            <ul className="space-y-4">
              {navigation.main.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-white/80 hover:text-white hover:ml-2 transition-all duration-300 font-montserrat text-sm uppercase tracking-wider font-semibold"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Connect */}
          <div className="lg:col-span-1">
            <h3 className="text-sm font-semibold text-white/50 mb-6 uppercase tracking-widest font-montserrat">
              Legal
            </h3>
            <ul className="space-y-4 mb-10">
              {navigation.legal.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-white/80 hover:text-white hover:ml-2 transition-all duration-300 font-montserrat text-sm uppercase tracking-wider font-semibold"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Social Links */}
            <div>
              <h4 className="text-sm font-semibold text-white/50 mb-6 uppercase tracking-widest font-montserrat">
                Connect
              </h4>
              <div className="flex flex-wrap gap-4">
                {social
                  .filter((item) => item.href)
                  .map((item) => (
                    <Link
                      key={item.name}
                      href={item.href!}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/60 hover:text-white hover:-translate-y-1 transition-all duration-300"
                      aria-label={item.name}
                    >
                      {item.icon}
                    </Link>
                  ))}
              </div>
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="lg:col-span-1 flex flex-col justify-start">
            <h3 className="text-sm font-semibold text-white/50 mb-6 uppercase tracking-widest font-montserrat">
              Stay Connected
            </h3>
            <p className="text-white/80 text-sm mb-6 leading-relaxed font-montserrat font-medium">
              Join our newsletter for wellness tips and updates from Mantrana.
            </p>
            <form className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-5 py-4 border border-white/20 bg-white/5 rounded-none focus:outline-none focus:ring-1 focus:ring-white focus:border-white text-white text-sm font-montserrat placeholder:text-white/40"
              />
              <button
                type="submit"
                className="bg-white text-black font-semibold uppercase tracking-widest text-sm px-6 py-4 hover:bg-gray-200 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
}
