<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'
import type { Chat } from '../types'

defineProps<{
  isOpen: boolean
}>()

const route = useRoute()
const { chats } = useChats()

function formatChatItem(chat: Chat): NavigationMenuItem {
  return {
    label: chat.title || 'Untitled Chat',
    to: `/chats/${chat.id}`,
    active: route.params.id === chat.id,
  }
}

const formattedChats = computed(() =>
  chats.value.map(formatChatItem)
)
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
        <UNavigationMenu
          orientation="vertical"
          class="w-full mb-4"
          :items="formattedChats"
          default-open
        />
      </div>
    </div>
  </aside>
</template>
