import useSWR from 'swr'

const URL = 'https://api.vercel.com/v13/projects/'

export type Project = {
  id: string
  name: string
  targets: {
    production: {
      alias: string[]
      deploymentHostname: string
      meta: Record<string, string>
      name: string
      readyState: 'QUEUED' | 'CANCELED' | 'BUILDING' | 'READY' | 'ERROR'
      createdAt: number
    }
  }
  link: {
    deployHooks: Array<{
      id: string
      name: string
      ref: string
      url: string
    }>
  }
}

export type Projects = {
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
