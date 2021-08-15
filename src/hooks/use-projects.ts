import useSWR from 'swr'
import { Project } from '@/types'
import { ENDPOINTS } from '@/endpoints'

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
  `${ENDPOINTS.projects}${teamId ? `?teamId=${teamId}` : ''}`

const getProjectUrl = (id: string, teamId?: string) =>
  `${ENDPOINTS.projects}${id}${teamId ? `?teamId=${teamId}` : ''}`
