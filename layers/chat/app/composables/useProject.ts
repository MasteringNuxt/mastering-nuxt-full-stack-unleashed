import useProjects from './useProjects'

export default function useProject(projectId: string) {
  const { projects } = useProjects()

  const project = computed(() =>
    projects.value.find((p) => p.id === projectId)
  )

  function updateProject(updatedProject: Partial<Project>) {
    if (!project.value) return

    const index = projects.value.findIndex(
      (p) => p.id === projectId
    )
    if (index === -1) return

    projects.value[index] = {
      ...project.value,
      ...updatedProject,
      id: projectId,
    }
  }

  return {
    project,
    updateProject,
  }
}
