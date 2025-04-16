<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'
import type { Chat } from '../types'

defineProps<{
  isOpen: boolean
}>()

const route = useRoute()
const { chats, createChatAndNavigate } = useChats()

const chatsWithoutProject = computed(() =>
  chats.value.filter((c) => c.projectId === undefined)
)

function filterChats(startDays: number, endDays?: number) {
  return computed(() => {
    return filterChatsByDateRange(
      chatsWithoutProject.value,
      startDays,
      endDays
    ).map(formatChatItem)
  })
}

const todayChats = filterChats(-1, 1)
const lastWeekChats = filterChats(1, 7)
const lastMonthChats = filterChats(7, 30)
const olderChats = filterChats(30)

function formatChatItem(chat: Chat): NavigationMenuItem {
  return {
    label: chat.title || 'Untitled Chat',
    to: `/chats/${chat.id}`,
    active: route.params.id === chat.id,
  }
}

async function handleCreateChat() {
  await createChatAndNavigate()
}
</script>

<template>
  <aside
    class="fixed top-16 left-0 bottom-0 w-64 transition-transform duration-300 z-40 bg-(--ui-bg-muted) border-r-(--ui-border) border-r"
    :class="{ '-translate-x-full': !isOpen }"
  >
    <div
      v-if="chatsWithoutProject.length > 0"
      class="overflow-y-auto p-4"
    >
      <div v-if="todayChats.length > 0" class="mb-4">
        <div class="flex justify-between items-center mb-2">
          <h2
            class="text-sm font-semibold text-(--ui-text-muted)"
          >
            Today
          </h2>
        </div>
        <UNavigationMenu
          orientation="vertical"
          class="w-full mb-4"
          :items="todayChats"
          default-open
        />
      </div>
      <div v-if="lastWeekChats.length > 0" class="mb-4">
        <div class="flex justify-between items-center mb-2">
          <h2
            class="text-sm font-semibold text-(--ui-text-muted)"
          >
            Last 7 Days
          </h2>
        </div>
        <UNavigationMenu
          orientation="vertical"
          class="w-full mb-4"
          :items="lastWeekChats"
          default-open
        />
      </div>
      <div v-if="lastMonthChats.length > 0" class="mb-4">
        <div class="flex justify-between items-center mb-2">
          <h2
            class="text-sm font-semibold text-(--ui-text-muted)"
          >
            Last 30 Days
          </h2>
        </div>
        <UNavigationMenu
          orientation="vertical"
          class="w-full mb-4"
          :items="lastMonthChats"
          default-open
        />
      </div>
      <div v-if="olderChats.length > 0" class="mb-4">
        <div class="flex justify-between items-center mb-2">
          <h2
            class="text-sm font-semibold text-(--ui-text-muted)"
          >
            Older
          </h2>
        </div>
        <UNavigationMenu
          orientation="vertical"
          class="w-full mb-4"
          :items="olderChats"
          default-open
        />
      </div>
    </div>
    <div v-else class="overflow-y-auto p-4">
      <UAlert
        title="No Chats"
        description="Create a new chat to get started."
        color="neutral"
        variant="soft"
        class="mt-2"
      />
      <UButton
        size="sm"
        color="neutral"
        variant="soft"
        icon="i-heroicons-plus-small"
        class="mt-2 w-full"
        @click="handleCreateChat"
      >
        New Chat
      </UButton>
    </div>
  </aside>
</template>
