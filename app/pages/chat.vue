<script setup lang="ts">
const { chat, messages, sendMessage } = useChat()
</script>

<template>
  <ChatWindow :chat :messages @send-message="sendMessage" />
</template>
