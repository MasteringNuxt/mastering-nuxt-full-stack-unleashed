<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
})

const route = useRoute()
const {
  chat: chatFromChats,
  messages,
  sendMessage,
  fetchMessages,
} = useChat(route.params.id as string)

await fetchMessages()

if (!chatFromChats.value) {
  await navigateTo('/', { replace: true })
}
const chat = computed(() => chatFromChats.value as Chat)

const typing = ref(false)

const handleSendMessage = async (message: string) => {
  typing.value = true
  await sendMessage(message)
  typing.value = false
}

const appConfig = useAppConfig()
const title = computed(() =>
  chat.value?.title
    ? `${chat.value.title} - ${appConfig.title}`
    : appConfig.title
)

async function handleError() {
  await navigateTo('/', { replace: true })
}

useHead({
  title,
})
</script>

<template>
  <div class="h-full flex flex-col">
    <NuxtErrorBoundary>
      <ChatWindow
        :typing
        :chat
        :messages
        @send-message="handleSendMessage"
      />

      <template #error="{ error }">
        <UContainer
          class="flex justify-center items-center h-full p-4"
        >
          <UCard variant="soft" class="min-w-md">
            <template #header>
              <h1 class="text-lg font-bold">
                Error - {{ error.statusCode }}
              </h1>
            </template>

            <p>{{ error.message }}</p>

            <UButton
              class="mt-4"
              color="primary"
              variant="soft"
              icon="i-heroicons-arrow-left"
              @click="handleError"
            >
              Go back home
            </UButton>
          </UCard>
        </UContainer>
      </template>
    </NuxtErrorBoundary>
  </div>
</template>
