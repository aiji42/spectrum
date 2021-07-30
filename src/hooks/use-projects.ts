import useSWR from 'swr'

const URL = 'https://api.vercel.com/v13/projects/'

type Project = {
  id: string
  name: string
}

type Projects = {
  projects: Project[]
}

export const useProjects = (teamId?: string): Projects | undefined => {
  const { data } = useSWR<Projects>(getProjectsUrl(teamId))

  return data
}

export const useProject = (
  id: string,
  teamId?: string
): Project | undefined => {
  const { data } = useSWR<Project>(getProjectUrl(id, teamId))

  return data
}

const getProjectsUrl = (teamId?: string) =>
  `${URL}${teamId ? `?teamId=${teamId}` : ''}`

const getProjectUrl = (id: string, teamId?: string) =>
  `${URL}${id}${teamId ? `?teamId=${teamId}` : ''}`
