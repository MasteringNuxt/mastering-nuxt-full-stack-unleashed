export const useAuth = () => {
  const { loggedIn, user, session, fetch, clear } =
    useUserSession()

  const logout = async () => {
    await clear()
    await navigateTo('/login')
  }

  const isAuthenticated = computed(
    () =>
      loggedIn.value &&
      session.value?.databaseUserId !== undefined
  )

  const userName = computed(
    () =>
      (user.value as GitHubUser)?.name ??
      (user.value as GitHubUser)?.email ??
      'User'
  )

  const userAvatar = computed(
    () => (user.value as GitHubUser)?.avatar ?? null
  )

  const userEmail = computed(
    () => (user.value as GitHubUser)?.email ?? null
  )

  return {
    isAuthenticated,
    user: readonly(user),
    session: readonly(session),

    refresh: fetch,
    logout,

    userName,
    userAvatar,
    userEmail,
  }
}
