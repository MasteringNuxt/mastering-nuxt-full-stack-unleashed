<style scoped>
.app-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 4rem; /* 16 * 0.25 = 4rem */
  background-color: var(--ui-bg-muted);
  border-bottom: 1px solid var(--ui-border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 1rem;
  padding-right: 1rem;
  z-index: 50;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.header-title {
  font-size: 1.125rem;
  font-weight: 600;
}
</style>
