export async function seedDemoDataForUser(userId: string) {
  // Check if user already has data to avoid duplicating
  const existingChats = await prisma.chat.findMany({
    where: { userId },
  })

  if (existingChats.length > 0) {
    console.log(
      `User ${userId} already has ${existingChats.length} chats, skipping seed`
    )
    return
  }

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

  console.log(`🌱 Seeding demo data for user ${userId}`)

  // Create a project
  const project = await prisma.project.create({
    data: {
      name: 'Nuxt Project',
      userId,
    },
  })
  console.log('✅ Created project:', project.name)

  // Create a chat
  const chat = await prisma.chat.create({
    data: {
      title: 'Nuxt.js project help',
      userId,
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

  // Create an additional chat without a project
  const standaloneChat = await prisma.chat.create({
    data: {
      title: 'General Discussion',
      userId,
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
  console.log('🎉 Demo data seeded successfully!')
}
