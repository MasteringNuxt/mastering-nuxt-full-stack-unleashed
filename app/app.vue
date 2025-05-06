<script setup lang="ts">
const { fetchChats } = useChats()
const { fetchProjects } = useProjects()
await Promise.all([fetchChats(), fetchProjects()])
</script>

<template>
  <UApp>
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
