import useProjects from './useProjects'

export default function useProject(projectId: string) {
  const { projects } = useProjects()

  const project = computed(() =>
    projects.value.find((p) => p.id === projectId)
  )

  return {
    project,
  }
}
