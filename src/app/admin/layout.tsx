"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { auth } from "@/lib/firebase";
import { getIdToken } from "firebase/auth";

const navigation = [
  { name: "Dashboard", href: "/admin", icon: "📊" },
  { name: "Appointments", href: "/admin/appointments", icon: "📅" },
  { name: "Testimonials", href: "/admin/testimonials", icon: "💬" },
  { name: "Blog Posts", href: "/admin/blog", icon: "📝" },
  { name: "Analytics", href: "/admin/analytics", icon: "📈" },
  { name: "Settings", href: "/admin/settings", icon: "⚙️" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();
   const router = useRouter();
  const { user, logout, loading } = useAuth();
  const [isVerifying, setIsVerifying] = useState(true);

  useEffect(() => {
    const verifySession = async () => {
      if (pathname === "/admin/login") {
        setIsVerifying(false);
        return;
      }

      if (!loading) {
        if (!user && !localStorage.getItem('admin_authenticated')) {
          router.push("/admin/login");
          return;
        }

        if (user && auth.currentUser) {
          try {
            // Force token refresh to verify session is still live in Firebase
            await getIdToken(auth.currentUser, true);
          } catch (error) {
            console.error("Session verification failed:", error);
            localStorage.removeItem('admin_authenticated');
            await logout();
            router.push("/admin/login");
          }
        }
        setIsVerifying(false);
      }
    };

    verifySession();
  }, [user, loading, pathname, router, logout]);

  const userInitials = user?.displayName
    ? user.displayName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "AD";

   // Don't show sidebar on login page
  if (pathname === "/admin/login") {
    return children;
  }

  if (isVerifying || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center">
          <div className="h-12 w-12 border-4 border-teal/20 border-t-teal rounded-full animate-spin"></div>
          <p className="mt-4 text-charcoal/40 font-medium">Verifying session...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:inset-0`}
      >
        <div className="flex flex-col justify-center pt-8 h-16 px-4">
          <h1 className="text-xl font-bold text-teal font-awesome-serif">Mantrana</h1>
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
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${isActive
                      ? "bg-teal/10 text-teal"
                      : "text-charcoal/60 hover:bg-teal/5 hover:text-charcoal"
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
                className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-charcoal/60 hover:bg-teal/5 hover:text-charcoal"
                target="_blank"
              >
                <span className="mr-3 text-lg">🏠</span>
                View Website
              </Link>
              <button
                className="w-full group flex items-center px-2 py-2 text-sm font-medium rounded-md text-charcoal/60 hover:bg-teal/5 hover:text-charcoal"
                onClick={async () => {
                  if (confirm("Are you sure you want to logout?")) {
                    localStorage.removeItem('admin_authenticated');
                    await logout();
                    router.push("/admin/login");
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
            className="px-4 border-r border-teal/10 text-charcoal/40 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal lg:hidden"
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
              <h2 className="text-2xl font-semibold text-charcoal font-awesome-serif">
                {navigation.find((item) => item.href === pathname)?.name ||
                  "Admin Panel"}
              </h2>
            </div>
            <div className="ml-4 flex items-center md:ml-6">
              <div className="relative">
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-700">Welcome, {user?.displayName || "Admin"}</span>
                  <div className="h-8 w-8 bg-teal/20 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-teal">{userInitials}</span>
                  </div>
                  <button
                    onClick={async () => {
                      if (confirm("Are you sure you want to logout?")) {
                        localStorage.removeItem('admin_authenticated');
                        await logout();
                        router.push("/admin/login");
                      }
                    }}
                    className="p-2 text-charcoal/40 hover:text-red-500 transition-colors"
                    title="Logout"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                  </button>
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
