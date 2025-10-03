"use client";

import { useEffect, useState } from "react";
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
  const [isScrolledBeyondThreshold, setIsScrolledBeyondThreshold] =
    useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Check if scrollY is greater than the viewport height
      if (window.scrollY > window.innerHeight) {
        setIsScrolledBeyondThreshold(true);
      } else {
        setIsScrolledBeyondThreshold(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={` top-0 w-full z-50 ${
        isHomePage && !isScrolledBeyondThreshold
          ? "absolute bg-transparent"
          : "fixed top-0 shadow-md bg-white"
      }`}
    >
      <nav className="container-custom">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.2"
              viewBox="0 0 199 184"
              className={`size-12`}
              style={{
                fill: isHomePage
                  ? isScrolledBeyondThreshold
                    ? "black"
                    : "white"
                  : "#D56989",
              }}
            >
              <path
                fill-rule="evenodd"
                d="m78 23 3.87 11.25c2.13 6.19 8.77 25.31 14.75 42.5 5.99 17.18 11.22 31.24 11.63 31.25.41 0 1.02-1.01 1.35-2.25.33-1.24.76-2.92.96-3.75.19-.83 6.36-18.82 27.05-78.5l22.7-.25c17.76-.2 22.62.02 22.35 1-.19.69-1.77 1.59-3.5 2-1.86.44-3.98 1.99-5.16 3.75-1.95 2.92-2 4.67-2 128l3.5 3.5c1.93 1.93 4.4 3.5 5.5 3.5 1.1 0 2 .45 2 1 0 .64-10.67 1-30 1s-30-.36-30-1c0-.55.67-1 1.5-1s2.74-.61 4.25-1.36c1.51-.75 3.54-3 4.5-5 1.61-3.36 1.73-8.18 1.25-121.01l-21.8 62.93c-12 34.62-22.21 63.62-22.7 64.44-.49.83-1.06 1.28-1.27 1-.21-.27-10.24-29.07-44.23-127.5l-.23 39c-.2 32.58 0 39.25 1.19 40.5.78.83 2.16 3.3 3.07 5.5.91 2.2 1.63 6.48 1.61 9.5-.04 3.76-.8 6.93-2.41 10-1.29 2.48-2.98 4.5-3.76 4.5-.77 0-2.42-1.8-3.66-4-1.24-2.2-2.54-6.02-2.89-8.5-.39-2.75-.11-6.24.72-8.97.75-2.46 2.15-5.5 3.11-6.75 1.61-2.1 1.73-5.55 1.5-43.53-.24-39.5-.34-41.4-2.3-44.75-1.49-2.56-3.17-3.84-6.25-4.75-2.31-.69-4.2-1.7-4.2-2.25 0-.64 8.67-1 48-1zM21.5 132c2.26-.01 6.18 1.04 9 2.42 4.1 2 5.3 3.21 6.69 6.76.93 2.38 2.4 4.88 3.25 5.57.86.69 1.33 1.7 1.06 2.25-.28.55-1.96 1.03-3.75 1.06-2.71.06-2.92.21-1.25.91 1.1.47 4.92 3.82 8.5 7.45 5.09 5.17 7.15 6.61 9.5 6.63 1.71.02 3.62-.73 4.45-1.76.8-.98 1.45-2.69 1.45-3.79s-.65-2.81-1.45-3.79c-.84-1.05-2.71-1.77-4.45-1.73-1.69.03-3.99 1.04-5.26 2.29-1.79 1.76-2.53 1.97-3.5 1-.98-.97-.83-1.67.76-3.36 1.1-1.18 2.9-2.51 4-2.96 1.81-.75 1.77-.83-.5-.86-1.38-.02-2.84-.27-3.25-.56-.41-.29.71-3.3 2.5-6.69 2.77-5.26 3.98-6.51 8.25-8.49 2.75-1.28 6.91-2.33 9.25-2.34 2.43-.01 4.5.52 4.83 1.24.32.69-.09 2.6-.91 4.25-.82 1.65-2.77 4.19-4.33 5.64-1.56 1.45-4.3 3.36-6.09 4.25-1.79.88-4.04 1.64-5 1.69-.96.04-.25.6 1.57 1.25 1.83.64 4.21 2.3 5.3 3.67 1.08 1.38 1.96 3.85 1.96 5.5-.01 1.65-.93 4.24-2.05 5.75-1.71 2.32-2.77 2.75-6.78 2.78-4.52.02-5.12-.32-12.25-6.98-5.38-5.03-8.26-7.02-10.18-7.03-1.47-.01-3.38.66-4.25 1.48-.86.83-1.56 2.51-1.54 3.75.01 1.24.8 3.05 1.75 4.03.94.98 2.84 1.76 4.22 1.73 1.37-.03 3.5-1.06 4.73-2.28 1.54-1.54 2.78-1.99 4-1.46 1.58.69 1.45 1.08-1.23 3.77-2.47 2.47-3.8 2.99-7.5 2.96-3.27-.03-5.12-.65-6.78-2.27-1.61-1.58-2.27-3.39-2.27-6.23 0-2.86.65-4.62 2.27-6.18 1.26-1.19 3.63-2.5 8.28-3.63l-4-1.14c-2.2-.62-5.46-2.13-7.25-3.34-1.79-1.22-4.49-4.28-6-6.81-2.34-3.91-2.53-4.72-1.25-5.48.82-.49 3.3-.9 5.5-.92zm6.84-11c.64.01 2.62.91 4.41 2 2.97 1.83 3.25 2.44 3.25 7 0 2.75-.23 5-.5 5-.28 0-2.19-.87-4.25-1.93-2.25-1.16-4.05-2.96-4.5-4.5-.41-1.41-.48-3.69-.16-5.07.32-1.37 1.11-2.5 1.75-2.5zm31.41.04c.84-.03 1.25 1.6 1.25 4.96 0 4.91-.08 5.04-4.25 6.97-2.34 1.08-4.3 1.87-4.37 1.75-.06-.12-.4-2.36-.75-4.97-.62-4.7-.59-4.77 3.12-6.71 2.06-1.07 4.31-1.97 5-2z"
              />
            </svg>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) =>
              item.hasDropdown ? (
                <div key={item.name} className="relative group">
                  <button
                    className={`${
                      isHomePage
                        ? isScrolledBeyondThreshold
                          ? "text-black/60 hover:text-teal group-hover:text-teal"
                          : "text-white/60 hover:text-white group-hover:text-white"
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
                        className="block px-4 py-2 text-gray-700 hover:bg-teal/10 hover:text-teal transition-colors"
                      >
                        About Me
                      </Link>
                      <Link
                        href="/about#about-mantrana"
                        className="block px-4 py-2 text-gray-700 hover:bg-teal/10 hover:text-teal transition-colors"
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
                      ? isScrolledBeyondThreshold
                        ? "text-black/60 hover:text-teal"
                        : "text-white/60 hover:text-white"
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
                      className={
                        !isHomePage || isScrolledBeyondThreshold
                          ? "text-black border-2 !text-sm p-3 px-6 rounded-full hover:bg-black/10 transition-colors duration-300 font-medium"
                          : "text-white border-2 !text-sm p-3 px-6 rounded-full hover:bg-black/10 transition-colors duration-300 font-medium"
                      }
                    >
                      Sign In
                    </Link>
                    {(!isHomePage || isScrolledBeyondThreshold) && (
                      <Link
                        href="/book"
                        className={
                          !isHomePage
                            ? "!text-sm p-3 px-6 hover:bg-amaranth bg-[#D56989] rounded-full text-white ml-4  transition-colors duration-300 font-medium"
                            : "!text-sm p-3 px-6 bg-teal rounded-full text-white ml-4"
                        }
                      >
                        Book a Session
                      </Link>
                    )}
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
