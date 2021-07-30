import useSWR from 'swr'

type Deployment = {
  status: string
  uid: string
  url: string
  meta: {
    gitlabCommitAuthorAvatar: string
    gitlabCommitAuthorName: string
    gitlabCommitRef: string
    gitlabCommitMessage: string
  }
  alias: Array<string>
}

type Deployments = {
  deployments: Omit<Deployment, 'alias'>[]
}

export const useDeployments = (
  projectId: string,
  teamId?: string
): Deployments | undefined => {
  const { data } = useSWR<Deployments>(getProjectsUrl(projectId, teamId))

  return data
}

export const useDeployment = (
  id: string,
  teamId?: string
): Deployment | undefined => {
  const { data } = useSWR<Deployment>(getProjectUrl(id, teamId))

  return data
}

const getProjectsUrl = (projectId: string, teamId?: string) =>
  `https://api.vercel.com/v6/now/deployments/?projectId=${projectId}${
    teamId ? `&teamId=${teamId}` : ''
  }`

const getProjectUrl = (id: string, teamId?: string) =>
  `https://api.vercel.com/v13/now/deployments/${id}${
    teamId ? `?teamId=${teamId}` : ''
  }`
