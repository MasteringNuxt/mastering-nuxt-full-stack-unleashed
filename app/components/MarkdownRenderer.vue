<script setup lang="ts">
defineProps<{ content: string }>()
</script>

<template>
  <MDC :value="content" class="markdown-content" />
</template>

<style>
.markdown-content {
  font-size: 1rem;
  line-height: 1.5rem;
}

.markdown-content p {
  font-size: 1rem;
  line-height: 1.5;
  margin-bottom: 1rem;
}

.markdown-content p:last-child {
  margin-bottom: 0;
}

.markdown-content h1 {
  font-size: 1.875rem;
  line-height: 2.25rem;
  margin-top: 2rem;
  margin-bottom: 1.25rem;
  font-weight: 700;
  color: var(--ui-text-highlighted);
}

.markdown-content h2 {
  font-size: 1.5rem;
  line-height: 2rem;
  margin-top: 1.75rem;
  margin-bottom: 1rem;
  font-weight: 600;
  color: var(--ui-text-highlighted);
}

.markdown-content h3 {
  font-size: 1.25rem;
  line-height: 1.75rem;
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
  font-weight: 600;
  color: var(--ui-text-highlighted);
}

.markdown-content pre {
  font-size: 0.875rem;
  background-color: var(--ui-bg-inverted);
  color: var(--color-white);
  padding: 1rem;
  border-radius: var(--ui-radius);
  overflow-x: auto;
  margin: 1.5rem 0;
}

.markdown-content code {
  font-size: 0.875rem;
  background-color: var(--ui-bg-muted);
  color: var(--ui-text);
  padding: 0.125rem 0.25rem;
  border-radius: var(--ui-radius);
}

.markdown-content pre code {
  background-color: transparent;
  color: var(--color-white);
  padding: 0;
}

.markdown-content ul,
.markdown-content ol {
  font-size: 1rem;
  margin: 1rem 0 1.5rem;
  list-style-position: outside;
  margin-left: 1.5rem;
  color: var(--ui-text);
}

.markdown-content ul {
  list-style-type: disc;
}

.markdown-content ol {
  list-style-type: decimal;
}

.markdown-content li {
  margin: 0.5rem 0;
}

.markdown-content li > p {
  margin: 0.5rem 0;
}

.markdown-content blockquote {
  border-left: 4px solid var(--ui-border);
  padding-left: 1rem;
  margin: 1.5rem 0;
  color: var(--ui-text-muted);
  font-style: italic;
}

.markdown-content hr {
  border: 0;
  border-top: 1px solid var(--ui-border);
  margin: 2rem 0;
}

.markdown-content table {
  width: 100%;
  margin: 1.5rem 0;
  border-collapse: collapse;
}

.markdown-content th,
.markdown-content td {
  padding: 0.75rem;
  border: 1px solid var(--ui-border);
  text-align: left;
}

.markdown-content th {
  background-color: var(--ui-bg-muted);
  font-weight: 600;
}

.markdown-content h1:first-child,
.markdown-content h2:first-child,
.markdown-content h3:first-child {
  margin-top: 0;
}

.markdown-content a {
  color: var(--ui-primary);
  text-decoration: underline;
  text-underline-offset: 2px;
}

.markdown-content a:hover {
  color: var(--ui-color-primary-600);
}

.markdown-content img {
  max-width: 100%;
  height: auto;
  margin: 1.5rem 0;
  border-radius: var(--ui-radius);
}
</style>
