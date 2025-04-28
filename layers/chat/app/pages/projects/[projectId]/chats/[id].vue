<script setup lang="ts">
const route = useRoute()
const {
  chat: chatFromChats,
  messages,
  sendMessage,
} = useChat(route.params.id as string)

if (!chatFromChats.value) {
  await navigateTo(`/projects/${route.params.projectId}`, {
    replace: true,
  })
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

useHead({
  title,
})
</script>

<template>
  <ChatWindow
    :typing
    :chat
    :messages
    @send-message="handleSendMessage"
  />
</template>
