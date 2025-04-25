import type { Chat } from '../../../../app/types'

export function isWithinDays(
  date: Date,
  days: number
): boolean {
  const now = new Date()
  const timeAgo = new Date(
    now.getTime() - days * 24 * 60 * 60 * 1000
  )
  return date >= timeAgo
}

export function filterChatsByDateRange(
  chats: Chat[],
  startDays: number,
  endDays?: number
) {
  return chats
    .filter((chat) => {
      const date = new Date(chat.updatedAt)
      if (endDays === undefined) {
        // For older chats (e.g., older than 30 days)
        return !isWithinDays(date, startDays)
      }
      // For date ranges (e.g., between 1-7 days)
      return (
        !isWithinDays(date, startDays) &&
        isWithinDays(date, endDays)
      )
    })
    .sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() -
        new Date(a.updatedAt).getTime()
    )
}
