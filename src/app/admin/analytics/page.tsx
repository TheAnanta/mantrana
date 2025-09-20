'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface AnalyticsData {
  pageViews: {
    total: number
    thisMonth: number
    lastMonth: number
    change: number
  }
  visitors: {
    total: number
    thisMonth: number
    lastMonth: number
    change: number
  }
  topPages: Array<{
    page: string
    views: number
    percentage: number
  }>
  topSources: Array<{
    source: string
    visitors: number
    percentage: number
  }>
  conversions: {
    appointments: number
    contactForms: number
    newsletterSignups: number
  }
  monthlyData: Array<{
    month: string
    views: number
    visitors: number
  }>
}

export default function AnalyticsPage() {
  const router = useRouter()
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d')

  useEffect(() => {
    // Auth check
    const isAuthenticated = localStorage.getItem('admin_authenticated')
    if (!isAuthenticated) {
      router.push('/admin/login')
      return
    }

    // Simulate loading analytics data
    setTimeout(() => {
      setData({
        pageViews: {
          total: 12847,
          thisMonth: 2847,
          lastMonth: 2156,
          change: 32.1
        },
        visitors: {
          total: 8234,
          thisMonth: 1743,
          lastMonth: 1412,
          change: 23.4
        },
        topPages: [
          { page: 'Home', views: 4256, percentage: 33.1 },
          { page: 'Services', views: 2847, percentage: 22.2 },
          { page: 'About', views: 1925, percentage: 15.0 },
          { page: 'Blog', views: 1456, percentage: 11.3 },
          { page: 'Testimonials', views: 892, percentage: 6.9 },
          { page: 'Contact', views: 756, percentage: 5.9 },
        ],
        topSources: [
          { source: 'Google', visitors: 3456, percentage: 45.2 },
          { source: 'Direct', visitors: 2134, percentage: 27.9 },
          { source: 'Social Media', visitors: 987, percentage: 12.9 },
          { source: 'Referrals', visitors: 654, percentage: 8.6 },
          { source: 'Email', visitors: 423, percentage: 5.5 },
        ],
        conversions: {
          appointments: 23,
          contactForms: 45,
          newsletterSignups: 89
        },
        monthlyData: [
          { month: 'Jul', views: 1890, visitors: 1234 },
          { month: 'Aug', views: 2156, visitors: 1412 },
          { month: 'Sep', views: 2234, visitors: 1456 },
          { month: 'Oct', views: 2456, visitors: 1598 },
          { month: 'Nov', views: 2847, visitors: 1743 },
          { month: 'Dec', views: 2234, visitors: 1456 }, // Partial month
        ]
      })
    }, 500)
  }, [router, timeRange])

  if (!data) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-b-2 border-moss mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading analytics...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-600">Track your website performance and user engagement</p>
        </div>
        <div className="flex space-x-2">
          {(['7d', '30d', '90d'] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                timeRange === range
                  ? 'bg-moss text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {range === '7d' ? 'Last 7 days' : range === '30d' ? 'Last 30 days' : 'Last 90 days'}
            </button>
          ))}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-soft">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Page Views</p>
              <p className="text-2xl font-bold text-gray-900">{data.pageViews.thisMonth.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <span className="text-2xl">👁️</span>
            </div>
          </div>
          <div className="mt-2 flex items-center">
            <span className={`text-sm font-medium ${data.pageViews.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {data.pageViews.change > 0 ? '+' : ''}{data.pageViews.change}%
            </span>
            <span className="text-sm text-gray-500 ml-1">vs last month</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-soft">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Visitors</p>
              <p className="text-2xl font-bold text-gray-900">{data.visitors.thisMonth.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <span className="text-2xl">👥</span>
            </div>
          </div>
          <div className="mt-2 flex items-center">
            <span className={`text-sm font-medium ${data.visitors.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {data.visitors.change > 0 ? '+' : ''}{data.visitors.change}%
            </span>
            <span className="text-sm text-gray-500 ml-1">vs last month</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-soft">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Appointments</p>
              <p className="text-2xl font-bold text-gray-900">{data.conversions.appointments}</p>
            </div>
            <div className="p-3 bg-moss/20 rounded-full">
              <span className="text-2xl">📅</span>
            </div>
          </div>
          <div className="mt-2">
            <span className="text-sm text-gray-500">This month</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-soft">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Contact Forms</p>
              <p className="text-2xl font-bold text-gray-900">{data.conversions.contactForms}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <span className="text-2xl">📧</span>
            </div>
          </div>
          <div className="mt-2">
            <span className="text-sm text-gray-500">This month</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Pages */}
        <div className="bg-white p-6 rounded-lg shadow-soft">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Top Pages</h3>
          <div className="space-y-4">
            {data.topPages.map((page, index) => (
              <div key={page.page} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-gray-500">#{index + 1}</span>
                  <span className="text-sm font-medium text-gray-900">{page.page}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-moss h-2 rounded-full" 
                      style={{ width: `${page.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 w-16 text-right">
                    {page.views.toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Traffic Sources */}
        <div className="bg-white p-6 rounded-lg shadow-soft">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Traffic Sources</h3>
          <div className="space-y-4">
            {data.topSources.map((source, index) => (
              <div key={source.source} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-gray-500">#{index + 1}</span>
                  <span className="text-sm font-medium text-gray-900">{source.source}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-amaranth h-2 rounded-full" 
                      style={{ width: `${source.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 w-16 text-right">
                    {source.visitors.toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Monthly Trend Chart (Simple Bar Chart) */}
      <div className="bg-white p-6 rounded-lg shadow-soft">
        <h3 className="text-lg font-medium text-gray-900 mb-6">Monthly Trends</h3>
        <div className="flex items-end justify-between h-48 space-x-2">
          {data.monthlyData.map((month, index) => {
            const maxViews = Math.max(...data.monthlyData.map(m => m.views))
            const height = (month.views / maxViews) * 100
            
            return (
              <div key={month.month} className="flex-1 flex flex-col items-center">
                <div className="flex-1 flex flex-col justify-end">
                  <div 
                    className="bg-moss rounded-t w-full min-h-[4px] relative group cursor-pointer"
                    style={{ height: `${height}%` }}
                  >
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {month.views.toLocaleString()} views
                    </div>
                  </div>
                </div>
                <div className="mt-2 text-xs text-gray-600 font-medium">
                  {month.month}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Additional Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-soft">
          <h4 className="font-medium text-gray-900 mb-2">Bounce Rate</h4>
          <div className="text-2xl font-bold text-gray-900">42.3%</div>
          <div className="text-sm text-green-600">↓ 5.2% vs last month</div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-soft">
          <h4 className="font-medium text-gray-900 mb-2">Avg. Session Duration</h4>
          <div className="text-2xl font-bold text-gray-900">3m 42s</div>
          <div className="text-sm text-green-600">↑ 18s vs last month</div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-soft">
          <h4 className="font-medium text-gray-900 mb-2">Newsletter Signups</h4>
          <div className="text-2xl font-bold text-gray-900">{data.conversions.newsletterSignups}</div>
          <div className="text-sm text-green-600">↑ 12% vs last month</div>
        </div>
      </div>
    </div>
  )
}