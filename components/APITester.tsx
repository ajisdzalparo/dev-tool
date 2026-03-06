'use client'

import { useState } from 'react'
import { Copy, Send, AlertCircle, CheckCircle, Loader } from 'lucide-react'

export default function APITester() {
  const [url, setUrl] = useState('')
  const [response, setResponse] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const [statusCode, setStatusCode] = useState<number | null>(null)
  const [responseTime, setResponseTime] = useState<number | null>(null)

  const testAPI = async () => {
    if (!url.trim()) {
      setError('Please enter a URL')
      return
    }

    setError('')
    setResponse('')
    setLoading(true)
    setStatusCode(null)
    setResponseTime(null)

    try {
      const startTime = performance.now()

      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      })

      const endTime = performance.now()
      setResponseTime(Math.round(endTime - startTime))
      setStatusCode(res.status)

      const contentType = res.headers.get('content-type')

      if (contentType?.includes('application/json')) {
        const data = await res.json()
        setResponse(JSON.stringify(data, null, 2))
      } else {
        const text = await res.text()
        setResponse(text)
      }
    } catch (err) {
      setError(
        err instanceof Error 
          ? err.message 
          : 'Failed to fetch. Check URL and CORS settings.'
      )
      setResponse('')
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(response)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      testAPI()
    }
  }

  return (
    <div className="space-y-4">
      {/* URL Input */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">API Endpoint</label>
        <div className="flex gap-2">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="https://api.example.com/data"
            className="flex-1 px-3 py-3 bg-card border border-border rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            onClick={testAPI}
            disabled={loading || !url}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed font-medium flex items-center gap-2 whitespace-nowrap"
          >
            {loading ? (
              <>
                <Loader size={16} className="animate-spin" />
                Testing...
              </>
            ) : (
              <>
                <Send size={16} />
                Test
              </>
            )}
          </button>
        </div>
        <p className="text-xs text-muted-foreground">
          Tip: Press Ctrl+Enter (or Cmd+Enter on Mac) to send
        </p>
      </div>

      {/* Status & Timing Info */}
      {statusCode && (
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <div className="p-3 bg-card border border-border rounded-lg">
            <div className="text-xs text-muted-foreground">Status Code</div>
            <div className={`text-lg font-bold ${statusCode >= 200 && statusCode < 300 ? 'text-green-500' : statusCode >= 400 ? 'text-red-500' : 'text-yellow-500'}`}>
              {statusCode}
            </div>
          </div>
          {responseTime && (
            <div className="p-3 bg-card border border-border rounded-lg">
              <div className="text-xs text-muted-foreground">Response Time</div>
              <div className="text-lg font-bold">{responseTime}ms</div>
            </div>
          )}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="p-3 bg-destructive/20 border border-destructive/50 rounded-lg flex gap-2 items-start">
          <AlertCircle size={16} className="flex-shrink-0 mt-0.5 text-destructive" />
          <div className="text-sm text-foreground">{error}</div>
        </div>
      )}

      {/* Success Message */}
      {response && statusCode && (
        <div className="p-3 bg-green-500/20 border border-green-500/50 rounded-lg flex gap-2 items-start">
          <CheckCircle size={16} className="flex-shrink-0 mt-0.5 text-green-500" />
          <div className="text-sm text-foreground">Request successful</div>
        </div>
      )}

      {/* Response Display */}
      {response && (
        <div className="space-y-2">
          <label className="block text-sm font-medium">Response</label>
          <textarea
            value={response}
            readOnly
            className="w-full h-96 p-3 bg-card border border-border rounded-lg font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            onClick={copyToClipboard}
            className="w-full px-3 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2 font-medium"
          >
            <Copy size={16} />
            {copied ? 'Copied!' : 'Copy Response'}
          </button>
        </div>
      )}

      {/* Empty State */}
      {!response && !error && (
        <div className="p-8 bg-card/50 border border-border rounded-lg text-center text-muted-foreground">
          <p className="text-lg font-medium mb-2">Enter an API URL and click Test</p>
          <p className="text-sm">Supports JSON responses and CORS-enabled APIs</p>
          <p className="text-xs mt-2">Note: CORS restrictions may apply for some APIs</p>
        </div>
      )}

      {/* Tips */}
      <div className="p-3 bg-card/30 border border-border rounded-lg text-sm text-muted-foreground space-y-1">
        <p className="font-medium text-foreground">Tips:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Only GET requests are supported</li>
          <li>The API must allow CORS requests</li>
          <li>JSON responses are automatically formatted</li>
        </ul>
      </div>
    </div>
  )
}
