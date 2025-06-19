export const getAuthenticatedUserId = async (
  event: H3Event
): Promise<string> => {
  const session = await requireUserSession(event)

  if (!session.databaseUserId) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    })
  }

  return session.databaseUserId as string
}
