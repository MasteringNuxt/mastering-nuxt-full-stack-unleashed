import {
  getAllChats,
  createChat,
} from '#layers/chat/server/repository/chatRepository'

async function getRedirectUrl(): Promise<string> {
  try {
    const chats = await getAllChats()

    if (chats.length > 0) {
      const mostRecentChat = chats[0]!
      return mostRecentChat.project
        ? `/projects/${mostRecentChat.project.id}/chats/${mostRecentChat.id}`
        : `/chats/${mostRecentChat.id}`
    }

    // No chats found, create a new empty chat
    const newChat = await createChat({
      title: 'New Chat',
    })
    return `/chats/${newChat.id}`
  } catch (error) {
    console.error('Error getting/creating chat:', error)
    // Fallback to home if something goes wrong
    return '/'
  }
}

export default defineOAuthGitHubEventHandler({
  config: {
    emailRequired: true,
  },
  onError(event, error) {
    console.error('GitHub OAuth error:', error)
    return sendRedirect(event, '/')
  },
})
