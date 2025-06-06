import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Mock data for seeding - based on the existing mock data structure
const MOCK_MESSAGES = [
  {
    content:
      'Hello, can you help me with my Nuxt.js project?',
    role: 'user' as const,
  },
  {
    content:
      "Of course! I'd be happy to help with your Nuxt.js project. What specific questions or issues do you have?",
    role: 'assistant' as const,
  },
  {
    content: 'How do I implement server-side rendering?',
    role: 'user' as const,
  },
  {
    content:
      "Nuxt.js provides server-side rendering out of the box! You don't need to do any special configuration for basic SSR. If you need specific optimizations, we can discuss those in detail.",
    role: 'assistant' as const,
  },
]

async function main() {
  console.log('🌱 Starting seed...')

  // Create a mock user first
  const user = await prisma.user.create({
    data: {
      id: '1',
      email: 'demo@example.com',
      name: 'Demo User',
      provider: 'demo',
      providerId: 'demo-user-001',
    },
  })
  console.log('✅ Created user:', user.email)

  // Create a project
  const project = await prisma.project.create({
    data: {
      name: 'Nuxt Project',
      userId: user.id,
    },
  })
  console.log('✅ Created project:', project.name)

  // Create a chat
  const chat = await prisma.chat.create({
    data: {
      title: 'Nuxt.js project help',
      userId: user.id,
      projectId: project.id,
    },
  })
  console.log('✅ Created chat:', chat.title)

  // Create messages for the chat
  for (const [
    index,
    messageData,
  ] of MOCK_MESSAGES.entries()) {
    const message = await prisma.message.create({
      data: {
        content: messageData.content,
        role: messageData.role,
        chatId: chat.id,
      },
    })
    console.log(
      `✅ Created message ${index + 1}:`,
      message.role
    )
  }

  // Create an additional chat without a project to demonstrate variety
  const standaloneChat = await prisma.chat.create({
    data: {
      title: 'General Discussion',
      userId: user.id,
    },
  })

  await prisma.message.create({
    data: {
      content:
        'Hi there! This is a chat without a specific project.',
      role: 'user',
      chatId: standaloneChat.id,
    },
  })

  await prisma.message.create({
    data: {
      content: 'Hello! How can I help you today?',
      role: 'assistant',
      chatId: standaloneChat.id,
    },
  })

  console.log('✅ Created standalone chat with messages')

  console.log('🎉 Seed completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
