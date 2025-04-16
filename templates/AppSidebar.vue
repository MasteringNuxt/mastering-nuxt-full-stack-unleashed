<script setup lang="ts">
defineProps<{
  isOpen: boolean
}>()

const { chats } = useChats()
</script>

<template>
  <aside
    class="fixed top-16 left-0 bottom-0 w-64 transition-transform duration-300 z-40 bg-(--ui-bg-muted) border-r-(--ui-border) border-r"
    :class="{ '-translate-x-full': !isOpen }"
  >
    <div class="overflow-y-auto p-4">
      <div class="mb-4">
        <div class="flex justify-between items-center mb-2">
          <h2
            class="text-sm font-semibold text-(--ui-text-muted)"
          >
            Chats
          </h2>
        </div>
        <div class="space-y-1">
          <a
            v-for="chat in chats"
            :key="chat.id"
            :href="`/chats/${chat.id}`"
            class="block text-(--ui-text-muted) px-3 py-1 text-sm rounded-md transition-colors duration-200 ease-in-out hover:bg-[var(--ui-bg-elevated)]"
          >
            {{ chat.title || 'Untitled Chat' }}
          </a>
        </div>
      </div>
    </div>
  </aside>
</template>
