import React, { useState } from 'react'
import KeyCapture from './components/KeyCapture'
import BindList from './components/BindList'
import { Binding, Profile } from './utils/schema'

const sampleProfile: Profile = {
  id: 'default',
  name: 'Default',
  metadata: { author: '', createdAt: new Date().toISOString(), platform: 'cross' },
  bindings: [
    {
      id: 'b1',
      action: 'Jump',
      context: 'gameplay',
      device: 'keyboard',
      keys: ['Space'],
      modifiers: [],
      notes: 'Default jump',
      createdAt: new Date().toISOString()
    }
  ]
}

export default function App() {
  const [profile, setProfile] = useState<Profile>(sampleProfile)
  const [captured, setCaptured] = useState<string | null>(null)

  function onCaptured(keys: string[]) {
    setCaptured(keys.join(' + '))
  }

  function addBinding() {
    if (!captured) return
    const id = 'b' + (profile.bindings.length + 1)
    const b: Binding = {
      id,
      action: 'NewAction',
      context: 'gameplay',
      device: 'keyboard',
      keys: captured.split(' + '),
      modifiers: [],
      notes: '',
      createdAt: new Date().toISOString()
    }
    setProfile({ ...profile, bindings: [...profile.bindings, b] })
    setCaptured(null)
  }

  function updateBindings(bindings: Binding[]) {
    setProfile({ ...profile, bindings })
  }

  return (
    <div style={{ padding: 20, fontFamily: 'Arial, sans-serif', maxWidth: 900 }}>
      <h1>WeTi — Keybind Designer</h1>
      <p>Create and export keybinds for your game projects.</p>

      <section style={{ marginTop: 20 }}>
        <h2>Key Capture</h2>
        <KeyCapture onCapture={(keys) => onCaptured(keys)} />
        <div style={{ marginTop: 8 }}>
          Captured: <strong>{captured ?? '—'}</strong>
          <button style={{ marginLeft: 12 }} onClick={addBinding} disabled={!captured}>Add as binding</button>
        </div>
      </section>

      <section style={{ marginTop: 24 }}>
        <h2>Bindings</h2>
        <BindList profile={profile} onChange={updateBindings} />
      </section>

    </div>
  )
}
