import React from 'react'
import { Profile, Binding, exportProfile } from '../utils/schema'

export default function BindList({ profile, onChange }: { profile: Profile; onChange: (b: Binding[]) => void }) {
  function remove(id: string) {
    onChange(profile.bindings.filter((x) => x.id !== id))
  }

  function exportJSON() {
    const blob = new Blob([exportProfile(profile)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${profile.id || 'profile'}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd' }}>Action</th>
            <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd' }}>Binding</th>
            <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd' }}>Device</th>
            <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd' }}>Notes</th>
            <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd' }}>—</th>
          </tr>
        </thead>
        <tbody>
          {profile.bindings.map((b) => (
            <tr key={b.id}>
              <td style={{ padding: '6px 0' }}>{b.action}</td>
              <td style={{ padding: '6px 0' }}>{(b.keys || []).join(' + ') || b.button}</td>
              <td style={{ padding: '6px 0' }}>{b.device}</td>
              <td style={{ padding: '6px 0' }}>{b.notes}</td>
              <td style={{ padding: '6px 0' }}><button onClick={() => remove(b.id)}>Remove</button></td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: 12 }}>
        <button onClick={exportJSON}>Export JSON</button>
      </div>
    </div>
  )
}
