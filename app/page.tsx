'use client'

import { useState } from 'react'
import JSONFormatter from '@/components/JSONFormatter'
import UUIDGenerator from '@/components/UUIDGenerator'
import Base64Tool from '@/components/Base64Tool'
import APITester from '@/components/APITester'

export default function Home() {
  const [activeTab, setActiveTab] = useState('json')

  const tools = [
    { id: 'json', label: 'JSON Formatter', icon: '{}' },
    { id: 'uuid', label: 'UUID Generator', icon: '🔑' },
    { id: 'base64', label: 'Base64', icon: '🔐' },
    { id: 'api', label: 'API Tester', icon: '🌐' },
  ]

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="text-2xl font-bold text-primary">⚙️</div>
            <div>
              <h1 className="text-2xl font-bold">Developer Toolbox</h1>
              <p className="text-sm text-muted-foreground">Essential tools for rapid development</p>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="border-b border-border bg-card/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto">
            {tools.map((tool) => (
              <button
                key={tool.id}
                onClick={() => setActiveTab(tool.id)}
                className={`px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap border-b-2 ${
                  activeTab === tool.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                <span className="mr-2">{tool.icon}</span>
                {tool.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'json' && <JSONFormatter />}
        {activeTab === 'uuid' && <UUIDGenerator />}
        {activeTab === 'base64' && <Base64Tool />}
        {activeTab === 'api' && <APITester />}
      </div>

      {/* Footer */}
      <footer className="border-t border-border bg-card/30 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          <p>Developer Toolbox • Built with Next.js • Lightweight & Fast</p>
        </div>
      </footer>
    </main>
  )
}
