export async function getAllChats() {
  return await prisma.chat.findMany({
    orderBy: { updatedAt: 'desc' },
    include: {
      project: true,
      messages: {
        orderBy: { createdAt: 'asc' },
        take: 1,
      },
    },
  })
}

export async function getAllChatsByUser(
  userId: string = '1'
): Promise<ChatWithMessages[]> {
  return await prisma.chat.findMany({
    where: { userId },
    orderBy: { updatedAt: 'desc' },
    include: {
      project: true,
      messages: {
        orderBy: { createdAt: 'asc' },
        take: 1,
      },
    },
  })
}

export async function getChatById(
  id: string
): Promise<ChatWithMessages | null> {
  return await prisma.chat.findFirst({
    where: { id },
    include: {
      project: true,
      messages: {
        orderBy: { createdAt: 'asc' },
        take: 1,
      },
    },
  })
}

export async function createMessageForChat({
  chatId,
  content,
  role,
}: {
  chatId: string
  content: string
  role: MessageRole
}) {
  return await prisma.message.create({
    data: {
      content,
      role,
      chatId,
    },
  })
}

export async function getMessagesByChatId(
  chatId: string
): Promise<Message[]> {
  return await prisma.message.findMany({
    where: { chatId },
    orderBy: { createdAt: 'asc' },
  })
}

export async function createChat(data: {
  title?: string
  userId?: string
  projectId?: string
}) {
  return await prisma.chat.create({
    data: {
      ...data,
      userId: data.userId || '1',
    },
    include: {
      project: true,
      messages: true,
    },
  })
}

export async function updateChat(
  id: string,
  data: { title?: string; projectId?: string }
) {
  return await prisma.chat.update({
    where: {
      id,
    },
    data,
    include: {
      project: true,
      messages: {
        orderBy: { createdAt: 'asc' },
      },
    },
  })
}

export async function deleteChat(id: string) {
  return await prisma.chat.deleteMany({
    where: { id },
  })
}
