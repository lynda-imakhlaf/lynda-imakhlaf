const BASE = '/api'

export interface ApiProject {
  id: number
  title: string
  description: string
  category: 'web' | '3d' | 'game' | 'other'
  tags: string[]
  accent_color: string
  year: number
  is_featured: boolean
  order: number
  thumbnail: string | null
  demo_url: string
  github_url: string
}

export interface ApiSkill {
  id: number
  name: string
  category: 'frontend' | 'backend' | 'creative' | 'tools'
  level: number
  color: string
  order: number
}

async function get<T>(path: string): Promise<T[]> {
  const res = await fetch(`${BASE}${path}`)
  if (!res.ok) throw new Error(`API error ${res.status}`)
  const data = await res.json()
  return (data.results ?? data) as T[]
}

export const fetchProjects = () => get<ApiProject>('/projects/?ordering=order')
export const fetchSkills   = () => get<ApiSkill>('/skills/?ordering=category,order')
