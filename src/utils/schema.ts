export type Binding = {
  id: string
  action: string
  context?: string
  device: 'keyboard' | 'mouse' | 'gamepad' | string
  keys?: string[]
  button?: string
  modifiers?: string[]
  notes?: string
  createdAt: string
}

export type Profile = {
  id: string
  name: string
  metadata: { author?: string; createdAt: string; platform?: string }
  bindings: Binding[]
}

export function exportProfile(profile: Profile) {
  return JSON.stringify({ schemaVersion: '1.0', profile }, null, 2)
}
