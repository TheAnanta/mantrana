"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface DashboardStats {
  totalAppointments: number;
  appointmentsToday: number;
  totalTestimonials: number;
  totalBlogPosts: number;
  pageViews: number;
  newClients: number;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats>({
    totalAppointments: 0,
    appointmentsToday: 0,
    totalTestimonials: 0,
    totalBlogPosts: 0,
    pageViews: 0,
    newClients: 0,
  });

  useEffect(() => {
    // Simple auth check - in a real app, this would be proper JWT validation
    const isAuthenticated = localStorage.getItem("admin_authenticated");
    if (!isAuthenticated) {
      router.push("/admin/login");
      return;
    }

    // Simulate loading dashboard stats
    setTimeout(() => {
      setStats({
        totalAppointments: 127,
        appointmentsToday: 5,
        totalTestimonials: 6,
        totalBlogPosts: 12,
        pageViews: 2847,
        newClients: 23,
      });
    }, 500);
  }, [router]);

  const quickActions = [
    {
      title: "Schedule Appointment",
      description: "Add a new appointment to the calendar",
      href: "/admin/appointments?action=new",
      icon: "📅",
      color: "bg-blue-500",
    },
    {
      title: "Add Testimonial",
      description: "Share a client success story",
      href: "/admin/testimonials?action=new",
      icon: "💬",
      color: "bg-green-500",
    },
    {
      title: "Write Blog Post",
      description: "Create new content for your blog",
      href: "/admin/blog?action=new",
      icon: "📝",
      color: "bg-purple-500",
    },
    {
      title: "View Analytics",
      description: "Check your website performance",
      href: "/admin/analytics",
      icon: "📈",
      color: "bg-orange-500",
    },
  ];

  const recentActivity = [
    {
      type: "appointment",
      message: "New appointment booked by Sarah M.",
      time: "2 hours ago",
    },
    {
      type: "testimonial",
      message: "Testimonial submitted by Raj K.",
      time: "4 hours ago",
    },
    {
      type: "blog",
      message: 'Blog post "Managing Anxiety" published',
      time: "1 day ago",
    },
    {
      type: "contact",
      message: "New contact form submission",
      time: "2 days ago",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-moss to-moss/80 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Welcome back, Mohana! 👋</h1>
        <p className="text-moss-100">
          Here's what's happening with your practice today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-soft">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <span className="text-2xl">📅</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Total Appointments
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {stats.totalAppointments}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-soft">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <span className="text-2xl">🗓️</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Today's Appointments
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {stats.appointmentsToday}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-soft">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <span className="text-2xl">💬</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Testimonials</p>
              <p className="text-2xl font-bold text-gray-900">
                {stats.totalTestimonials}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-soft">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <span className="text-2xl">📝</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Blog Posts</p>
              <p className="text-2xl font-bold text-gray-900">
                {stats.totalBlogPosts}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-soft">
          <div className="flex items-center">
            <div className="p-2 bg-moss/20 rounded-lg">
              <span className="text-2xl">👁️</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Page Views (30d)
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {stats.pageViews.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-soft">
          <div className="flex items-center">
            <div className="p-2 bg-amaranth/20 rounded-lg">
              <span className="text-2xl">👥</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                New Clients (30d)
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {stats.newClients}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <div className="bg-white rounded-lg p-6 shadow-soft">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {quickActions.map((action) => (
              <Link
                key={action.title}
                href={action.href}
                className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all duration-200 hover:border-moss"
              >
                <div className="flex items-center mb-2">
                  <span className="text-2xl mr-3">{action.icon}</span>
                  <h3 className="font-medium text-gray-900">{action.title}</h3>
                </div>
                <p className="text-sm text-gray-600">{action.description}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg p-6 shadow-soft">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Recent Activity
          </h2>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="w-2 h-2 bg-moss rounded-full mt-2"></div>
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-900">{activity.message}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200">
            <Link
              href="/admin/analytics"
              className="text-sm text-moss font-medium hover:text-moss/80"
            >
              View all activity →
            </Link>
          </div>
        </div>
      </div>

      {/* Today's Schedule Preview */}
      <div className="bg-white rounded-lg p-6 shadow-soft">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Today's Schedule
        </h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">
                Sarah M. - Individual Therapy
              </p>
              <p className="text-sm text-gray-600">
                Anxiety management session
              </p>
            </div>
            <span className="text-sm font-medium text-moss">10:00 AM</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">
                John D. - Life Coaching
              </p>
              <p className="text-sm text-gray-600">
                Career transition planning
              </p>
            </div>
            <span className="text-sm font-medium text-moss">2:00 PM</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">
                Couples Session - Ram & Sita
              </p>
              <p className="text-sm text-gray-600">Communication workshop</p>
            </div>
            <span className="text-sm font-medium text-moss">4:00 PM</span>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-200">
          <Link
            href="/admin/appointments"
            className="text-sm text-moss font-medium hover:text-moss/80"
          >
            View full calendar →
          </Link>
        </div>
      </div>
    </div>
  );
}
