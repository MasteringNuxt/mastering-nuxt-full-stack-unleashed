export default function useProject(projectId: string) {
  const { projects } = useProjects()

  const project = computed(() =>
    projects.value.find((p) => p.id === projectId)
  )

  async function updateProject(
    updatedProject: Partial<Project>
  ) {
    if (!project.value) return

    const response = await $fetch<Project>(
      `/api/projects/${projectId}`,
      {
        method: 'PUT',
        body: {
          ...updatedProject,
        },
      }
    )

    // Merge with existing to update in our data store
    projects.value = projects.value.map((p) =>
      p.id === projectId ? { ...p, ...response } : p
    )
  }

  return {
    project,
    updateProject,
  }
}
