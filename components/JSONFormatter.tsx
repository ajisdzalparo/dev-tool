'use client'

import { useState } from 'react'
import { Copy, AlertCircle } from 'lucide-react'

export default function JSONFormatter() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const formatJSON = () => {
    setError('')
    try {
      const parsed = JSON.parse(input)
      const formatted = JSON.stringify(parsed, null, 2)
      setOutput(formatted)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid JSON')
      setOutput('')
    }
  }

  const minifyJSON = () => {
    setError('')
    try {
      const parsed = JSON.parse(input)
      const minified = JSON.stringify(parsed)
      setOutput(minified)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid JSON')
      setOutput('')
    }
  }

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handlePaste = async () => {
    const text = await navigator.clipboard.readText()
    setInput(text)
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Input */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">Input JSON</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.value)}
            placeholder="Paste your JSON here..."
            className="w-full h-80 p-3 bg-card border border-border rounded-lg font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <div className="flex gap-2">
            <button
              onClick={handlePaste}
              className="px-3 py-2 bg-card border border-border rounded-lg hover:bg-card/80 transition-colors text-sm font-medium"
            >
              Paste
            </button>
            <button
              onClick={() => setInput('')}
              className="px-3 py-2 bg-card border border-border rounded-lg hover:bg-card/80 transition-colors text-sm font-medium"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Output */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">Formatted JSON</label>
          <textarea
            value={output}
            readOnly
            placeholder="Formatted output will appear here..."
            className="w-full h-80 p-3 bg-card border border-border rounded-lg font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            onClick={copyToClipboard}
            disabled={!output}
            className="w-full px-3 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-medium"
          >
            <Copy size={16} />
            {copied ? 'Copied!' : 'Copy Output'}
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-3 bg-destructive/20 border border-destructive/50 rounded-lg flex gap-2 items-start">
          <AlertCircle size={16} className="flex-shrink-0 mt-0.5 text-destructive" />
          <div className="text-sm text-foreground">{error}</div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-2">
        <button
          onClick={formatJSON}
          disabled={!input}
          className="flex-1 px-4 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed font-medium"
        >
          Format
        </button>
        <button
          onClick={minifyJSON}
          disabled={!input}
          className="flex-1 px-4 py-3 bg-secondary text-secondary-foreground rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed font-medium"
        >
          Minify
        </button>
      </div>
    </div>
  )
}
