import { v4 as uuidv4 } from 'uuid'

const storage = useStorage<Project[]>('db')
const projectsKey = 'projects:all'

async function getProjects(): Promise<Project[]> {
  let projects = await storage.getItem(projectsKey)

  // Initialize with mock data
  if (projects === null) {
    projects = [MOCK_PROJECT]
    await saveProjects(projects)
  }

  return projects
}

async function saveProjects(
  projects: Project[]
): Promise<void> {
  await storage.setItem(projectsKey, projects)
}

export async function getAllProjects(): Promise<Project[]> {
  const projects = await getProjects()
  return [...projects].sort(
    (a, b) =>
      new Date(a.createdAt).getTime() -
      new Date(b.createdAt).getTime()
  )
}

export async function getProjectById(
  id: string
): Promise<Project | null> {
  const projects = await getProjects()
  return projects.find((p) => p.id === id) || null
}

export async function createProject(data: {
  name: string
}): Promise<Project> {
  const now = new Date()
  const newProject: Project = {
    id: uuidv4(),
    name: data.name || 'New Project',
    createdAt: now,
    updatedAt: now,
  }

  const projects = await getProjects()
  projects.push(newProject)
  await saveProjects(projects)

  return newProject
}

export async function updateProject(
  id: string,
  data: { name: string }
): Promise<Project | null> {
  const projects = await getProjects()
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
  await saveProjects(projects)

  return updatedProject
}

export async function deleteProject(
  id: string
): Promise<boolean> {
  const projects = await getProjects()
  const index = projects.findIndex(
    (project) => project.id === id
  )
  if (index !== -1) {
    projects.splice(index, 1)
    await saveProjects(projects)
    return true
  }
  return false
}
