import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getAllAppointments, getAllBlogPosts, getAllTestimonials } from "@/lib/firebase-utils";
import { useAuth } from "@/contexts/AuthContext";
import { Appointment } from "@/types";

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
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    totalAppointments: 0,
    appointmentsToday: 0,
    totalTestimonials: 0,
    totalBlogPosts: 0,
    pageViews: 0,
    newClients: 0,
  });
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [todayAppointments, setTodayAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [appointments, posts, testimonials] = await Promise.all([
          getAllAppointments(),
          getAllBlogPosts(),
          getAllTestimonials()
        ]);

        const today = new Date().toISOString().split('T')[0];
        const appointmentsTodayList = appointments.filter(a => a.date === today);
        
        setTodayAppointments(appointmentsTodayList);

        setStats({
          totalAppointments: appointments.length,
          appointmentsToday: appointmentsTodayList.length,
          totalTestimonials: testimonials.length,
          totalBlogPosts: posts.length,
          pageViews: 2847,
          newClients: 23,
        });

        // Construct unified activity feed
        const activity: any[] = [];
        
        // Latest 3 appointments
        appointments.slice(0, 3).forEach(app => {
          activity.push({
            type: "appointment",
            message: `New appointment booked by ${app.clientName}`,
            time: new Date(app.createdAt).toLocaleDateString(),
            timestamp: new Date(app.createdAt).getTime()
          });
        });

        // Latest 2 testimonials
        testimonials.filter(t => t.status === 'pending').slice(0, 2).forEach(test => {
          activity.push({
            type: "testimonial",
            message: `New testimonial pending approval from ${test.name}`,
            time: new Date(test.createdAt).toLocaleDateString(),
            timestamp: new Date(test.createdAt).getTime()
          });
        });

        // Sort by timestamp
        setRecentActivity(activity.sort((a, b) => b.timestamp - a.timestamp).slice(0, 5));

      } catch (error) {
        console.error("Failed to fetch dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

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


  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-teal to-emerald rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2 font-awesome-serif">Welcome back, {user?.displayName?.split(' ')[0] || "Mohana"}! 👋</h1>
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
              <p className="text-2xl font-bold text-charcoal">
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
              <p className="text-2xl font-bold text-charcoal">
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
              <p className="text-2xl font-bold text-charcoal">
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
              <p className="text-2xl font-bold text-charcoal">
                {stats.totalBlogPosts}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-soft">
          <div className="flex items-center">
            <div className="p-2 bg-teal/20 rounded-lg">
              <span className="text-2xl">👁️</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Page Views (30d)
              </p>
              <p className="text-2xl font-bold text-charcoal">
                {stats.pageViews.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-soft">
          <div className="flex items-center">
            <div className="p-2 bg-terracotta/20 rounded-lg">
              <span className="text-2xl">👥</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                New Clients (30d)
              </p>
              <p className="text-2xl font-bold text-charcoal">
                {stats.newClients}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <div className="bg-white rounded-lg p-6 shadow-soft">
          <h2 className="text-lg font-semibold text-charcoal mb-4 font-awesome-serif">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {quickActions.map((action) => (
              <Link
                key={action.title}
                href={action.href}
                className="p-4 border border-teal/10 rounded-lg hover:shadow-md transition-all duration-200 hover:border-teal"
              >
                <div className="flex items-center mb-2">
                  <span className="text-2xl mr-3">{action.icon}</span>
                  <h3 className="font-medium text-charcoal">{action.title}</h3>
                </div>
                <p className="text-sm text-gray-600">{action.description}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg p-6 shadow-soft">
          <h2 className="text-lg font-semibold text-charcoal mb-4 font-awesome-serif">
            Recent Activity
          </h2>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="w-2 h-2 bg-teal rounded-full mt-2"></div>
                </div>
                <div className="ml-4">
                  <p className="text-sm text-charcoal">{activity.message}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200">
            <Link
              href="/admin/analytics"
              className="text-sm text-teal font-medium hover:text-emerald"
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
          {todayAppointments.length > 0 ? todayAppointments.map((app) => (
            <div key={app.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">
                  {app.clientName} - {app.service}
                </p>
                <p className="text-sm text-gray-600">
                  {app.notes || "No additional notes"}
                </p>
              </div>
              <span className="text-sm font-medium text-teal">{app.time}</span>
            </div>
          )) : (
            <div className="text-center py-6 text-gray-500 italic">
              No appointments scheduled for today.
            </div>
          )}
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
