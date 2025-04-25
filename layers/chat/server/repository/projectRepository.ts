import { v4 as uuidv4 } from 'uuid'

const projects: Project[] = [MOCK_PROJECT]

export function getAllProjects(): Project[] {
  return [...projects].sort((a, b) =>
    a.name.localeCompare(b.name)
  )
}

export function getProjectById(id: string): Project | null {
  return projects.find((p) => p.id === id) || null
}

export async function createProject(data: {
  name: string
}): Promise<Project> {
  const now = new Date()
  const newProject: Project = {
    id: uuidv4(),
    name: data.name,
    createdAt: now,
    updatedAt: now,
  }
  projects.push(newProject)
  return newProject
}

export async function updateProject(
  id: string,
  data: { name: string }
): Promise<Project | null> {
  const projectIndex = projects.findIndex(
    (p) => p.id === id
  )
  if (projectIndex === -1) return null
  const project = projects[projectIndex]
  if (!project) return null
  const updatedProject: Project = {
    id: project.id,
    name: data.name,
    createdAt: project.createdAt,
    updatedAt: new Date(),
  }
  projects[projectIndex] = updatedProject
  return updatedProject
}

export async function deleteProject(
  id: string
): Promise<boolean> {
  const index = projects.findIndex(
    (project) => project.id === id
  )
  if (index !== -1) {
    projects.splice(index, 1)
    return true
  }
  return false
}
