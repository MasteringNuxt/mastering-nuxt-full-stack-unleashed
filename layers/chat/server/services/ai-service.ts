import { generateText } from 'ai'
import { createOpenAI } from '@ai-sdk/openai'
import { createOllama } from 'ollama-ai-provider'
import type { Message, LanguageModelV1 } from 'ai'

export const createOllamaModel = () => {
  const ollama = createOllama()
  return ollama('llama3.2')
}

export const createOpenAIModel = (apiKey: string) => {
  const openai = createOpenAI({
    apiKey,
  })
  return openai('gpt-4o-mini')
}

export async function generateChatResponse(
  model: LanguageModelV1,
  messages: Message[]
) {
  if (!Array.isArray(messages) || messages.length === 0) {
    throw new Error('Invalid messages format')
  }

  const response = await generateText({
    model,
    messages,
  })

  return response.text.trim()
}

export async function generateChatTitle(
  model: LanguageModelV1,
  firstMessage: string
): Promise<string> {
  const response = await generateText({
    model,
    messages: [
      {
        role: 'system',
        content:
          'Summarize the message in 3 or less short words.',
      },
      {
        role: 'user',
        content: firstMessage,
      },
    ],
  })
  return response.text.trim()
}
