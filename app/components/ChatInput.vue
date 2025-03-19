<script setup lang="ts">
const { isStreaming = false } = defineProps<{
  isStreaming?: boolean
}>()

const emit = defineEmits<{
  (e: 'send-message', message: string): void
}>()

const textareaRef = useTemplateRef('textareaRef')
const newMessage = ref('')

const handleSendMessage = () => {
  if (!newMessage.value.trim() || isStreaming) return
  emit('send-message', newMessage.value.trim())
  newMessage.value = ''

  nextTick(() => {
    adjustTextareaHeight()
    textareaRef.value?.focus()
  })
}

const adjustTextareaHeight = async (): Promise<void> => {
  if (textareaRef.value) {
    textareaRef.value.style.height = 'auto'
    await nextTick()
    textareaRef.value.style.height = `${textareaRef.value.scrollHeight}px`
  }
}

onMounted(() => {
  textareaRef.value?.focus()
})

watch(
  () => isStreaming,
  async (value: boolean) => {
    if (!value) {
      await nextTick()
      textareaRef.value?.focus()
    }
  }
)
</script>

<template>
  <form
    class="message-form-wrapper"
    @submit.prevent="handleSendMessage"
  >
    <textarea
      ref="textareaRef"
      v-model="newMessage"
      class="message-input"
      :disabled="isStreaming"
      :rows="1"
      @input="adjustTextareaHeight"
      @keydown.enter.prevent="handleSendMessage"
    />
    <UButton
      type="submit"
      :disabled="!newMessage || isStreaming"
      color="primary"
      variant="solid"
      icon="i-heroicons-paper-airplane"
      class="absolute right-3 bottom-3 rounded-full"
      square
    />
  </form>
</template>

<style scoped>
.message-form-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s ease-in-out;
  border: 1px solid var(--ui-border);
  border-radius: 1.8rem;
  overflow: hidden;
  padding: 1rem 2rem 1rem 1.2rem;
  background-color: var(--ui-bg);
}

.message-form-wrapper:focus-within,
.message-form-wrapper:hover {
  transform: none;
}

.message-form-wrapper:hover {
  outline: none;
  box-shadow: none;
}

.message-input {
  width: 100%;
  padding: 0;
  margin-right: 1.5rem;
  resize: none;
  background-color: transparent;
  outline: none;
}

.message-form-wrapper:hover {
  outline: none;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.message-input:disabled {
  cursor: not-allowed;
}
</style>
