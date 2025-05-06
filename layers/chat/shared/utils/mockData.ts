import { v4 as uuidv4 } from 'uuid'

// Mock data for initial messages
export const MOCK_MESSAGES: ChatMessage[] = [
  {
    id: uuidv4(),
    content:
      'Hello, can you help me with my Nuxt.js project?',
    role: 'user',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: uuidv4(),
    content:
      "Of course! I'd be happy to help with your Nuxt.js project. What specific questions or issues do you have?",
    role: 'assistant',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: uuidv4(),
    content: 'How do I implement server-side rendering?',
    role: 'user',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: uuidv4(),
    content:
      "Nuxt.js provides server-side rendering out of the box! You don't need to do any special configuration for basic SSR. If you need specific optimizations, we can discuss those in detail.",
    role: 'assistant',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

export const MOCK_PROJECT: Project = {
  id: uuidv4(),
  name: 'Nuxt Project',
  createdAt: new Date(),
  updatedAt: new Date(),
}

export const MOCK_CHAT: Chat = {
  id: uuidv4(),
  title: 'Nuxt.js project help',
  // projectId: MOCK_PROJECT.id,
  messages: MOCK_MESSAGES,
  createdAt: new Date(),
  updatedAt: new Date(),
}
