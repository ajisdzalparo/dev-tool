'use client'

import { useState } from 'react'
import { Copy, RotateCw } from 'lucide-react'

export default function UUIDGenerator() {
  const [uuids, setUuids] = useState<string[]>([])
  const [copied, setCopied] = useState('')

  const generateUUID = (count: number = 1) => {
    const newUUIDs = Array.from({ length: count }, () => {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = (Math.random() * 16) | 0
        const v = c === 'x' ? r : (r & 0x3) | 0x8
        return v.toString(16)
      })
    })
    setUuids([...newUUIDs, ...uuids])
  }

  const copyToClipboard = async (uuid: string) => {
    await navigator.clipboard.writeText(uuid)
    setCopied(uuid)
    setTimeout(() => setCopied(''), 2000)
  }

  const copyAll = async () => {
    const allUUIDs = uuids.join('\n')
    await navigator.clipboard.writeText(allUUIDs)
    setCopied('all')
    setTimeout(() => setCopied(''), 2000)
  }

  const clearAll = () => {
    setUuids([])
  }

  return (
    <div className="space-y-4">
      {/* Generation Controls */}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
        {[1, 5, 10, 25, 100].map((count) => (
          <button
            key={count}
            onClick={() => generateUUID(count)}
            className="px-3 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-medium text-sm"
          >
            Generate {count}
          </button>
        ))}
      </div>

      {/* Quick Single Generation */}
      <button
        onClick={() => generateUUID(1)}
        className="w-full px-4 py-4 bg-primary/20 border-2 border-primary text-primary rounded-lg hover:bg-primary/30 transition-colors font-medium flex items-center justify-center gap-2"
      >
        <RotateCw size={20} />
        Generate Single UUID
      </button>

      {/* UUIDs Display */}
      {uuids.length > 0 && (
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="block text-sm font-medium">Generated UUIDs ({uuids.length})</label>
            <div className="flex gap-2">
              {uuids.length > 1 && (
                <button
                  onClick={copyAll}
                  className="px-3 py-1 text-xs bg-card border border-border rounded hover:bg-card/80 transition-colors"
                >
                  {copied === 'all' ? 'Copied All!' : 'Copy All'}
                </button>
              )}
              <button
                onClick={clearAll}
                className="px-3 py-1 text-xs bg-destructive/20 text-destructive border border-destructive/50 rounded hover:bg-destructive/30 transition-colors"
              >
                Clear
              </button>
            </div>
          </div>

          <div className="space-y-1 max-h-96 overflow-y-auto">
            {uuids.map((uuid, index) => (
              <div
                key={index}
                className="p-3 bg-card border border-border rounded-lg flex items-center justify-between group hover:border-primary/50 transition-colors"
              >
                <code className="font-mono text-sm flex-1 break-all">{uuid}</code>
                <button
                  onClick={() => copyToClipboard(uuid)}
                  className="ml-2 p-2 opacity-0 group-hover:opacity-100 transition-opacity bg-card/50 hover:bg-card rounded"
                  title="Copy to clipboard"
                >
                  <Copy size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Info Message */}
      {uuids.length === 0 && (
        <div className="p-6 bg-card/50 border border-border rounded-lg text-center text-muted-foreground">
          <p>Click a button above to generate UUIDs</p>
          <p className="text-xs mt-1">All UUIDs are generated locally in your browser</p>
        </div>
      )}
    </div>
  )
}
