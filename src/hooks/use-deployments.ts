import useSWR, { SWRConfiguration } from 'swr'
import { Deployments } from '@/types'
import { ENDPOINTS } from '@/endpoints'
import AuthContext from '@/libs/firebase/AuthContext'
import { useContext } from 'react'

export const useDeployments = (
  params: { projectId: string; teamId?: string; next?: number },
  config?: SWRConfiguration
): { deployments: Deployments; next?: number } | undefined => {
  const authInfo = useContext(AuthContext)
  const { data } = useSWR<
    | { deployments: Deployments; pagination: { next: number } }
    | { error: unknown }
  >(
    [getDeploymentsUrl(params), authInfo?.storeDoc?.data()?.vercelToken],
    (url: string, token: string | undefined) =>
      fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((res) => res.json()),
    config
  )

  return data && 'deployments' in data
    ? { deployments: data.deployments, next: data.pagination.next }
    : undefined
}

const getDeploymentsUrl = (params: {
  projectId: string
  teamId?: string
  next?: number
}) =>
  `${ENDPOINTS.deployments}?limit=10&projectId=${params.projectId}${
    params.teamId ? `&teamId=${params.teamId}` : ''
  }${params.next ? `&from=${params.next}` : ''}`
