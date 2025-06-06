import type {
  Message as PrismaMessage,
  Chat as PrismaChat,
  Project as PrismaProject,
  MessageRole as PrismaMessageRole,
  Prisma,
} from '@prisma/client'

export type Message = PrismaMessage
export type Chat = PrismaChat
export type Project = PrismaProject
export type MessageRole = PrismaMessageRole

export type ChatWithMessages = Prisma.ChatGetPayload<{
  include: {
    messages: true
    project: true
  }
}>

export type MessagesWithChat = Prisma.MessageGetPayload<{
  include: {
    chat: true
  }
}>

export type ProjectWithChats = Prisma.ProjectGetPayload<{
  include: {
    chats: {
      include: {
        messages: true
      }
    }
  }
}>
