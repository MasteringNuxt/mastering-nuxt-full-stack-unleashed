<template>
  <span ref="textEl" class="typewriter-text">{{
    text
  }}</span>
</template>

<script setup lang="ts">
import { watch, ref } from 'vue'

const props = defineProps<{
  text: string
}>()

const textEl = ref<HTMLElement | null>(null)

const animate = (el: HTMLElement) => {
  const chars = el.textContent?.length || 0
  el.animate(
    [
      { clipPath: 'inset(0 100% 0 0)' },
      { clipPath: 'inset(0 0 0 0)' },
    ],
    {
      duration: Math.min(chars * 50, 1000), // Cap at 1 second
      easing: 'steps(' + chars + ', end)',
    }
  )
}

// Watch for text changes and trigger animation
watch(
  () => props.text,
  () => {
    if (textEl.value) {
      animate(textEl.value)
    }
  }
)
</script>

<style scoped>
.typewriter-text {
  display: inline-block;
  position: relative;
  white-space: nowrap;
}
</style>
