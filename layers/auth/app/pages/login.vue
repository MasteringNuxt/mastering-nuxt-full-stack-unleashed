<script setup lang="ts">
definePageMeta({
  layout: false,
})

const appConfig = useAppConfig()
useHead({
  title: `Login - ${appConfig.title}`,
})

const { isAuthenticated } = useAuth()
if (isAuthenticated.value) {
  await navigateTo('/', { replace: true })
}

const isLoading = ref(false)
async function handleGitHubLogin() {
  isLoading.value = true
  await navigateTo('/auth/github', { external: true })
}
</script>

<template>
  <div class="login-container">
    <UCard class="login-card">
      <template #header>
        <div class="text-center">
          <h1 class="text-2xl font-bold">
            Welcome to {{ appConfig.title }}
          </h1>
          <p class="text-gray-500 mt-2">
            Sign in to continue to your chats
          </p>
        </div>
      </template>

      <div class="login-content">
        <UButton
          color="neutral"
          variant="outline"
          size="lg"
          :icon="
            isLoading
              ? 'i-heroicons-arrow-path'
              : 'i-simple-icons-github'
          "
          block
          :loading="isLoading"
          :disabled="isLoading"
          @click="handleGitHubLogin"
        >
          {{
            isLoading
              ? 'Signing you in...'
              : 'Continue with GitHub'
          }}
        </UButton>
      </div>
    </UCard>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 1rem;
  background: var(--ui-bg-base);
}

.login-card {
  width: 100%;
  max-width: 400px;
}

.login-content {
  padding: 1rem 0;
}
</style>
