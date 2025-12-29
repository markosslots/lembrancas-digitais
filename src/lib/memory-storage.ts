// Sistema de armazenamento de lembranças
// Por enquanto usa localStorage, depois pode integrar com Supabase

export interface Memory {
  id: string
  title: string
  message: string
  photos: string[]
  musicUrl?: string
  customSlug?: string
  createdAt: string
}

export function generateMemoryId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export async function saveMemory(id: string, data: Omit<Memory, 'id' | 'createdAt'>): Promise<void> {
  const memory: Memory = {
    id,
    ...data,
    createdAt: new Date().toISOString(),
  }
  
  // Salva no localStorage (temporário)
  if (typeof window !== 'undefined') {
    const memories = getMemories()
    memories[id] = memory
    localStorage.setItem('memorylove_memories', JSON.stringify(memories))
  }
}

export function getMemory(id: string): Memory | null {
  if (typeof window !== 'undefined') {
    const memories = getMemories()
    return memories[id] || null
  }
  return null
}

export function getMemories(): Record<string, Memory> {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('memorylove_memories')
    return stored ? JSON.parse(stored) : {}
  }
  return {}
}

export function deleteMemory(id: string): void {
  if (typeof window !== 'undefined') {
    const memories = getMemories()
    delete memories[id]
    localStorage.setItem('memorylove_memories', JSON.stringify(memories))
  }
}
