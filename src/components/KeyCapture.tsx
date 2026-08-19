import React, { useEffect, useState } from 'react'

export default function KeyCapture({ onCapture }: { onCapture: (keys: string[]) => void }) {
  const [keys, setKeys] = useState<string[]>([])

  useEffect(() => {
    function down(e: KeyboardEvent) {
      e.preventDefault()
      const keyName = normalizeKey(e)
      setKeys((prev) => {
        if (prev.includes(keyName)) return prev
        return [...prev, keyName]
      })
    }
    function up() {
      // do nothing for now
    }
    window.addEventListener('keydown', down)
    window.addEventListener('keyup', up)
    return () => {
      window.removeEventListener('keydown', down)
      window.removeEventListener('keyup', up)
    }
  }, [])

  useEffect(() => {
    if (keys.length) onCapture(keys)
  }, [keys])

  function normalizeKey(e: KeyboardEvent) {
    // Simplified normalization
    if (e.key === ' ') return 'Space'
    return e.key.length === 1 ? e.key.toUpperCase() : capitalize(e.key)
  }

  function capitalize(s: string) {
    return s.charAt(0).toUpperCase() + s.slice(1)
  }

  function clear() {
    setKeys([])
    onCapture([])
  }

  return (
    <div>
      <div style={{ padding: 12, border: '1px solid #ccc', display: 'inline-block' }}>
        Press keys now: <strong>{keys.join(' + ') || '—'}</strong>
      </div>
      <button style={{ marginLeft: 8 }} onClick={clear}>Clear</button>
      <p style={{ marginTop: 8, color: '#666' }}>Focus the page and press the desired key combination.</p>
    </div>
  )
}
