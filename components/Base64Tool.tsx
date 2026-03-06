'use client'

import { useState } from 'react'
import { Copy, AlertCircle, ArrowRightLeft } from 'lucide-react'

export default function Base64Tool() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  const [mode, setMode] = useState<'encode' | 'decode'>('encode')

  const encode = () => {
    setError('')
    try {
      const encoded = btoa(unescape(encodeURIComponent(input)))
      setOutput(encoded)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Encoding failed')
      setOutput('')
    }
  }

  const decode = () => {
    setError('')
    try {
      const decoded = decodeURIComponent(escape(atob(input)))
      setOutput(decoded)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid Base64 string')
      setOutput('')
    }
  }

  const handleTransform = () => {
    if (mode === 'encode') {
      encode()
    } else {
      decode()
    }
  }

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const toggleMode = () => {
    setMode(mode === 'encode' ? 'decode' : 'encode')
    setInput(output)
    setOutput('')
    setError('')
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
          <label className="block text-sm font-medium">
            {mode === 'encode' ? 'Text to Encode' : 'Base64 to Decode'}
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Enter Base64 to decode...'}
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
          <label className="block text-sm font-medium">
            {mode === 'encode' ? 'Base64 Encoded' : 'Decoded Text'}
          </label>
          <textarea
            value={output}
            readOnly
            placeholder="Output will appear here..."
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
          onClick={handleTransform}
          disabled={!input}
          className="flex-1 px-4 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed font-medium"
        >
          {mode === 'encode' ? 'Encode' : 'Decode'}
        </button>
        <button
          onClick={toggleMode}
          className="px-4 py-3 bg-secondary text-secondary-foreground rounded-lg hover:opacity-90 transition-opacity font-medium flex items-center gap-2"
        >
          <ArrowRightLeft size={16} />
          <span className="hidden sm:inline">Switch</span>
        </button>
      </div>

      {/* Mode Indicator */}
      <div className="p-3 bg-card/50 border border-border rounded-lg text-center text-sm text-muted-foreground">
        Current mode: <span className="font-semibold text-foreground">{mode === 'encode' ? 'Encoding (Text → Base64)' : 'Decoding (Base64 → Text)'}</span>
      </div>
    </div>
  )
}
