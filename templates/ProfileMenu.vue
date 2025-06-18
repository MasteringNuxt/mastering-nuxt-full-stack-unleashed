<script setup lang="ts"></script>

<template>
  <UDropdownMenu v-if="isAuthenticated" :items="menuItems">
    <UAvatar
      :src="userAvatar || undefined"
      :alt="userName"
      size="sm"
      class="cursor-pointer"
    />
  </UDropdownMenu>

  <UButton
    v-else
    variant="outline"
    size="sm"
    @click="handleLogin"
  >
    Login
  </UButton>
</template>
