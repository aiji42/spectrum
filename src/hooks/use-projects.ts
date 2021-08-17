import useSWR, { SWRConfiguration } from 'swr'
import { Project, Projects } from '@/types'
import { ENDPOINTS } from '@/endpoints'
import { useRouter } from 'next/router'
import AuthContext from '@/libs/firebase/AuthContext'
import { useContext } from 'react'

export const useProjects = (
  config?: SWRConfiguration
): Projects | undefined => {
  const authInfo = useContext(AuthContext)
  const router = useRouter()
  const { data } = useSWR<Projects>(
    getProjectsUrl(
      typeof router.query.slug === 'string' ? router.query.slug : ''
    ),
    (url: string) =>
      fetch(url, {
        headers: {
          Authorization: `Bearer ${authInfo?.storeDoc?.data()?.vercelToken}`
        }
      }).then((res) => res.json()),
    config
  )

  return data
}

const getProjectsUrl = (slug: string) => `${ENDPOINTS.projects}?slug=${slug}`

export const useProject = (config?: SWRConfiguration): Project | undefined => {
  const router = useRouter()
  const projects = useProjects(config)

  return projects?.find(
    ({ name }) =>
      (typeof router.query.project === 'string' ? router.query.project : '') ===
      name
  )
}
