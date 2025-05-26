<script setup lang="ts">
const props = defineProps<{
  chatId: string
}>()

const emit = defineEmits<{
  close: []
}>()

const { projects } = useProjects()
const { assignToProject } = useChat(props.chatId)

async function handleAssignToProject(projectId: string) {
  try {
    await assignToProject(projectId)
    await navigateTo(
      `/projects/${projectId}/chats/${props.chatId}`
    )
  } catch (error) {
    console.error(
      'Failed to assign chat to project:',
      error
    )
  }
}
</script>

<template>
  <UModal
    open
    title="Assign to Project"
    description="Choose a project to assign this chat to."
    @update:open="emit('close')"
  >
    <template #body>
      <div class="space-y-2">
        <!-- Project list -->
        <div
          v-for="project in projects"
          :key="project.id"
          class="flex items-center space-x-3 p-3 border border-[var(--ui-border)] rounded-lg hover:bg-[var(--ui-bg-elevated)] cursor-pointer"
          @click="handleAssignToProject(project.id)"
        >
          <UIcon
            name="i-heroicons-folder"
            class="text-[var(--ui-text-dimmed)]"
          />
          <span class="font-medium text-[var(--ui-text)]">{{
            project.name
          }}</span>
        </div>

        <div
          v-if="!projects?.length"
          class="text-center py-8"
        >
          <UIcon
            name="i-heroicons-folder-plus"
            class="mx-auto h-12 w-12 text-[var(--ui-text-dimmed)]"
          />
          <h3
            class="mt-2 text-sm font-medium text-[var(--ui-text)]"
          >
            No projects
          </h3>
          <p
            class="mt-1 text-sm text-[var(--ui-text-muted)]"
          >
            Create a project first to assign chats to it.
          </p>
        </div>
      </div>
    </template>

    <template #footer>
      <div class="flex justify-end">
        <UButton
          color="neutral"
          variant="soft"
          @click="emit('close')"
        >
          Cancel
        </UButton>
      </div>
    </template>
  </UModal>
</template>
