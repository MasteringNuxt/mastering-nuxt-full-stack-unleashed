export async function getAllProjects(): Promise<Project[]> {
  return await prisma.project.findMany({
    orderBy: { createdAt: 'asc' },
  })
}

export async function getAllProjectsByUser(
  userId: string
): Promise<Project[]> {
  return await prisma.project.findMany({
    where: { userId },
    orderBy: { createdAt: 'asc' },
  })
}

export async function getProjectById(
  id: string
): Promise<Project | null> {
  return await prisma.project.findFirst({
    where: { id },
  })
}

export async function getProjectByIdForUser(
  id: string,
  userId: string
): Promise<Project | null> {
  return await prisma.project.findFirst({
    where: {
      id,
      userId,
    },
  })
}

export async function createProject(data: {
  name: string
  userId: string
}): Promise<Project> {
  return await prisma.project.create({
    data: {
      name: data.name,
      userId: data.userId,
    },
  })
}

export async function updateProject(
  id: string,
  data: { name: string }
): Promise<Project | null> {
  return await prisma.project.update({
    where: { id },
    data: {
      name: data.name,
      updatedAt: new Date(),
    },
  })
}

export async function deleteProject(id: string) {
  return await prisma.project.delete({
    where: { id },
  })
}
