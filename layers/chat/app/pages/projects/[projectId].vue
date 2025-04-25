<script setup lang="ts">
const route = useRoute()
const projectId = route.params.projectId as string

const { project, updateProject } = useProject(projectId)
const { createChatAndNavigate } = useChats()

if (!project.value) {
  await navigateTo('/', {
    replace: true,
  })
}

const onChatPage = computed(() => route.params.id)
const isEditing = ref(false)
const editedName = ref('')

function startEditing() {
  if (!project.value || onChatPage.value) return

  editedName.value = project.value.name
  isEditing.value = true
}

function cancelEditing() {
  isEditing.value = false
  editedName.value = ''
}

async function handleRename() {
  if (!editedName.value.trim() || !project.value) return
  if (editedName.value.trim() === project.value.name) return

  isEditing.value = false
  try {
    await updateProject({ name: editedName.value.trim() })
  } catch (error) {
    console.error('Failed to rename project:', error)
  }
}

async function handleNewChat() {
  try {
    await createChatAndNavigate({ projectId })
  } catch (error) {
    console.error('Failed to create new chat:', error)
  }
}
</script>

<template>
  <div class="container">
    <div v-if="project" class="header">
      <div class="header-left">
        <div class="title-container">
          <h1
            v-if="!isEditing"
            class="title"
            :class="{ 'cursor-pointer': !onChatPage }"
            @click="startEditing"
          >
            {{ project.name }}
            <UIcon
              v-if="!onChatPage"
              name="i-heroicons-pencil"
              class="edit-icon"
            />
          </h1>
          <div v-else class="edit-container">
            <UInput
              v-model="editedName"
              class="title-input"
              size="lg"
              autofocus
              @keyup.enter="handleRename"
              @keyup.esc="cancelEditing"
            />
            <div class="edit-actions">
              <UButton
                color="neutral"
                variant="soft"
                icon="i-heroicons-x-mark"
                size="xs"
                @click="cancelEditing"
              />
              <UButton
                color="primary"
                variant="soft"
                icon="i-heroicons-check"
                size="xs"
                @click="handleRename"
              />
            </div>
          </div>
        </div>

        <NuxtLink
          v-if="onChatPage"
          :to="`/projects/${projectId}`"
          class="leading-4 flex items-center mt-1 text-sm text-(--ui-text-muted)"
        >
          <UIcon
            name="i-heroicons-arrow-left"
            class="mr-1"
          />
          Back to Project
        </NuxtLink>
      </div>
      <UButton
        color="primary"
        icon="i-heroicons-plus"
        @click="handleNewChat"
      >
        New Chat in Project
      </UButton>
    </div>

    <NuxtPage />
  </div>
</template>

<style scoped>
.container {
  padding: 1rem;
  height: calc(100% - 4rem); /* Account for AppHeader */
}

.header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--ui-border);
}

.title-container {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.title {
  font-size: 1.5rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.title:hover .edit-icon {
  opacity: 1;
}

.edit-icon {
  width: 1rem;
  height: 1rem;
  opacity: 0;
  margin-left: 0.25rem;
  transition: opacity 0.2s;
}

.edit-container {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.edit-actions {
  display: flex;
  gap: 0.25rem;
}

.title-input {
  font-size: 1.5rem;
  font-weight: 400;
  padding: 0.25rem 0.5rem 0.25rem 0;
  height: auto;
  width: auto;
  min-width: 200px;
}

.no-chats,
.loading {
  text-align: center;
  padding: 3rem 0;
  color: var(--ui-text-muted);
}
</style>
