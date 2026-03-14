'use client'

import { useState, useEffect } from 'react'
import { getSiteSettings, updateSiteSettings } from '@/lib/firebase-utils'
import { SiteSettings } from '@/types'

export default function SettingsPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })

  useEffect(() => {
    async function fetchSettings() {
      try {
        const data = await getSiteSettings()
        setSettings(data)
      } catch (error) {
        console.error("Failed to fetch settings:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchSettings()
  }, [])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!settings) return

    setSaving(true)
    setMessage({ type: '', text: '' })
    try {
      await updateSiteSettings(settings)
      setMessage({ type: 'success', text: 'Settings updated successfully!' })
    } catch (error) {
      console.error("Failed to save settings:", error)
      setMessage({ type: 'error', text: 'Failed to update settings.' })
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className="p-6">Loading settings...</div>

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-charcoal font-awesome-serif">Site Settings</h1>
        <p className="text-charcoal/60">Manage global website configuration and the announcement banner</p>
      </div>

      {message.text && (
        <div className={`p-4 rounded-lg ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8">
        {/* Announcement Banner Section */}
        <div className="bg-white p-6 rounded-lg shadow-soft space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-charcoal font-awesome-serif flex items-center">
              <span className="mr-2">📢</span> Announcement Banner
            </h2>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="banner_enabled"
                checked={settings?.announcementBanner.enabled}
                onChange={(e) => setSettings(prev => prev ? {
                  ...prev,
                  announcementBanner: { ...prev.announcementBanner, enabled: e.target.checked }
                } : null)}
                className="h-4 w-4 text-teal focus:ring-teal border-teal/20 rounded"
              />
              <label htmlFor="banner_enabled" className="ml-2 block text-sm text-charcoal">
                Enable Banner
              </label>
            </div>
          </div>

          <p className="text-sm text-gray-500">The banner appears at the very top of every page on the public website.</p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Banner Text
              </label>
              <div className="border border-teal/20 rounded-lg overflow-hidden bg-background">
                <div className="flex items-center space-x-2 p-2 border-b border-teal/10 bg-white/50">
                  <button
                    type="button"
                    onClick={() => {
                      const textarea = document.getElementById('banner-text') as HTMLTextAreaElement;
                      const start = textarea.selectionStart;
                      const end = textarea.selectionEnd;
                      const text = textarea.value;
                      const selected = text.substring(start, end);
                      const before = text.substring(0, start);
                      const after = text.substring(end);
                      const newText = before + '<strong>' + selected + '</strong>' + after;
                      setSettings(prev => prev ? {
                        ...prev,
                        announcementBanner: { ...prev.announcementBanner, text: newText }
                      } : null);
                    }}
                    className="p-1.5 hover:bg-teal/10 rounded text-xs font-bold text-charcoal/60 border border-charcoal/5"
                    title="Bold"
                  >
                    B
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const textarea = document.getElementById('banner-text') as HTMLTextAreaElement;
                      const start = textarea.selectionStart;
                      const end = textarea.selectionEnd;
                      const text = textarea.value;
                      const selected = text.substring(start, end);
                      const before = text.substring(0, start);
                      const after = text.substring(end);
                      const newText = before + '<a href="/book" class="underline font-bold">' + selected + '</a>' + after;
                      setSettings(prev => prev ? {
                        ...prev,
                        announcementBanner: { ...prev.announcementBanner, text: newText }
                      } : null);
                    }}
                    className="p-1.5 hover:bg-teal/10 rounded text-xs font-bold text-charcoal/60 border border-charcoal/5"
                    title="Insert Booking Link"
                  >
                    🔗 Link
                  </button>
                </div>
                <textarea
                  id="banner-text"
                  value={settings?.announcementBanner.text}
                  onChange={(e) => setSettings(prev => prev ? {
                    ...prev,
                    announcementBanner: { ...prev.announcementBanner, text: e.target.value }
                  } : null)}
                  className="w-full px-3 py-2 border-none bg-transparent focus:ring-0 outline-none font-montserrat"
                  rows={4}
                  placeholder="e.g. Special Offer: First session at ₹299! <a href='/book'>Book now</a>"
                />
              </div>
              <div className="mt-2 text-xs text-gray-400 font-montserrat">
                Note: Links will be styled automatically. You can use HTML tags for advanced formatting.
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Background Color (Hex code)
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={settings?.announcementBanner.backgroundColor}
                  onChange={(e) => setSettings(prev => prev ? {
                    ...prev,
                    announcementBanner: { ...prev.announcementBanner, backgroundColor: e.target.value }
                  } : null)}
                  className="w-32 px-3 py-2 border border-teal/20 bg-background rounded-lg focus:outline-none focus:ring-teal focus:border-teal"
                  placeholder="#8DA399"
                />
                <div 
                  className="w-8 h-8 rounded border border-gray-200" 
                  style={{ backgroundColor: settings?.announcementBanner.backgroundColor }}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Text Color (Hex code)
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={settings?.announcementBanner.textColor}
                  onChange={(e) => setSettings(prev => prev ? {
                    ...prev,
                    announcementBanner: { ...prev.announcementBanner, textColor: e.target.value }
                  } : null)}
                  className="w-32 px-3 py-2 border border-teal/20 bg-background rounded-lg focus:outline-none focus:ring-teal focus:border-teal"
                  placeholder="#FFFFFF"
                />
                <div 
                  className="w-8 h-8 rounded border border-gray-200" 
                  style={{ backgroundColor: settings?.announcementBanner.textColor }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className={`px-6 py-2 bg-teal text-white rounded-lg font-medium transition-colors ${
              saving ? 'opacity-50 cursor-not-allowed' : 'hover:bg-emerald'
            }`}
          >
            {saving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </form>
    </div>
  )
}
