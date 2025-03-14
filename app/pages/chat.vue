<script setup lang="ts">
const { chat, messages, sendMessage } = useChat()

useHead({
  title: chat.value.title,
})
</script>

<template>
  <ChatWindow :chat :messages @send-message="sendMessage" />
</template>
