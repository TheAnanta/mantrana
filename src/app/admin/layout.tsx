"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { name: "Dashboard", href: "/admin", icon: "📊" },
  { name: "Appointments", href: "/admin/appointments", icon: "📅" },
  { name: "Testimonials", href: "/admin/testimonials", icon: "💬" },
  { name: "Blog Posts", href: "/admin/blog", icon: "📝" },
  { name: "Analytics", href: "/admin/analytics", icon: "📈" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  // Don't show sidebar on login page
  if (pathname === "/admin/login") {
    return children;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:inset-0`}
      >
        <div className="flex flex-col justify-center pt-8 h-16 px-4">
          <h1 className="text-xl font-bold text-moss">Mantrana</h1>
          <p className="text-sm opacity-50 font-semibold">Admin</p>
        </div>

        <nav className="mt-8">
          <div className="px-2 space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive
                      ? "bg-moss/10 text-moss"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <span className="mr-3 text-lg">{item.icon}</span>
                  {item.name}
                </Link>
              );
            })}
          </div>

          <div className="mt-8 pt-4 border-t border-gray-200">
            <div className="px-2 space-y-1">
              <Link
                href="/"
                className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                target="_blank"
              >
                <span className="mr-3 text-lg">🏠</span>
                View Website
              </Link>
              <button
                className="w-full group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                onClick={() => {
                  // Simple logout - in a real app, this would clear auth tokens
                  if (confirm("Are you sure you want to logout?")) {
                    window.location.href = "/admin/login";
                  }
                }}
              >
                <span className="mr-3 text-lg">🚪</span>
                Logout
              </button>
            </div>
          </div>
        </nav>
      </div>

      {/* Mobile sidebar overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="sticky top-0 z-10 flex h-16 bg-white shadow">
          <button
            type="button"
            className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-moss lg:hidden"
            onClick={() => setIsSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          <div className="flex-1 px-4 flex justify-between items-center">
            <div className="flex-1 flex">
              <h2 className="text-2xl font-semibold text-gray-900">
                {navigation.find((item) => item.href === pathname)?.name ||
                  "Admin Panel"}
              </h2>
            </div>
            <div className="ml-4 flex items-center md:ml-6">
              <div className="relative">
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-700">Welcome, Mohana</span>
                  <div className="h-8 w-8 bg-moss/20 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-moss">MR</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1">
          <div className="p-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
