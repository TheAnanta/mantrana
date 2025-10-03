"use client";

import { useState } from "react";
import Link from "next/link";
import { Elsie } from "next/font/google";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

const elsie = Elsie({
  subsets: ["latin"],
  weight: ["400", "900"],
  variable: "--font-elsie",
});

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about", hasDropdown: true },
  { name: "Services", href: "/services" },
  { name: "Blog", href: "/blog" },
  { name: "Testimonials", href: "/#testimonials" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  const { user, loading, logout } = useAuth();

  const route = usePathname();
  const isHomePage = route === "/";
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header
      className={` top-0 w-full z-50 ${
        isHomePage
          ? "absolute bg-[var(--teal)]"
          : "fixed top-0 shadow-md glass-effect"
      }`}
    >
      <nav className="container-custom">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <div
              className={`text-lg lg:text-xl ${
                isHomePage
                  ? `text-white ${elsie.className}`
                  : "text-moss font-bold"
              }`}
            >
              Mantrana – Therapy by Mohana Rupa
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) =>
              item.hasDropdown ? (
                <div key={item.name} className="relative group">
                  <button
                    className={`${
                      isHomePage
                        ? "text-white/60 hover:text-white group-hover:text-white"
                        : "text-gray-700 hover:text-moss group-hover:text-moss"
                    } transition-colors duration-300 font-medium flex items-center`}
                  >
                    {item.name}
                    <svg
                      className="w-4 h-4 ml-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="w-56 bg-white rounded-xl shadow-lg py-2 border border-gray-100">
                      <Link
                        href="/about#about-me"
                        className="block px-4 py-2 text-gray-700 hover:bg-moss/10 hover:text-moss transition-colors"
                      >
                        About Me
                      </Link>
                      <Link
                        href="/about#about-mantrana"
                        className="block px-4 py-2 text-gray-700 hover:bg-moss/10 hover:text-moss transition-colors"
                      >
                        About Mantrana Therapy
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`${
                    isHomePage
                      ? "text-white/60 hover:text-white"
                      : "text-gray-700 hover:text-moss"
                  } transition-colors duration-300 font-medium`}
                >
                  {item.name}
                </Link>
              )
            )}

            {!loading && (
              <>
                {user ? (
                  <div className="flex items-center space-x-4 ml-4">
                    <Link href="/book" className="btn-pill btn-secondary">
                      Book Session
                    </Link>
                    <Link
                      href="/account"
                      className="text-gray-700 hover:text-moss transition-colors duration-300 font-medium"
                    >
                      <img
                        src={user.photoURL}
                        className="size-12 object-cover rounded-full"
                      />
                    </Link>
                  </div>
                ) : (
                  <div className="flex items-center space-x-4 ml-4">
                    <Link
                      href="/login"
                      className="text-white border-2 btn-pill hover:bg-[#E54160] hover:border-[#E54160] transition-colors duration-300 font-medium"
                    >
                      Sign In
                    </Link>
                    <Link href="/book" className="btn-pill btn-secondary ml-4">
                      Book a Session
                    </Link>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-700 hover:text-moss focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden pb-4">
            <div className="flex flex-col space-y-3">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-moss transition-colors duration-300 font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}

              {!loading && (
                <>
                  {user ? (
                    <>
                      <Link
                        href="/book"
                        className="btn-pill btn-secondary w-fit mt-2"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Book Session
                      </Link>
                      <Link
                        href="/account"
                        className="text-gray-700 hover:text-moss transition-colors duration-300 font-medium py-2"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <img
                          src={user.photoURL}
                          className="size-12 object-cover rounded-full inline-block mr-2"
                        />
                      </Link>
                      {/* <button
                        onClick={handleLogout}
                        className="text-gray-700 hover:text-moss transition-colors duration-300 font-medium py-2 text-left"
                      >
                        Sign Out
                      </button> */}
                    </>
                  ) : (
                    <>
                      <Link
                        href="/login"
                        className="text-gray-700 hover:text-moss transition-colors duration-300 font-medium py-2"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Sign In
                      </Link>
                      <Link
                        href="/book"
                        className="btn-pill btn-primary w-fit mt-2"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Book a Session
                      </Link>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
