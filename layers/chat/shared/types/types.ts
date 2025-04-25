export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  createdAt: Date
  updatedAt: Date
}

export interface Chat {
  id: string
  title: string
  messages: ChatMessage[]
  projectId?: string
  createdAt: Date
  updatedAt: Date
}

export interface Project {
  id: string
  name: string
  createdAt: Date
  updatedAt: Date
}

export interface ChatWithProject extends Chat {
  project: Project | null
}
