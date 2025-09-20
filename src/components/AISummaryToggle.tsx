'use client'

import { useState } from 'react'

interface AISummaryToggleProps {
  aiSummary: string
}

export default function AISummaryToggle({ aiSummary }: AISummaryToggleProps) {
  const [showAISummary, setShowAISummary] = useState(false)

  return (
    <div className="mb-8">
      <button
        onClick={() => setShowAISummary(!showAISummary)}
        className="flex items-center gap-3 px-6 py-3 bg-azure/20 hover:bg-azure/30 rounded-full transition-all duration-300 border border-azure/50"
      >
        <svg className="w-5 h-5 text-moss" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
        <span className="font-medium text-gray-700">
          {showAISummary ? 'Hide' : 'Read'} AI-generated summary
        </span>
        <svg className={`w-4 h-4 text-gray-500 transition-transform ${showAISummary ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {showAISummary && (
        <div className="mt-4 p-6 bg-azure/10 rounded-2xl border-l-4 border-moss">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-moss/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <svg className="w-4 h-4 text-moss" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">AI Summary</h3>
              <p className="text-gray-700 leading-relaxed">{aiSummary}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}